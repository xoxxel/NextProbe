"""
اسکریپت راه‌اندازی کامل پروژه
"""
import subprocess
import sys
import time
import os
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

def run_backend():
    """راه‌اندازی backend"""
    print("🚀 Starting Backend...")
    os.chdir("backend")
    subprocess.run([sys.executable, "start.py", "--start"])

def run_frontend():
    """راه‌اندازی frontend"""
    print("🌐 Starting Frontend...")
    os.chdir("frontend")
    subprocess.run(["npm", "run", "dev"], shell=True)

def run_sing_box():
    """راه‌اندازی sing-box"""
    print("📡 Starting sing-box...")
    os.chdir("sing-box")
    subprocess.run(["./sing-box.exe", "run", "-c", "hand.json"], shell=True)

def setup_backend():
    """نصب requirements backend"""
    print("📦 Setting up Backend...")
    os.chdir("backend")
    subprocess.run([sys.executable, "start.py", "--install"])
    os.chdir("..")

def setup_frontend():
    """نصب dependencies frontend"""
    print("📦 Setting up Frontend...")
    os.chdir("frontend")
    subprocess.run(["npm", "install"], shell=True)
    os.chdir("..")

def main():
    """اجرای اصلی"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Project Management Script')
    parser.add_argument('--setup', action='store_true', help='Setup all dependencies')
    parser.add_argument('--dev', action='store_true', help='Start all services in development mode')
    parser.add_argument('--backend', action='store_true', help='Start only backend')
    parser.add_argument('--frontend', action='store_true', help='Start only frontend')
    parser.add_argument('--sing-box', action='store_true', help='Start only sing-box')
    
    args = parser.parse_args()
    
    if args.setup:
        print("🔧 Setting up project...")
        setup_backend()
        setup_frontend()
        print("✅ Setup completed!")
        
    elif args.dev:
        print("🚀 Starting all services...")
        with ThreadPoolExecutor(max_workers=3) as executor:
            futures = []
            futures.append(executor.submit(run_backend))
            futures.append(executor.submit(run_frontend))
            futures.append(executor.submit(run_sing_box))
            
            # صبر برای تمام سرویس‌ها
            for future in futures:
                future.result()
                
    elif args.backend:
        run_backend()
    elif args.frontend:
        run_frontend()
    elif args.sing_box:
        run_sing_box()
    else:
        print("استفاده:")
        print("  python project_start.py --setup      # نصب dependencies")
        print("  python project_start.py --dev        # شروع تمام سرویس‌ها")
        print("  python project_start.py --backend    # فقط backend")
        print("  python project_start.py --frontend   # فقط frontend")
        print("  python project_start.py --sing-box   # فقط sing-box")

if __name__ == "__main__":
    main()
