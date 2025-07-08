from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Literal
from enum import Enum

class ProxyType(str, Enum):
    SHADOWSOCKS = "shadowsocks"
    TROJAN = "trojan"
    VLESS = "vless"
    VMESS = "vmess"
    HYSTERIA = "hysteria"
    TUIC = "tuic"

class ProxyTestRequest(BaseModel):
    """درخواست تست یک پروکسی"""
    link: str = Field(..., description="لینک پروکسی")
    timeout: Optional[int] = Field(12, description="زمان timeout به ثانیه")
    test_url: Optional[str] = Field("https://www.gstatic.com/generate_204", description="URL تست")

class ProxyBulkTestRequest(BaseModel):
    """درخواست تست چندین پروکسی"""
    links: List[str] = Field(..., description="لیست لینک‌های پروکسی")
    timeout: Optional[int] = Field(12, description="زمان timeout به ثانیه")
    test_url: Optional[str] = Field("https://www.gstatic.com/generate_204", description="URL تست")

class ProxyParseRequest(BaseModel):
    """درخواست parse کردن لینک پروکسی"""
    link: str = Field(..., description="لینک پروکسی")

class ProxyTestResult(BaseModel):
    """نتیجه تست یک پروکسی"""
    link: str
    is_working: bool
    response_time: Optional[float] = None
    error: Optional[str] = None
    parsed_config: Optional[Dict[str, Any]] = None

class ProxyBulkTestResult(BaseModel):
    """نتیجه تست چندین پروکسی"""
    total: int
    working: int
    failed: int
    results: List[ProxyTestResult]

class ProxyParseResult(BaseModel):
    """نتیجه parse کردن پروکسی"""
    link: str
    is_valid: bool
    proxy_type: Optional[ProxyType] = None
    config: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

class ServiceStatus(BaseModel):
    """وضعیت سرویس"""
    status: Literal["ok", "error"]
    message: str
    sing_box_available: bool
    version: Optional[str] = None
