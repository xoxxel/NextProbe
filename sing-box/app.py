#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
multi_proto_check.py – غربالگر لینک‌های پروکسی با sing-box
ورودی : links.txt   (هر خط یک لینک)
خروجی : working.txt | dead.txt
"""
import base64, json, re, subprocess, sys, tempfile, time, urllib.parse
from pathlib import Path
import requests

# ─── تنظیمات ────────────────────────────────────────────
HERE  = Path(__file__).resolve().parent
BIN   = HERE / "sing-box.exe"      # باینری sing-box ≥ 1.8
INPUT = HERE / "links.txt"         # فایل لینک‌ها
PORT  = 10808                      # پورت SOCKS لوکال
TIME  = 12                         # ثانیه برای هر تست
URL   = "https://www.gstatic.com/generate_204"   # سایز کوچک
# ───────────────────────────────────────────────────────

def pad4(s): return s + "=" * ((4 - len(s) % 4) % 4)
def b64dec(s): return base64.urlsafe_b64decode(pad4(s)).decode(errors="ignore")

# ─── Parsers ────────────────────────────────────────────
def parse_ss(link):
    """Shadowsocks – همهٔ حالت‌های base64 و plain"""
    core = link[5:].lstrip("/").split("?",1)[0].split("#",1)[0]
    # حالت full-base64 (method:pwd@host:port)
    dec  = None
    if "@" in b64dec(core):  # احتمالاً کلش b64 است
        try: dec = b64dec(core)
        except Exception: pass
    if dec and "@" in dec:
        userinfo, hostport = dec.split("@", 1)
        method, pwd        = userinfo.split(":", 1)
        host,  port        = hostport.rsplit(":", 1)
    else:
        # حالت userinfo@host:port
        if "@" not in core or ":" not in core.split("@",1)[1]:
            raise ValueError("bad-format")
        userinfo, hostport = core.split("@", 1)
        host,  port        = hostport.rsplit(":", 1)
        # userinfo ممکن است base64 باشد
        if ":" in userinfo:
            method, pwd = userinfo.split(":", 1)
        else:
            method, pwd = b64dec(userinfo).split(":", 1)
    return {"type": "shadowsocks", "server":host, "server_port":int(port),
            "method":method, "password":pwd, "udp":True}

def parse_trojan(link):
    m = re.match(r"trojan://([^@]+)@([^:/]+):(\d+)", link)
    if not m: raise ValueError("format")
    pwd, host, port = m.groups()
    return {"type":"trojan", "server":host, "server_port":int(port), "password":pwd}

def parse_vless(link):
    u = urllib.parse.urlparse(link)
    if not (u.username and u.hostname): raise ValueError("format")
    opts = urllib.parse.parse_qs(u.query)
    if opts.get("security",[""])[0] == "reality":
        return {"type":"vless", "server":u.hostname, "server_port":u.port or 443,
                "uuid":u.username, "flow":"xtls-rprx-vision",
                "reality":{"public_key":opts.get("pbk",[""])[0],
                           "short_id"  :opts.get("sid",[""])[0]}}
    return {"type":"vless", "server":u.hostname, "server_port":u.port or 443,
            "uuid":u.username, "encryption":"none"}

def parse_vmess(link):
    raw = json.loads(b64dec(link[8:]))   # vmess://
    addr = raw.get("add") or raw.get("address") or raw.get("host")
    if not addr: raise ValueError("vmess: no address")
    return {"type":"vmess", "server":addr, "server_port":int(raw.get("port",443)),
            "uuid":raw["id"], "alter_id":int(raw.get("aid",0)),
            "security":raw.get("scy","auto")}

def parse_hysteria(link):
    """پشتیبانی v1/v2 و hy2"""
    link = link.replace("hy2://", "hysteria://").replace("hysteria2://", "hysteria://")
    u = urllib.parse.urlparse(link)
    insecure = "1" in u.query or "true" in u.query
    return {"type":"hysteria", "server":u.hostname, "server_port":int(u.port or 443),
            "auth_str":u.username or "", "tls":{"insecure":insecure}}

def parse_tuic(link):
    u = urllib.parse.urlparse(link)
    if not (u.username and u.hostname): raise ValueError("format")
    return {"type":"tuic", "server":u.hostname, "server_port":u.port or 443,
            "uuid":u.username, "password":u.password or "",
            "congestion_controller":"bbr"}

# نگاشت scheme → parser
PARSER = {
    "ss":parse_ss, "shadowsocks":parse_ss,
    "trojan":parse_trojan,
    "vless":parse_vless,
    "vmess":parse_vmess,
    "hysteria":parse_hysteria, "hysteria2":parse_hysteria, "hy2":parse_hysteria,
    "tuic":parse_tuic,
}

# ─── سازندهٔ config sing-box ─────────────────────────────
def make_cfg(ob):
    return {
        "log":{"level":"error","output":"stdout"},
        "inbounds":[{"type":"socks","listen":"127.0.0.1","listen_port":PORT}],
        "outbounds":[ob],
    }

def test(link:str) -> bool:
    scheme = link.split("://",1)[0].lower()
    if scheme not in PARSER: raise ValueError("scheme")
    ob  = PARSER[scheme](link)
    cfg = make_cfg(ob)
    with tempfile.TemporaryDirectory() as td:
        cfgp = Path(td)/"cfg.json"
        cfgp.write_text(json.dumps(cfg))
        proc = subprocess.Popen([str(BIN), "run", "-c", str(cfgp)],
                                stdout=subprocess.DEVNULL,
                                stderr=subprocess.DEVNULL)
        time.sleep(1.3)                # فرصت بالا آمدن
        try:
            r = requests.get(URL,
                proxies={"http":f"socks5h://127.0.0.1:{PORT}",
                         "https":f"socks5h://127.0.0.1:{PORT}"},
                timeout=TIME)
            ok = r.status_code in (200,204)
        except Exception:
            ok = False
        finally:
            proc.kill()
        return ok

# ─── Main ───────────────────────────────────────────────
def main():
    if not BIN.exists():
        sys.exit("❌ sing-box.exe not found!")
    raw_links = INPUT.read_text(encoding="utf-8", errors="ignore").splitlines()
    links = [l.strip() for l in raw_links if "://" in l]
    good, bad = [], []
    for i, ln in enumerate(links, 1):
        head = (ln[:60] + "…") if len(ln) > 60 else ln
        print(f"[{i}/{len(links)}] {head:<63}", end="")
        try:
            if test(ln):
                good.append(ln);  print(" ✔")
            else:
                bad.append(ln);   print(" ❌")
        except Exception as e:
            bad.append(f"{ln}   ## {e}")
            print(f" ⚠ {e}")
    Path("working.txt").write_text("\n".join(good), encoding="utf-8")
    Path("dead.txt").write_text("\n".join(bad),   encoding="utf-8")
    print(f"\n🎯 پایان — سالم: {len(good)} | خراب/نامعتبر: {len(bad)}")

if __name__ == "__main__":
    main()
