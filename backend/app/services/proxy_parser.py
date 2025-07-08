"""
Proxy Parser Module
ماژول parse کردن انواع پروکسی‌ها
"""
import base64
import json
import re
import urllib.parse
from typing import Dict, Any, Optional
from app.models.proxy_models import ProxyType

class ProxyParser:
    """کلاس parse کردن لینک‌های پروکسی"""
    
    @staticmethod
    def pad4(s: str) -> str:
        """اضافه کردن padding برای base64"""
        return s + "=" * ((4 - len(s) % 4) % 4)
    
    @staticmethod
    def b64dec(s: str) -> str:
        """decode کردن base64"""
        return base64.urlsafe_b64decode(ProxyParser.pad4(s)).decode(errors="ignore")
    
    @staticmethod
    def parse_shadowsocks(link: str) -> Dict[str, Any]:
        """Parse کردن Shadowsocks"""
        core = link[5:].lstrip("/").split("?", 1)[0].split("#", 1)[0]
        
        # حالت full-base64 (method:pwd@host:port)
        dec = None
        if "@" in ProxyParser.b64dec(core):  # احتمالاً کل base64 است
            try:
                dec = ProxyParser.b64dec(core)
            except Exception:
                pass
        
        if dec and "@" in dec:
            userinfo, hostport = dec.split("@", 1)
            method, pwd = userinfo.split(":", 1)
            host, port = hostport.rsplit(":", 1)
        else:
            # حالت userinfo@host:port
            if "@" not in core or ":" not in core.split("@", 1)[1]:
                raise ValueError("bad-format")
            userinfo, hostport = core.split("@", 1)
            host, port = hostport.rsplit(":", 1)
            # userinfo ممکن است base64 باشد
            if ":" in userinfo:
                method, pwd = userinfo.split(":", 1)
            else:
                method, pwd = ProxyParser.b64dec(userinfo).split(":", 1)
        
        return {
            "type": "shadowsocks",
            "server": host,
            "server_port": int(port),
            "method": method,
            "password": pwd,
            "udp": True
        }
    
    @staticmethod
    def parse_trojan(link: str) -> Dict[str, Any]:
        """Parse کردن Trojan"""
        m = re.match(r"trojan://([^@]+)@([^:/]+):(\d+)", link)
        if not m:
            raise ValueError("format")
        pwd, host, port = m.groups()
        return {
            "type": "trojan",
            "server": host,
            "server_port": int(port),
            "password": pwd
        }
    
    @staticmethod
    def parse_vless(link: str) -> Dict[str, Any]:
        """Parse کردن VLESS"""
        u = urllib.parse.urlparse(link)
        if not (u.username and u.hostname):
            raise ValueError("format")
        
        opts = urllib.parse.parse_qs(u.query)
        if opts.get("security", [""])[0] == "reality":
            return {
                "type": "vless",
                "server": u.hostname,
                "server_port": u.port or 443,
                "uuid": u.username,
                "flow": "xtls-rprx-vision",
                "reality": {
                    "public_key": opts.get("pbk", [""])[0],
                    "short_id": opts.get("sid", [""])[0]
                }
            }
        
        return {
            "type": "vless",
            "server": u.hostname,
            "server_port": u.port or 443,
            "uuid": u.username,
            "encryption": "none"
        }
    
    @staticmethod
    def parse_vmess(link: str) -> Dict[str, Any]:
        """Parse کردن VMess"""
        raw = json.loads(ProxyParser.b64dec(link[8:]))  # vmess://
        addr = raw.get("add") or raw.get("address") or raw.get("host")
        if not addr:
            raise ValueError("vmess: no address")
        
        return {
            "type": "vmess",
            "server": addr,
            "server_port": int(raw.get("port", 443)),
            "uuid": raw["id"],
            "alter_id": int(raw.get("aid", 0)),
            "security": raw.get("scy", "auto")
        }
    
    @staticmethod
    def parse_hysteria(link: str) -> Dict[str, Any]:
        """Parse کردن Hysteria"""
        link = link.replace("hy2://", "hysteria://").replace("hysteria2://", "hysteria://")
        u = urllib.parse.urlparse(link)
        insecure = "1" in u.query or "true" in u.query
        
        return {
            "type": "hysteria",
            "server": u.hostname,
            "server_port": int(u.port or 443),
            "auth_str": u.username or "",
            "tls": {"insecure": insecure}
        }
    
    @staticmethod
    def parse_tuic(link: str) -> Dict[str, Any]:
        """Parse کردن TUIC"""
        u = urllib.parse.urlparse(link)
        if not (u.username and u.hostname):
            raise ValueError("format")
        
        return {
            "type": "tuic",
            "server": u.hostname,
            "server_port": u.port or 443,
            "uuid": u.username,
            "password": u.password or "",
            "congestion_controller": "bbr"
        }
    
    # نگاشت scheme → parser
    PARSERS = {
        "ss": parse_shadowsocks,
        "shadowsocks": parse_shadowsocks,
        "trojan": parse_trojan,
        "vless": parse_vless,
        "vmess": parse_vmess,
        "hysteria": parse_hysteria,
        "hysteria2": parse_hysteria,
        "hy2": parse_hysteria,
        "tuic": parse_tuic,
    }
    
    @classmethod
    def parse(cls, link: str) -> Dict[str, Any]:
        """Parse کردن لینک پروکسی"""
        if "://" not in link:
            raise ValueError("Invalid proxy link format")
        
        scheme = link.split("://", 1)[0].lower()
        if scheme not in cls.PARSERS:
            raise ValueError(f"Unsupported proxy type: {scheme}")
        
        return cls.PARSERS[scheme](link)
    
    @classmethod
    def get_proxy_type(cls, link: str) -> Optional[ProxyType]:
        """تشخیص نوع پروکسی"""
        if "://" not in link:
            return None
        
        scheme = link.split("://", 1)[0].lower()
        type_mapping = {
            "ss": ProxyType.SHADOWSOCKS,
            "shadowsocks": ProxyType.SHADOWSOCKS,
            "trojan": ProxyType.TROJAN,
            "vless": ProxyType.VLESS,
            "vmess": ProxyType.VMESS,
            "hysteria": ProxyType.HYSTERIA,
            "hysteria2": ProxyType.HYSTERIA,
            "hy2": ProxyType.HYSTERIA,
            "tuic": ProxyType.TUIC,
        }
        
        return type_mapping.get(scheme)
