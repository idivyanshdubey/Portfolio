from fastapi import APIRouter, HTTPException, Query
from typing import Optional
import httpx
import logging
from config import settings

router = APIRouter(tags=["verification"])
logger = logging.getLogger(__name__)

@router.get("/phone")
async def validate_phone(
    phone: str = Query(..., description="Phone number to validate"),
    country_code: Optional[str] = Query(None, description="Country code (e.g., 'US', 'IN')")
):
    """
    Validate phone number using Veriphone API
    
    - **phone**: Phone number to validate (with or without country code)
    - **country_code**: Optional country code for better validation
    
    Returns validation results including:
    - Validity status
    - Phone type (mobile, landline, etc.)
    - Carrier information
    - Location details
    """
    try:
        # Veriphone API endpoint
        url = "https://api.veriphone.io/v3/verify"
        
        # Prepare request parameters
        params = {
            "phone": phone,
            "key": settings.veriphone_api_key
        }
        
        if country_code:
            params["country_code"] = country_code.upper()
            
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            
        data = response.json()
        
        # Log data for debugging
        print('Parsed Veriphone response:', data)
        
        # Check if API returned an error
        if not data.get("status"):
            raise HTTPException(
                status_code=400,
                detail=data.get("message", "Phone validation failed")
            )
            
        return {
            "valid": data.get("phone_valid", False),
            "phone": data.get("phone"),
            "country": data.get("country"),
            "country_code": data.get("country_code"),
            "phone_type": data.get("phone_type"),
            "carrier": data.get("carrier"),
            "format": {
                "international": data.get("phone_international"),
                "local": data.get("phone_local"),
                "e164": data.get("phone_e164")
            },
            "location": data.get("location")
        }
        
    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error from Veriphone API: {e}")
        raise HTTPException(
            status_code=e.response.status_code,
            detail="External phone validation service error"
        )
    except httpx.RequestError as e:
        logger.error(f"Request error: {e}")
        raise HTTPException(
            status_code=503,
            detail="Phone validation service unavailable"
        )
    except Exception as e:
        logger.error(f"Unexpected error in phone validation: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error"
        )

@router.get("/phone/format")
async def format_phone(
    phone: str = Query(..., description="Phone number to format"),
    country_code: Optional[str] = Query(None, description="Country code")
):
    """
    Format phone number to standard formats (E164, international, local)
    
    Returns formatted phone numbers in different standard formats
    """
    try:
        url = "https://api.veriphone.io/v3/verify"
        
        params = {
            "phone": phone,
            "key": settings.veriphone_api_key
        }
        
        if country_code:
            params["country_code"] = country_code.upper()
            
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            
        data = response.json()
        
        if not data.get("status"):
            raise HTTPException(
                status_code=400,
                detail=data.get("message", "Phone formatting failed")
            )
            
        return {
            "original": phone,
            "formatted": {
                "e164": data.get("phone_e164"),
                "international": data.get("phone_international"),
                "local": data.get("phone_local")
            },
            "country": data.get("country"),
            "country_code": data.get("country_code")
        }
        
    except Exception as e:
        logger.error(f"Error formatting phone: {e}")
        raise HTTPException(
            status_code=500,
            detail="Phone formatting error"
        )
