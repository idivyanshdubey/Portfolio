from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timedelta
import json

router = APIRouter()

# Pydantic models
class AnalyticsEvent(BaseModel):
    event_type: str  # "page_view", "demo_used", "project_viewed", "blog_read"
    page: str
    user_agent: Optional[str] = None
    timestamp: datetime = datetime.now()

class AnalyticsResponse(BaseModel):
    total_visits: int
    unique_visitors: int
    popular_pages: List[dict]
    demo_usage: dict
    recent_activity: List[dict]

# Sample analytics data (in a real app, this would come from a database)
analytics_data = {
    "events": [
        {"event_type": "page_view", "page": "/", "timestamp": datetime.now() - timedelta(hours=1)},
        {"event_type": "page_view", "page": "/projects", "timestamp": datetime.now() - timedelta(hours=2)},
        {"event_type": "demo_used", "page": "/demos/sentiment-analysis", "timestamp": datetime.now() - timedelta(hours=3)},
        {"event_type": "project_viewed", "page": "/projects/1", "timestamp": datetime.now() - timedelta(hours=4)},
        {"event_type": "blog_read", "page": "/blog/getting-started-machine-learning-python", "timestamp": datetime.now() - timedelta(hours=5)},
    ],
    "visitors": {
        "total": 1250,
        "unique": 890,
        "this_month": 156
    }
}

@router.post("/track")
async def track_event(event: AnalyticsEvent):
    """Track user interaction events"""
    try:
        # In a real app, you'd save this to a database
        analytics_data["events"].append(event.dict())
        return {"status": "success", "message": "Event tracked successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error tracking event: {str(e)}")

@router.get("/dashboard", response_model=AnalyticsResponse)
async def get_analytics_dashboard():
    """Get analytics dashboard data"""
    try:
        # Calculate popular pages
        page_views = {}
        for event in analytics_data["events"]:
            if event["event_type"] == "page_view":
                page = event["page"]
                page_views[page] = page_views.get(page, 0) + 1
        
        popular_pages = [
            {"page": page, "views": count}
            for page, count in sorted(page_views.items(), key=lambda x: x[1], reverse=True)[:5]
        ]
        
        # Calculate demo usage
        demo_usage = {}
        for event in analytics_data["events"]:
            if event["event_type"] == "demo_used":
                demo = event["page"].split("/")[-1]
                demo_usage[demo] = demo_usage.get(demo, 0) + 1
        
        # Get recent activity
        recent_activity = analytics_data["events"][-10:]  # Last 10 events
        
        return AnalyticsResponse(
            total_visits=analytics_data["visitors"]["total"],
            unique_visitors=analytics_data["visitors"]["unique"],
            popular_pages=popular_pages,
            demo_usage=demo_usage,
            recent_activity=recent_activity
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting analytics: {str(e)}")

@router.get("/stats/summary")
async def get_stats_summary():
    """Get summary statistics"""
    try:
        total_events = len(analytics_data["events"])
        demo_events = len([e for e in analytics_data["events"] if e["event_type"] == "demo_used"])
        project_views = len([e for e in analytics_data["events"] if e["event_type"] == "project_viewed"])
        blog_reads = len([e for e in analytics_data["events"] if e["event_type"] == "blog_read"])
        
        return {
            "total_events": total_events,
            "demo_usage": demo_events,
            "project_views": project_views,
            "blog_reads": blog_reads,
            "engagement_rate": round((demo_events + project_views + blog_reads) / total_events * 100, 2) if total_events > 0 else 0
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting stats: {str(e)}")

@router.get("/trends")
async def get_trends(days: int = 7):
    """Get trends over the last N days"""
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days)
        
        # Filter events within the date range
        recent_events = [
            event for event in analytics_data["events"]
            if start_date <= event["timestamp"] <= end_date
        ]
        
        # Group by day
        daily_stats = {}
        for event in recent_events:
            date_key = event["timestamp"].strftime("%Y-%m-%d")
            if date_key not in daily_stats:
                daily_stats[date_key] = {"page_views": 0, "demos": 0, "projects": 0}
            
            if event["event_type"] == "page_view":
                daily_stats[date_key]["page_views"] += 1
            elif event["event_type"] == "demo_used":
                daily_stats[date_key]["demos"] += 1
            elif event["event_type"] == "project_viewed":
                daily_stats[date_key]["projects"] += 1
        
        return {
            "period": f"Last {days} days",
            "daily_stats": daily_stats,
            "total_events": len(recent_events)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting trends: {str(e)}") 