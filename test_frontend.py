"""
تست Frontend Components
"""
import subprocess
import webbrowser
import time
import sys
from pathlib import Path

def check_frontend_setup():
    """بررسی نصب frontend"""
    print("🔍 بررسی نصب frontend...")
    
    frontend_dir = Path("frontend")
    package_json = frontend_dir / "package.json"
    node_modules = frontend_dir / "node_modules"
    
    if not package_json.exists():
        print("❌ package.json یافت نشد")
        return False
    
    if not node_modules.exists():
        print("⚠️  node_modules یافت نشد، npm install اجرا کنید")
        return False
    
    print("✅ frontend آماده است")
    return True

def start_frontend():
    """شروع frontend"""
    print("🚀 شروع frontend...")
    
    try:
        # تغییر به پوشه frontend
        frontend_dir = Path("frontend")
        
        # اجرای npm run dev
        process = subprocess.Popen(
            ["npm", "run", "dev"],
            cwd=frontend_dir,
            shell=True
        )
        
        print("⏱️  صبر برای بالا آمدن frontend...")
        time.sleep(5)
        
        # باز کردن مرورگر
        print("🌐 باز کردن مرورگر...")
        webbrowser.open("http://localhost:5173")
        
        print("✅ Frontend در حال اجرا:")
        print("   📍 آدرس: http://localhost:5173")
        print("   🔍 تست پروکسی: http://localhost:5173/proxy")
        print("\n⚠️  برای توقف، Ctrl+C را فشار دهید")
        
        # صبر برای توقف
        try:
            process.wait()
        except KeyboardInterrupt:
            print("\n🛑 توقف frontend...")
            process.terminate()
            
    except Exception as e:
        print(f"❌ خطا در اجرای frontend: {e}")

def main():
    """اجرای اصلی"""
    print("🧪 تست Frontend")
    print("=" * 50)
    
    if not check_frontend_setup():
        print("\n❌ لطفاً ابتدا frontend را نصب کنید:")
        print("   cd frontend && npm install")
        return
    
    print("\n📋 مراحل تست:")
    print("1. شروع frontend")
    print("2. باز کردن مرورگر")
    print("3. تست کامپوننت‌ها")
    print("\n⚠️  اطمینان حاصل کنید که backend در حال اجرا است")
    
    response = input("\nادامه می‌دهید؟ (y/n): ")
    if response.lower() != 'y':
        print("❌ تست لغو شد")
        return
    
    start_frontend()

if __name__ == "__main__":
    main()
