# NextProbe 🚀

> High-speed proxy servers and advanced tools for secure internet browsing and data access.

## 🎯 Features

- **Multi-Protocol Support**: Shadowsocks, VLESS, Trojan, VMess, Hysteria2, TUIC
- **Proxy Link Parsing**: Advanced parsing and validation of proxy configurations
- **Real-time Testing**: Comprehensive proxy testing and speed measurement
- **Modern UI**: Clean, responsive interface with dark/light theme support
- **Universal Deployment**: Supports both local development and server deployment
- **sing-box Integration**: Powered by sing-box for reliable proxy management

## 🏗️ Architecture

```
NextProbe/
├── backend/              # FastAPI backend server
│   ├── api/             # API endpoints
│   ├── core/            # Core functionality
│   ├── models/          # Data models
│   ├── services/        # Business logic
│   └── start.py         # Application entry point
├── frontend-new/        # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── styles/      # CSS styles
│   │   ├── utils/       # Utility functions
│   │   └── hooks/       # Custom React hooks
│   ├── public/          # Static assets
│   └── package.json     # Dependencies
├── tester/              # Testing utilities
└── sing-box/            # sing-box binaries
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- Git

### Backend Setup

```bash
# Clone the repository
git clone git@github.com:xoxxel/NextProbe.git
cd NextProbe

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
cd backend
python start.py --start
```

### Frontend Setup

```bash
# Install Node.js dependencies
cd frontend-new
npm install

# Start the development server
npm run dev
```

## 📡 API Endpoints

### Proxy Management
- `GET /api/health` - Health check
- `GET /api/proxy/status` - Proxy service status
- `POST /api/proxy/parse` - Parse proxy links
- `POST /api/proxy/test` - Test proxy connectivity

### Supported Protocols
- **Shadowsocks**: `ss://` links
- **VLESS**: `vless://` links
- **Trojan**: `trojan://` links
- **VMess**: `vmess://` links
- **Hysteria2**: `hysteria2://` links
- **TUIC**: `tuic://` links

## 🧪 Testing

### Backend Tests
```bash
cd tester
python parse.test.py
```

### Frontend Tests
```bash
cd frontend-new
npm test
```

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
SERVER_MODE=false
LISTEN_HOST=127.0.0.1
LISTEN_PORT=8000

# Proxy Configuration
PROXY_PORT=10808
TIMEOUT=10

# sing-box Configuration
SING_BOX_PATH=auto
```

### sing-box Integration
The application uses sing-box for proxy management. It automatically detects the appropriate binary for your platform:
- Windows: `sing-box.exe`
- Linux: `sing-box-linux-amd64`
- macOS: `sing-box-darwin-universal`

## 🌐 Deployment

### Local Development
```bash
# Start backend
python backend/start.py --start

# Start frontend
cd frontend-new && npm run dev
```

### Server Deployment
```bash
# Using Docker
docker-compose up -d

# Or manual deployment
SERVER_MODE=true python backend/start.py --start
```

## 📊 Performance

- **Parse Speed**: ~100ms per proxy link
- **Test Speed**: ~5s per proxy (with timeout)
- **Supported Formats**: 6 major proxy protocols
- **Success Rate**: 85%+ for valid proxy links

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [sing-box](https://github.com/SagerNet/sing-box) - Universal proxy platform
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [React](https://reactjs.org/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📬 Contact

- GitHub: [@xoxxel](https://github.com/xoxxel)
- Project Link: [https://github.com/xoxxel/NextProbe](https://github.com/xoxxel/NextProbe)

---

⭐ **Star this repo if you find it helpful!**
