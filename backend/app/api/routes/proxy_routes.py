"""
Proxy API Routes
اندپوینت‌های API برای سرویس پروکسی
"""
from fastapi import APIRouter, HTTPException, status
from typing import List

from app.models.proxy_models import (
    ProxyTestRequest, ProxyTestResult,
    ProxyBulkTestRequest, ProxyBulkTestResult,
    ProxyParseRequest, ProxyParseResult,
    ServiceStatus
)
from app.services.proxy_checker import ProxyChecker

router = APIRouter(prefix="/proxy", tags=["proxy"])

# ایجاد instance از ProxyChecker
proxy_checker = ProxyChecker()


@router.get("/status", response_model=ServiceStatus)
async def get_service_status():
    """دریافت وضعیت سرویس"""
    is_available = proxy_checker.is_available()
    version = proxy_checker.get_version() if is_available else None
    
    return ServiceStatus(
        status="ok" if is_available else "error",
        message="Service is running" if is_available else "sing-box not available",
        sing_box_available=is_available,
        version=version
    )


@router.post("/parse", response_model=ProxyParseResult)
async def parse_proxy(request: ProxyParseRequest):
    """Parse کردن لینک پروکسی"""
    try:
        result = proxy_checker.parse_proxy(request.link)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error parsing proxy: {str(e)}"
        )


@router.post("/test", response_model=ProxyTestResult)
async def test_proxy(request: ProxyTestRequest):
    """تست یک پروکسی"""
    if not proxy_checker.is_available():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="sing-box is not available"
        )
    
    try:
        result = proxy_checker.test_proxy(
            link=request.link,
            timeout=request.timeout,
            test_url=request.test_url
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error testing proxy: {str(e)}"
        )


@router.post("/bulk-test", response_model=ProxyBulkTestResult)
async def test_proxies_bulk(request: ProxyBulkTestRequest):
    """تست چندین پروکسی"""
    if not proxy_checker.is_available():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="sing-box is not available"
        )
    
    if len(request.links) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No links provided"
        )
    
    if len(request.links) > 50:  # محدودیت برای جلوگیری از overload
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Too many links. Maximum 50 links allowed"
        )
    
    try:
        result = proxy_checker.test_proxies_bulk(
            links=request.links,
            timeout=request.timeout,
            test_url=request.test_url,
            max_workers=5  # محدود کردن تعداد worker ها
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error testing proxies: {str(e)}"
        )


@router.get("/supported-types")
async def get_supported_proxy_types():
    """دریافت لیست انواع پروکسی‌های پشتیبانی شده"""
    return {
        "supported_types": [
            "shadowsocks",
            "trojan", 
            "vless",
            "vmess",
            "hysteria",
            "tuic"
        ],
        "schemes": [
            "ss", "shadowsocks",
            "trojan",
            "vless", 
            "vmess",
            "hysteria", "hysteria2", "hy2",
            "tuic"
        ]
    }
