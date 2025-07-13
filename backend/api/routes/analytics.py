from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from datetime import datetime, timedelta
from typing import List, Dict, Any
import json

from database import get_db
from models.contact import Contact

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/overview")
async def get_analytics_overview(
    time_range: str = "7d",
    db: Session = Depends(get_db)
):
    """Get analytics overview for the specified time range"""
    try:
        # Calculate date range
        end_date = datetime.now()
        if time_range == "7d":
            start_date = end_date - timedelta(days=7)
        elif time_range == "30d":
            start_date = end_date - timedelta(days=30)
        elif time_range == "90d":
            start_date = end_date - timedelta(days=90)
        else:
            start_date = end_date - timedelta(days=7)

        # Get contact submissions
        contacts = db.query(Contact).filter(
            Contact.created_at >= start_date,
            Contact.created_at <= end_date
        ).all()

        # Calculate metrics
        total_contacts = len(contacts)
        read_contacts = len([c for c in contacts if getattr(c, 'is_read', False)])
        unread_contacts = total_contacts - read_contacts
        
        # Calculate response rate (assuming emails were sent)
        response_rate = (read_contacts / total_contacts * 100) if total_contacts > 0 else 0

        # Get daily contact trends
        daily_contacts = db.query(
            func.date(Contact.created_at).label('date'),
            func.count(Contact.id).label('count')
        ).filter(
            Contact.created_at >= start_date,
            Contact.created_at <= end_date
        ).group_by(func.date(Contact.created_at)).order_by('date').all()

        # Get contact sources
        source_stats = db.query(
            Contact.source,
            func.count(Contact.id).label('count')
        ).filter(
            Contact.created_at >= start_date,
            Contact.created_at <= end_date
        ).group_by(Contact.source).all()

        return {
            "time_range": time_range,
            "period": {
                "start": start_date.isoformat(),
                "end": end_date.isoformat()
            },
            "metrics": {
                "total_contacts": total_contacts,
                "read_contacts": read_contacts,
                "unread_contacts": unread_contacts,
                "response_rate": round(response_rate, 1),
                "avg_daily_contacts": round(total_contacts / max(1, (end_date - start_date).days), 1)
            },
            "trends": {
                "daily_contacts": [
                    {"date": str(row.date), "count": row.count}
                    for row in daily_contacts
                ]
            },
            "sources": [
                {"source": row.source, "count": row.count}
                for row in source_stats
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching analytics: {str(e)}")

@router.get("/contacts")
async def get_contact_analytics(
    time_range: str = "7d",
    db: Session = Depends(get_db)
):
    """Get detailed contact analytics"""
    try:
        # Calculate date range
        end_date = datetime.now()
        if time_range == "7d":
            start_date = end_date - timedelta(days=7)
        elif time_range == "30d":
            start_date = end_date - timedelta(days=30)
        elif time_range == "90d":
            start_date = end_date - timedelta(days=90)
        else:
            start_date = end_date - timedelta(days=7)

        # Get recent contacts
        recent_contacts = db.query(Contact).filter(
            Contact.created_at >= start_date,
            Contact.created_at <= end_date
        ).order_by(desc(Contact.created_at)).limit(10).all()

        # Get contact by hour of day
        hourly_stats = db.query(
            func.extract('hour', Contact.created_at).label('hour'),
            func.count(Contact.id).label('count')
        ).filter(
            Contact.created_at >= start_date,
            Contact.created_at <= end_date
        ).group_by(func.extract('hour', Contact.created_at)).order_by('hour').all()

        return {
            "recent_contacts": [
                {
                    "id": contact.id,
                    "name": contact.name,
                    "email": contact.email,
                    "subject": contact.subject,
                    "created_at": contact.created_at.isoformat(),
                    "is_read": getattr(contact, 'is_read', False),
                    "source": contact.source
                }
                for contact in recent_contacts
            ],
            "hourly_distribution": [
                {"hour": int(row.hour), "count": row.count}
                for row in hourly_stats
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact analytics: {str(e)}")

@router.get("/performance")
async def get_performance_metrics():
    """Get performance metrics (simulated data for now)"""
    try:
        # Simulated performance data
        return {
            "page_load_times": {
                "home": 1.2,
                "projects": 1.8,
                "blog": 2.1,
                "contact": 1.5
            },
            "device_distribution": {
                "desktop": 45,
                "mobile": 40,
                "tablet": 15
            },
            "browser_distribution": {
                "chrome": 60,
                "safari": 25,
                "firefox": 10,
                "edge": 5
            },
            "geographic_data": [
                {"country": "United States", "visitors": 1200},
                {"country": "India", "visitors": 800},
                {"country": "United Kingdom", "visitors": 450},
                {"country": "Canada", "visitors": 300},
                {"country": "Germany", "visitors": 250}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching performance metrics: {str(e)}") 