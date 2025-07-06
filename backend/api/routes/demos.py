from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List, Optional
from pydantic import BaseModel
import json
import io
import base64
from datetime import datetime

# Try to import optional dependencies
try:
    from PIL import Image
    import numpy as np
    import pandas as pd
    import plotly.express as px
    HAS_ADVANCED_DEPS = True
except ImportError:
    HAS_ADVANCED_DEPS = False
    print("Warning: Some advanced features disabled due to missing dependencies")

# Try to import TextBlob separately to handle its specific issues
try:
    from textblob import TextBlob
    HAS_TEXTBLOB = True
except ImportError:
    HAS_TEXTBLOB = False
    print("Warning: TextBlob not available, using simple sentiment analysis")

router = APIRouter()

# Pydantic models
class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    text: str
    sentiment: str
    polarity: float
    subjectivity: float
    confidence: float

class DataVisualizationRequest(BaseModel):
    chart_type: str  # "bar", "line", "scatter", "histogram", "heatmap"
    data: dict
    title: Optional[str] = None
    x_label: Optional[str] = None
    y_label: Optional[str] = None

class DemoInfo(BaseModel):
    id: str
    name: str
    description: str
    category: str
    is_active: bool

# Sample demo information
available_demos = [
    {
        "id": "sentiment-analysis",
        "name": "Sentiment Analysis",
        "description": "Analyze the sentiment of any text using Natural Language Processing",
        "category": "nlp",
        "is_active": True
    },
    {
        "id": "data-visualization",
        "name": "Data Visualization",
        "description": "Create interactive charts and graphs from your data",
        "category": "data-analysis",
        "is_active": True
    },
    {
        "id": "image-classification",
        "name": "Image Classification",
        "description": "Classify images using pre-trained machine learning models",
        "category": "computer-vision",
        "is_active": True
    }
]

@router.get("/", response_model=List[DemoInfo])
async def get_available_demos():
    """Get list of available AI demos"""
    return available_demos

def simple_sentiment_analysis(text: str) -> tuple[float, float]:
    """Simple sentiment analysis without external dependencies"""
    positive_words = ["good", "great", "excellent", "amazing", "wonderful", "love", "like", "happy", "nice", "best", "awesome", "fantastic"]
    negative_words = ["bad", "terrible", "awful", "hate", "dislike", "horrible", "worst", "sad", "angry", "disappointing", "terrible", "awful"]
    
    text_lower = text.lower()
    positive_count = sum(1 for word in positive_words if word in text_lower)
    negative_count = sum(1 for word in negative_words if word in text_lower)
    
    if positive_count > negative_count:
        polarity = min(0.8, positive_count * 0.2)
        subjectivity = 0.3
    elif negative_count > positive_count:
        polarity = max(-0.8, -negative_count * 0.2)
        subjectivity = 0.3
    else:
        polarity = 0.0
        subjectivity = 0.1
    
    return polarity, subjectivity

@router.post("/sentiment-analysis", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    """Analyze sentiment of input text"""
    try:
        if HAS_TEXTBLOB and HAS_ADVANCED_DEPS:
            # Use TextBlob for sentiment analysis
            try:
                blob = TextBlob(request.text)
                # Access sentiment attributes safely
                polarity = getattr(blob.sentiment, 'polarity', 0.0)
                subjectivity = getattr(blob.sentiment, 'subjectivity', 0.1)
            except Exception:
                # Fallback if TextBlob fails
                polarity, subjectivity = simple_sentiment_analysis(request.text)
        else:
            # Simple sentiment analysis without TextBlob
            polarity, subjectivity = simple_sentiment_analysis(request.text)
        
        # Determine sentiment category
        if polarity > 0.1:
            sentiment = "Positive"
        elif polarity < -0.1:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"
        
        # Calculate confidence based on subjectivity
        confidence = abs(polarity) * (1 - subjectivity)
        
        return SentimentResponse(
            text=request.text,
            sentiment=sentiment,
            polarity=round(polarity, 3),
            subjectivity=round(subjectivity, 3),
            confidence=round(confidence, 3)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing sentiment: {str(e)}")

@router.post("/data-visualization")
async def create_visualization(request: DataVisualizationRequest):
    """Create data visualizations"""
    try:
        if not HAS_ADVANCED_DEPS:
            # Simple data visualization without plotly
            return {
                "chart_data": {
                    "type": request.chart_type,
                    "data": request.data,
                    "title": request.title or "Data Visualization",
                    "message": "Advanced visualization requires plotly and pandas"
                }
            }
        
        # Convert data to pandas DataFrame
        df = pd.DataFrame(request.data)
        
        # Create visualization based on chart type
        try:
            if request.chart_type == "bar":
                fig = px.bar(df, title=request.title)
            elif request.chart_type == "line":
                fig = px.line(df, title=request.title)
            elif request.chart_type == "scatter":
                fig = px.scatter(df, title=request.title)
            elif request.chart_type == "histogram":
                fig = px.histogram(df, title=request.title)
            elif request.chart_type == "heatmap":
                fig = px.imshow(df.corr(), title=request.title)
            else:
                raise HTTPException(status_code=400, detail="Unsupported chart type")
            
            # Convert to JSON for frontend
            chart_json = fig.to_json()
            if chart_json:
                return {"chart_data": json.loads(chart_json)}
            else:
                return {"chart_data": {"error": "Failed to generate chart"}}
                
        except Exception as viz_error:
            return {"chart_data": {"error": f"Visualization error: {str(viz_error)}"}}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating visualization: {str(e)}")

@router.post("/image-classification")
async def classify_image(file: UploadFile = File(...)):
    """Classify uploaded image"""
    try:
        # Read and validate image
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        if not HAS_ADVANCED_DEPS:
            # Simple file analysis without PIL
            image_data = await file.read()
            return {
                "filename": file.filename,
                "file_size_kb": len(image_data) / 1024,
                "content_type": file.content_type,
                "message": "Advanced image analysis requires PIL and numpy"
            }
        
        # Read image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Simple image analysis
        width, height = image.size
        mode = image.mode
        
        # Simple classification based on image properties
        if width > height:
            orientation = "Landscape"
        elif height > width:
            orientation = "Portrait"
        else:
            orientation = "Square"
        
        # Analyze dominant colors (simplified)
        if mode == "RGB":
            # Convert to numpy array for analysis
            img_array = np.array(image)
            avg_color = img_array.mean(axis=(0, 1))
            
            # Simple color classification
            if avg_color[0] > avg_color[1] and avg_color[0] > avg_color[2]:
                dominant_color = "Red"
            elif avg_color[1] > avg_color[0] and avg_color[1] > avg_color[2]:
                dominant_color = "Green"
            else:
                dominant_color = "Blue"
        else:
            dominant_color = "Grayscale"
        
        return {
            "filename": file.filename,
            "size": f"{width}x{height}",
            "mode": mode,
            "orientation": orientation,
            "dominant_color": dominant_color,
            "file_size_kb": len(image_data) / 1024
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@router.get("/sample-data")
async def get_sample_data():
    """Get sample data for visualization demos"""
    sample_data = {
        "sales_data": {
            "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            "sales": [12000, 15000, 18000, 14000, 22000, 25000],
            "expenses": [8000, 9000, 11000, 8500, 13000, 15000]
        },
        "user_data": {
            "age": [25, 30, 35, 40, 45, 50, 55, 60],
            "salary": [45000, 55000, 65000, 75000, 85000, 95000, 105000, 115000]
        }
    }
    return sample_data 