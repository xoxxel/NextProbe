# 🔍 Proxy Tester - Full Stack Application

یک اپلیکیشن کامل برای تست و بررسی پروکسی‌ها با استفاده از sing-box، React و FastAPI

## ✨ ویژگی‌ها

- **Frontend (React + Vite)**
  - 🚀 React 18 با Vite برای توسعه سریع
  - 🧭 React Router برای ناوبری
  - 🎨 Tailwind CSS برای استایل‌دهی
  - 📡 Axios برای درخواست‌های API
  - 🔍 کامپوننت تست پروکسی با UI زیبا

- **Backend (FastAPI)**
  - ⚡ FastAPI برای API پرسرعت
  - 🔧 ساختار ماژولار و لایه‌ای
  - 🌐 پشتیبانی از CORS
  - 🔒 مدیریت محیط‌های مختلف
  - 📊 API endpoints کامل برای تست پروکسی

- **Proxy Testing Engine**
  - 🔗 پشتیبانی از تمام پروتکل‌های رایج: Shadowsocks, Trojan, VLESS, VMess, Hysteria, TUIC
  - 🧪 تست تکی و گروهی پروکسی‌ها
  - 📝 Parse کردن لینک‌های پروکسی
  - ⚡ تست همزمان با sing-box
  - 📈 نمایش آمار و نتایج تفصیلی

## 🚀 شروع سریع

### پیش‌نیازها
- Python 3.8+
- Node.js 16+
- npm یا yarn
- sing-box.exe

### نصب و راه‌اندازی

#### روش آسان (تک دستوری):
```bash
# نصب تمام dependencies
python project_start.py --setup

# شروع تمام سرویس‌ها
python project_start.py --dev
```

#### روش دستی:

1. **نصب Backend:**
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
```

2. **نصب Frontend:**
```bash
cd frontend
npm install
```

3. **تنظیم محیط:**
```bash
# در پوشه backend
cp .env.example .env

# در پوشه frontend  
cp .env.example .env
```

### 🏃‍♂️ اجرای پروژه

#### شروع همه سرویس‌ها:
```bash
python project_start.py --dev
```

#### یا به صورت جداگانه:

**Backend:**
```bash
cd backend
python start.py --start
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**sing-box:**
```bash
cd sing-box
.\sing-box.exe run -c hand.json
```

### 📡 API Endpoints

- **GET** `/api/proxy/status` - وضعیت سرویس
- **POST** `/api/proxy/parse` - Parse کردن لینک پروکسی
- **POST** `/api/proxy/test` - تست یک پروکسی
- **POST** `/api/proxy/bulk-test` - تست گروهی پروکسی‌ها
- **GET** `/api/proxy/supported-types` - انواع پروکسی‌های پشتیبانی شده

## 📁 ساختار پروژه

```
.
├── backend/                     # Backend FastAPI
│   ├── app/
│   │   ├── main.py             # FastAPI اصلی
│   │   ├── models/
│   │   │   └── proxy_models.py # Data Models
│   │   ├── services/
│   │   │   ├── proxy_checker.py # سرویس تست پروکسی
│   │   │   └── proxy_parser.py  # Parse کردن لینک‌ها
│   │   └── api/routes/
│   │       └── proxy_routes.py  # API Routes
│   ├── .env.example            # متغیرهای محیطی
│   ├── requirements.txt        # Dependencies
│   ├── start.py               # اسکریپت شروع
│   └── test_proxy.py          # تست‌ها
├── frontend/                   # Frontend React
│   ├── src/
│   │   ├── App.jsx            # کامپوننت اصلی
│   │   ├── components/
│   │   │   ├── ProxyTester.jsx # کامپوننت تست پروکسی
│   │   │   └── ProxyTester.css # استایل‌ها
│   │   └── main.jsx           # Entry point
│   ├── package.json           # Dependencies
│   └── vite.config.js         # تنظیمات Vite
├── sing-box/                   # sing-box Binary
│   ├── sing-box.exe           # Binary اصلی
│   ├── hand.json              # Config پیش‌فرض
│   └── app.py                 # MVP اصلی
├── project_start.py           # اسکریپت شروع کل پروژه
└── system_test.py             # تست کامل سیستم
```

## 🔧 متغیرهای محیطی

### Backend (.env)
```env
# سرور
PORT=8000
HOST=0.0.0.0
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# تنظیمات پروکسی
PROXY_DEFAULT_PORT=10808
PROXY_DEFAULT_TIMEOUT=12
PROXY_MAX_CONCURRENT_TESTS=5
PROXY_MAX_BULK_LINKS=50

# sing-box
SING_BOX_PATH=../sing-box/sing-box.exe
SING_BOX_LOG_LEVEL=error
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

## 🧪 تست‌ها

### تست Backend:
```bash
# تست سرویس پروکسی
cd backend
python test_proxy.py

# تست جامع
python comprehensive_test.py

# تست API (بعد از اجرای backend)
python test_api.py
```

### تست کامل سیستم:
```bash
python system_test.py
```

## 📊 نتایج تست

✅ **Parser Engine**: 10/13 لینک با موفقیت parse شد
- Shadowsocks: 2 نوع
- Trojan: 2 نوع  
- VLESS: 2 نوع
- VMess: 1 نوع
- Hysteria: 2 نوع
- TUIC: 1 نوع

✅ **sing-box Integration**: موفق
✅ **API Endpoints**: فعال
✅ **Frontend Components**: آماده

## 🚀 استفاده

### API Examples:

```bash
# تست وضعیت سرویس
curl http://localhost:8000/api/proxy/status

# Parse کردن لینک
curl -X POST http://localhost:8000/api/proxy/parse \
  -H "Content-Type: application/json" \
  -d '{"link": "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@example.com:8388"}'

# تست یک پروکسی
curl -X POST http://localhost:8000/api/proxy/test \
  -H "Content-Type: application/json" \
  -d '{"link": "ss://YWVzLTI1Ni1nY206cGFzc3dvcmQ=@example.com:8388"}'
```

### Frontend:
1. برو به http://localhost:5173
2. کلیک روی "Proxy Tester"
3. لینک پروکسی را وارد کن
4. "تست کردن" یا "Parse کردن" را انتخاب کن

## 🎯 کاربردها

- **تست پروکسی‌های شخصی**: بررسی سرعت و کارکرد
- **مدیریت VPN**: تست bulk لینک‌ها
- **توسعه نرم‌افزار**: integration در پروژه‌های دیگر
- **آموزش**: یادگیری ساختار Full Stack

## 🔮 قابلیت‌های آینده

- [ ] پایگاه داده برای ذخیره نتایج
- [ ] احراز هویت کاربران
- [ ] نمودارهای آماری
- [ ] تست خودکار دوره‌ای
- [ ] اعلان‌ها و Alert ها
- [ ] API Rate Limiting
- [ ] Docker Support

## 🤝 مشارکت

مشارکت‌ها خوش‌آمدید! برای مشارکت:

1. Fork کنید
2. Branch جدید بسازید
3. تغییرات را commit کنید
4. Pull Request بفرستید

## 📄 لایسنس

MIT License - استفاده آزاد برای تمام پروژه‌ها!
