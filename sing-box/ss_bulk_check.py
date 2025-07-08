#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ss_bulk_check.py – تست لینک‌های Shadowsocks با پشتیبانی کامل
ورودی:  config.test.txt
خروجی:  working.txt  |  dead.txt
"""

import base64, json, subprocess, sys, tempfile, time
from pathlib import Path

# ─── تنظیمات کلی ──────────────────────────────
HERE          = Path(__file__).resolve().parent
SING_BOX_BIN  = HERE / "sing-box.exe"
INPUT_FILE    = HERE / "config.test.txt"
SOCKS_PORT    = 10808
TIMEOUT       = 10
TEST_URL      = "https://www.gstatic.com/generate_204"
# ──────────────────────────────────────────────

def pad64(s: str) -> str:
    return s + "=" * ((4 - len(s) % 4) % 4)

def b64decode_safe(s: str) -> str | None:
    try:
        return base64.urlsafe_b64decode(pad64(s)).decode()
    except Exception:
        return None

def parse_ss(link: str):
    """
    پشتیبانی از فرمت‌های مختلف Shadowsocks:
      1) ss://BASE64(method:pwd@host:port)
      2) ss://BASE64(method:pwd)@host:port
      3) ss://method:pwd@host:port
    """
    core = link[5:].lstrip("/").split("#", 1)[0].split("?", 1)[0]

    decoded = b64decode_safe(core)
    if decoded and "@" in decoded:
        userinfo, hostport = decoded.split("@", 1)
        method, pwd        = userinfo.split(":", 1)
        host, port         = hostport.rsplit(":", 1)
        return host, int(port), method, pwd

    if "@" not in core or ":" not in core.rsplit("@", 1)[1]:
        raise ValueError("bad-format")

    userinfo, hostport = core.split("@", 1)
    host, port         = hostport.rsplit(":", 1)

    if ":" in userinfo:
        method, pwd = userinfo.split(":", 1)
    else:
        txt = b64decode_safe(userinfo)
        if txt and ":" in txt:
            method, pwd = txt.split(":", 1)
        else:
            raise ValueError("bad-userinfo")

    return host, int(port), method, pwd

def build_cfg(host, port, method, pwd):
    return {
        "log": { "level": "debug", "output": "stdout" },
        "inbounds": [{
            "type": "socks",
            "listen": "127.0.0.1",
            "listen_port": SOCKS_PORT
        }],
        "outbounds": [{
            "type": "shadowsocks",
            "tag":  "ss-out",
            "server": host,
            "server_port": port,
            "method": method,
            "password": pwd,
            "udp": True
        }]
    }

def test_link(link: str) -> bool:
    try:
        host, port, method, pwd = parse_ss(link)
    except Exception as e:
        print(f" ⚠️ {e}")
        return False

    cfg = build_cfg(host, port, method, pwd)

    with tempfile.TemporaryDirectory() as td:
        cfg_path = Path(td) / "sb.json"
        cfg_path.write_text(json.dumps(cfg))

        proc = subprocess.Popen(
            [str(SING_BOX_BIN), "run", "-c", str(cfg_path)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        time.sleep(1.2)
        try:
            import requests
            r = requests.get(
                TEST_URL,
                proxies={"http": f"socks5h://127.0.0.1:{SOCKS_PORT}",
                         "https":f"socks5h://127.0.0.1:{SOCKS_PORT}"},
                timeout=TIMEOUT
            )
            return r.status_code in (200, 204)
        except Exception:
            return False
        finally:
            proc.kill()

def main():
    if not SING_BOX_BIN.exists():
        sys.exit("❌ فایل sing-box.exe پیدا نشد!")

    links = [ln.strip() for ln in INPUT_FILE.read_text(encoding="utf-8").splitlines()
             if ln.strip().lower().startswith("ss://")]

    good, bad = [], []
    for i, ln in enumerate(links, 1):
        head = ln[:70] + ("…" if len(ln) > 70 else "")
        print(f"[{i}/{len(links)}] {head:<72}", end="")
        if test_link(ln):
            print(" ✔")
            good.append(ln)
        else:
            print(" ❌")
            bad.append(ln)

    (HERE / "working.txt").write_text("\n".join(good), encoding="utf-8")
    (HERE / "dead.txt").write_text("\n".join(bad), encoding="utf-8")
    print(f"\n🎯 پایان — سالم: {len(good)} | خراب/نامعتبر: {len(bad)}")

if __name__ == "__main__":
    main()
