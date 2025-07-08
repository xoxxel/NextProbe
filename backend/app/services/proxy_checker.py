"""
Proxy Checker Service
سرویس تست و بررسی پروکسی‌ها با sing-box
"""
import json
import subprocess
import tempfile
import time
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple
import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

from app.services.proxy_parser import ProxyParser
from app.models.proxy_models import ProxyTestResult, ProxyBulkTestResult, ProxyParseResult, ProxyType


class ProxyChecker:
    """کلاس تست پروکسی‌ها"""
    
    def __init__(self, sing_box_path: str = None, default_port: int = 10808):
        self.sing_box_path = Path(sing_box_path) if sing_box_path else self._find_sing_box()
        self.default_port = default_port
        self.parser = ProxyParser()
    
    def _find_sing_box(self) -> Path:
        """پیدا کردن مسیر sing-box"""
        # اول از همین پوشه پروژه
        project_root = Path(__file__).parent.parent.parent.parent
        sing_box_dir = project_root / "sing-box"
        
        if (sing_box_dir / "sing-box.exe").exists():
            return sing_box_dir / "sing-box.exe"
        
        # اگر پیدا نشد، خطا بده
        raise FileNotFoundError("sing-box.exe not found!")
    
    def is_available(self) -> bool:
        """بررسی در دسترس بودن sing-box"""
        return self.sing_box_path.exists()
    
    def get_version(self) -> Optional[str]:
        """دریافت نسخه sing-box"""
        if not self.is_available():
            return None
        
        try:
            result = subprocess.run(
                [str(self.sing_box_path), "version"],
                capture_output=True,
                text=True,
                timeout=5
            )
            return result.stdout.strip()
        except Exception:
            return None
    
    def _make_config(self, proxy_config: Dict[str, Any], port: int) -> Dict[str, Any]:
        """ساخت config برای sing-box"""
        return {
            "log": {"level": "error", "output": "stdout"},
            "inbounds": [{
                "type": "socks",
                "listen": "127.0.0.1",
                "listen_port": port
            }],
            "outbounds": [proxy_config],
        }
    
    def _test_single_proxy(self, 
                          proxy_config: Dict[str, Any], 
                          port: int,
                          test_url: str = "https://www.gstatic.com/generate_204",
                          timeout: int = 12) -> Tuple[bool, Optional[float], Optional[str]]:
        """تست یک پروکسی و بازگشت (is_working, response_time, error)"""
        
        config = self._make_config(proxy_config, port)
        
        with tempfile.TemporaryDirectory() as temp_dir:
            config_path = Path(temp_dir) / "config.json"
            config_path.write_text(json.dumps(config, indent=2))
            
            # شروع sing-box
            proc = None
            try:
                proc = subprocess.Popen(
                    [str(self.sing_box_path), "run", "-c", str(config_path)],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL
                )
                
                # صبر برای بالا آمدن سرویس
                time.sleep(1.5)
                
                # تست اتصال
                start_time = time.time()
                response = requests.get(
                    test_url,
                    proxies={
                        "http": f"socks5h://127.0.0.1:{port}",
                        "https": f"socks5h://127.0.0.1:{port}"
                    },
                    timeout=timeout
                )
                response_time = time.time() - start_time
                
                is_working = response.status_code in (200, 204)
                return is_working, response_time if is_working else None, None
                
            except requests.exceptions.RequestException as e:
                return False, None, str(e)
            except Exception as e:
                return False, None, f"Unexpected error: {str(e)}"
            finally:
                if proc:
                    proc.kill()
                    proc.wait()
    
    def parse_proxy(self, link: str) -> ProxyParseResult:
        """Parse کردن لینک پروکسی"""
        try:
            config = self.parser.parse(link)
            proxy_type = self.parser.get_proxy_type(link)
            
            return ProxyParseResult(
                link=link,
                is_valid=True,
                proxy_type=proxy_type,
                config=config
            )
        except Exception as e:
            return ProxyParseResult(
                link=link,
                is_valid=False,
                error=str(e)
            )
    
    def test_proxy(self, 
                  link: str, 
                  timeout: int = 12,
                  test_url: str = "https://www.gstatic.com/generate_204") -> ProxyTestResult:
        """تست یک پروکسی"""
        
        # اول parse کنیم
        parse_result = self.parse_proxy(link)
        if not parse_result.is_valid:
            return ProxyTestResult(
                link=link,
                is_working=False,
                error=f"Parse error: {parse_result.error}",
                parsed_config=None
            )
        
        # حالا تست کنیم
        port = self.default_port
        is_working, response_time, error = self._test_single_proxy(
            parse_result.config, port, test_url, timeout
        )
        
        return ProxyTestResult(
            link=link,
            is_working=is_working,
            response_time=response_time,
            error=error,
            parsed_config=parse_result.config
        )
    
    def test_proxies_bulk(self, 
                         links: List[str], 
                         timeout: int = 12,
                         test_url: str = "https://www.gstatic.com/generate_204",
                         max_workers: int = 5) -> ProxyBulkTestResult:
        """تست چندین پروکسی به صورت همزمان"""
        
        results = []
        working_count = 0
        failed_count = 0
        
        # استفاده از ThreadPoolExecutor برای تست همزمان
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            # ارسال task های تست
            future_to_link = {
                executor.submit(self.test_proxy, link, timeout, test_url): link 
                for link in links
            }
            
            # جمع‌آوری نتایج
            for future in as_completed(future_to_link):
                result = future.result()
                results.append(result)
                
                if result.is_working:
                    working_count += 1
                else:
                    failed_count += 1
        
        return ProxyBulkTestResult(
            total=len(links),
            working=working_count,
            failed=failed_count,
            results=results
        )
