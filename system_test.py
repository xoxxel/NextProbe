"""
تست کامل سیستم
اجرای تمام تست‌ها و بررسی عملکرد
"""
import subprocess
import time
import sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import requests

def test_dependencies():
    """بررسی dependencies"""
    print("🔍 بررسی dependencies...")
    
    # Python
    try:
        python_version = sys.version.split()[0]
        print(f"✅ Python: {python_version}")
    except:
        print("❌ Python یافت نشد")
        return False
    
    # Node.js
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js: {result.stdout.strip()}")
        else:
            print("❌ Node.js یافت نشد")
            return False
    except:
        print("❌ Node.js یافت نشد")
        return False
    
    # sing-box
    sing_box_path = Path("sing-box/sing-box.exe")
    if sing_box_path.exists():
        print("✅ sing-box.exe یافت شد")
    else:
        print("❌ sing-box.exe یافت نشد")
        return False
    
    return True

def test_backend_setup():
    """بررسی نصب backend"""
    print("\n🔍 بررسی نصب backend...")
    
    backend_dir = Path("backend")
    requirements = backend_dir / "requirements.txt"
    
    if not requirements.exists():
        print("❌ requirements.txt یافت نشد")
        return False
    
    print("✅ Backend files OK")
    return True

def test_frontend_setup():
    """بررسی نصب frontend"""
    print("\n🔍 بررسی نصب frontend...")
    
    frontend_dir = Path("frontend")
    package_json = frontend_dir / "package.json"
    
    if not package_json.exists():
        print("❌ package.json یافت نشد")
        return False
    
    print("✅ Frontend files OK")
    return True

def run_backend_tests():
    """اجرای تست‌های backend"""
    print("\n🧪 اجرای تست‌های backend...")
    
    try:
        # تست proxy checker
        result = subprocess.run(
            [sys.executable, "backend/comprehensive_test.py"],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            print("✅ Backend tests passed")
            return True
        else:
            print("❌ Backend tests failed")
            print(result.stderr)
            return False
            
    except Exception as e:
        print(f"❌ خطا در اجرای تست backend: {e}")
        return False

def setup_project():
    """نصب dependencies"""
    print("\n📦 نصب dependencies...")
    
    try:
        # Backend
        print("نصب backend dependencies...")
        result = subprocess.run(
            [sys.executable, "backend/start.py", "--install"],
            cwd=Path.cwd(),
            timeout=120
        )
        
        if result.returncode != 0:
            print("❌ خطا در نصب backend dependencies")
            return False
        
        # Frontend
        print("نصب frontend dependencies...")
        result = subprocess.run(
            ["npm", "install"],
            cwd=Path("frontend"),
            shell=True,
            timeout=120
        )
        
        if result.returncode != 0:
            print("❌ خطا در نصب frontend dependencies")
            return False
        
        print("✅ تمام dependencies نصب شدند")
        return True
        
    except Exception as e:
        print(f"❌ خطا در نصب: {e}")
        return False

def main():
    """اجرای اصلی"""
    print("🧪 تست کامل سیستم Proxy Tester")
    print("=" * 50)
    
    # مرحله 1: بررسی dependencies
    if not test_dependencies():
        print("\n❌ لطفاً dependencies مورد نیاز را نصب کنید")
        return
    
    # مرحله 2: بررسی فایل‌ها
    if not test_backend_setup() or not test_frontend_setup():
        print("\n❌ فایل‌های پروژه ناقص هستند")
        return
    
    # مرحله 3: سوال نصب
    setup_needed = input("\n📦 آیا می‌خواهید dependencies را نصب کنید؟ (y/n): ")
    if setup_needed.lower() == 'y':
        if not setup_project():
            print("\n❌ خطا در نصب dependencies")
            return
    
    # مرحله 4: تست backend
    if not run_backend_tests():
        print("\n❌ تست‌های backend ناموفق")
        return
    
    # مرحله 5: راهنمای اجرا
    print("\n🚀 راهنمای اجرای سیستم:")
    print("=" * 50)
    print("1. شروع همه سرویس‌ها:")
    print("   python project_start.py --dev")
    print()
    print("2. یا اجرای جداگانه:")
    print("   Backend:  python backend/start.py --start")
    print("   Frontend: cd frontend && npm run dev")
    print("   sing-box: cd sing-box && .\\sing-box.exe run -c hand.json")
    print()
    print("3. آدرس‌ها:")
    print("   🌐 Frontend: http://localhost:5173")
    print("   🔧 Backend:  http://localhost:8000")
    print("   📝 API Docs: http://localhost:8000/docs")
    print()
    print("4. تست API:")
    print("   python backend/test_api.py")
    print()
    print("✅ سیستم آماده استفاده است!")

if __name__ == "__main__":
    main()
