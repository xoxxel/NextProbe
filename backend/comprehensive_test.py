"""
تست کامل پروکسی با لینک‌های نمونه
"""
import asyncio
import sys
import os

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    os.environ['PYTHONIOENCODING'] = 'utf-8'

from app.services.proxy_checker import ProxyChecker

# لینک‌های نمونه برای تست
SAMPLE_LINKS = [
    # Shadowsocks
    "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@example.com:8388",
    "ss://YWVzLTEyOC1nY206dGVzdA==@192.168.1.1:8388",
    
    # Trojan
    "trojan://password123@example.com:443",
    "trojan://mypassword@test.server.com:8080",
    
    # VLESS
    "vless://uuid123-456-789@example.com:443?encryption=none",
    "vless://550e8400-e29b-41d4-a716-446655440000@example.com:443?security=reality&pbk=SLwVMXPebd9h1t0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0Q0&sid=ab",
    
    # VMess
    "vmess://eyJhZGQiOiJleGFtcGxlLmNvbSIsInBvcnQiOiI0NDMiLCJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImFpZCI6IjAiLCJzY3kiOiJhdXRvIiwibmV0IjoidGNwIn0=",
    
    # Hysteria
    "hysteria://user:pass@example.com:443",
    "hy2://user:pass@example.com:443",
    
    # TUIC
    "tuic://uuid:password@example.com:443",
    
    # لینک‌های نامعتبر
    "invalid://bad-link",
    "http://not-a-proxy",
    "ss://invalid-base64",
]

async def test_comprehensive():
    """تست جامع سیستم"""
    print("Starting comprehensive system test...")
    
    checker = ProxyChecker()
    
    # 1. تست وضعیت سرویس
    print("\nService status test:")
    print(f"sing-box available: {checker.is_available()}")
    print(f"Version: {checker.get_version()}")
    
    # 2. تست Parse کردن لینک‌ها
    print("\nProxy link parsing test:")
    parse_results = []
    for i, link in enumerate(SAMPLE_LINKS, 1):
        print(f"[{i}/{len(SAMPLE_LINKS)}] {link[:50]}...")
        result = checker.parse_proxy(link)
        parse_results.append(result)
        
        if result.is_valid:
            print(f"  Valid - Type: {result.proxy_type}")
        else:
            print(f"  Invalid - Error: {result.error}")
    
    # 3. آمار Parse
    valid_count = sum(1 for r in parse_results if r.is_valid)
    invalid_count = len(parse_results) - valid_count
    
    print(f"\nParsing statistics:")
    print(f"  Total links: {len(SAMPLE_LINKS)}")
    print(f"  Valid: {valid_count}")
    print(f"  Invalid: {invalid_count}")
    
    # 4. تست انواع پروکسی‌ها
    print(f"\nDetected proxy types:")
    proxy_types = {}
    for result in parse_results:
        if result.is_valid and result.proxy_type:
            proxy_types[result.proxy_type] = proxy_types.get(result.proxy_type, 0) + 1
    
    for proxy_type, count in proxy_types.items():
        print(f"  {proxy_type}: {count}")
    
    # 5. تست اتصال (فقط لینک‌های معتبر)
    print(f"\nConnection test for valid links:")
    valid_links = [r.link for r in parse_results if r.is_valid]
    
    if valid_links:
        print("Note: Sample links are not real, so connection will not succeed")
        
        # تست یک لینک به عنوان نمونه
        test_link = valid_links[0]
        print(f"Testing sample: {test_link}")
        
        test_result = checker.test_proxy(test_link, timeout=5)
        print(f"  Result: {'Working' if test_result.is_working else 'Not working'}")
        if test_result.error:
            print(f"  Error: {test_result.error}")
    else:
        print("No valid links found for testing")
    
    print("\nComprehensive test completed!")

if __name__ == "__main__":
    asyncio.run(test_comprehensive())
