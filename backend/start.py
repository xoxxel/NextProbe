"""
اسکریپت راه‌اندازی backend
"""
import subprocess
import sys
from pathlib import Path

def install_requirements():
    """نصب requirements"""
    print("📦 Installing requirements...")
    # Get the directory of this script
    script_dir = Path(__file__).parent
    requirements_path = script_dir / "requirements.txt"
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", str(requirements_path)])

def start_server():
    """شروع سرور"""
    print("🚀 Starting FastAPI server...")
    subprocess.run([
        sys.executable, "-m", "uvicorn", 
        "app.main:app", 
        "--host", "0.0.0.0", 
        "--port", "8000", 
        "--reload"
    ])

def main():
    """اجرای اصلی"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Backend Management')
    parser.add_argument('--install', action='store_true', help='Install requirements')
    parser.add_argument('--start', action='store_true', help='Start server')
    parser.add_argument('--test', action='store_true', help='Test proxy service')
    
    args = parser.parse_args()
    
    if args.install:
        install_requirements()
    elif args.start:
        start_server()
    elif args.test:
        subprocess.run([sys.executable, "test_proxy.py"])
    else:
        print("Usage:")
        print("  python start.py --install   # نصب requirements")
        print("  python start.py --start     # شروع سرور")
        print("  python start.py --test      # تست سرویس")

if __name__ == "__main__":
    main()
