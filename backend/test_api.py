"""
تست API endpoints
"""
import requests
import json
import time

API_BASE = "http://localhost:8000/api"

def test_api_endpoints():
    """تست API endpoints"""
    print("🔍 تست API Endpoints...")
    
    # 1. تست وضعیت سرویس
    print("\n1. تست وضعیت سرویس:")
    try:
        response = requests.get(f"{API_BASE}/proxy/status")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ وضعیت: {data['status']}")
            print(f"📊 پیام: {data['message']}")
            print(f"🔧 sing-box: {data['sing_box_available']}")
            if data.get('version'):
                print(f"📦 نسخه: {data['version']}")
        else:
            print(f"❌ خطا: {response.status_code}")
    except Exception as e:
        print(f"❌ خطا در اتصال: {e}")
        return False
    
    # 2. تست Parse کردن پروکسی
    print("\n2. تست Parse کردن پروکسی:")
    test_links = [
        "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@example.com:8388",
        "trojan://password123@example.com:443",
        "invalid://bad-link"
    ]
    
    for link in test_links:
        try:
            response = requests.post(f"{API_BASE}/proxy/parse", 
                                   json={"link": link})
            if response.status_code == 200:
                data = response.json()
                print(f"  📝 {link[:40]}...")
                print(f"     معتبر: {data['is_valid']}")
                if data['is_valid']:
                    print(f"     نوع: {data['proxy_type']}")
                else:
                    print(f"     خطا: {data['error']}")
            else:
                print(f"  ❌ خطا {response.status_code}: {link[:40]}")
        except Exception as e:
            print(f"  ❌ خطا: {e}")
    
    # 3. تست تک پروکسی
    print("\n3. تست تک پروکسی:")
    try:
        response = requests.post(f"{API_BASE}/proxy/test", 
                               json={"link": "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@example.com:8388",
                                     "timeout": 5})
        if response.status_code == 200:
            data = response.json()
            print(f"  🧪 نتیجه: {'✅ کارکرد' if data['is_working'] else '❌ کارنکرد'}")
            if data.get('error'):
                print(f"  📝 خطا: {data['error']}")
        else:
            print(f"  ❌ خطا: {response.status_code}")
    except Exception as e:
        print(f"  ❌ خطا: {e}")
    
    # 4. تست گروهی
    print("\n4. تست گروهی:")
    try:
        response = requests.post(f"{API_BASE}/proxy/bulk-test", 
                               json={"links": [
                                   "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@example.com:8388",
                                   "trojan://password123@example.com:443"
                               ], "timeout": 5})
        if response.status_code == 200:
            data = response.json()
            print(f"  📊 کل: {data['total']}")
            print(f"  ✅ کارکرد: {data['working']}")
            print(f"  ❌ کارنکرد: {data['failed']}")
        else:
            print(f"  ❌ خطا: {response.status_code}")
    except Exception as e:
        print(f"  ❌ خطا: {e}")
    
    # 5. تست انواع پشتیبانی شده
    print("\n5. تست انواع پشتیبانی شده:")
    try:
        response = requests.get(f"{API_BASE}/proxy/supported-types")
        if response.status_code == 200:
            data = response.json()
            print(f"  🔗 انواع پروکسی: {', '.join(data['supported_types'])}")
        else:
            print(f"  ❌ خطا: {response.status_code}")
    except Exception as e:
        print(f"  ❌ خطا: {e}")
    
    print("\n✅ تست API endpoints تمام شد!")
    return True

if __name__ == "__main__":
    print("⚠️  لطفاً ابتدا backend را اجرا کنید:")
    print("   cd backend && python start.py --start")
    print()
    
    input("پس از اجرای backend، Enter را فشار دهید...")
    
    test_api_endpoints()
