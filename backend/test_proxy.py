"""
تست سریع API پروکسی
"""
import asyncio
import sys
from pathlib import Path

# اضافه کردن مسیر پروژه
sys.path.append(str(Path(__file__).parent.parent))

from app.services.proxy_checker import ProxyChecker


async def test_proxy_service():
    """تست سرویس پروکسی"""
    print("🔍 Testing Proxy Service...")
    
    # ایجاد instance
    try:
        checker = ProxyChecker()
        print(f"✅ ProxyChecker initialized")
        print(f"📍 sing-box path: {checker.sing_box_path}")
        print(f"🔄 Is available: {checker.is_available()}")
        
        if checker.is_available():
            version = checker.get_version()
            print(f"📦 Version: {version}")
        
        # تست parse
        test_links = [
            "ss://YWVzLTEyOC1nY206dGVzdA==@192.168.1.1:8388",
            "trojan://password123@example.com:443",
            "invalid://bad-link"
        ]
        
        print("\n🔍 Testing Parse Function:")
        for link in test_links:
            result = checker.parse_proxy(link)
            print(f"Link: {link[:50]}...")
            print(f"  Valid: {result.is_valid}")
            if result.is_valid:
                print(f"  Type: {result.proxy_type}")
                print(f"  Config: {result.config}")
            else:
                print(f"  Error: {result.error}")
            print()
        
        print("✅ All tests completed!")
        
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    asyncio.run(test_proxy_service())
