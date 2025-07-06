from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Pydantic models
class BlogPostBase(BaseModel):
    title: str
    content: str
    excerpt: str
    tags: List[str]
    author: str
    featured_image: Optional[str] = None

class BlogPostCreate(BlogPostBase):
    pass

class BlogPost(BlogPostBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime
    read_time: int  # in minutes

    class Config:
        from_attributes = True

# Sample blog posts
sample_posts = [
    {
        "id": 1,
        "title": "Getting Started with Machine Learning in Python",
        "content": "Machine learning is transforming the way we approach data analysis...",
        "excerpt": "A comprehensive guide to starting your machine learning journey with Python, covering essential libraries and basic concepts.",
        "tags": ["machine-learning", "python", "tutorial", "beginners"],
        "author": "Your Name",
        "featured_image": "/images/ml-python.jpg",
        "slug": "getting-started-machine-learning-python",
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "read_time": 8
    },
    {
        "id": 2,
        "title": "Building Interactive Data Visualizations with Plotly",
        "content": "Data visualization is crucial for understanding complex datasets...",
        "excerpt": "Learn how to create stunning, interactive visualizations using Plotly and Python for better data storytelling.",
        "tags": ["data-visualization", "plotly", "python", "interactive"],
        "author": "Your Name",
        "featured_image": "/images/plotly-viz.jpg",
        "slug": "interactive-data-visualizations-plotly",
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "read_time": 12
    },
    {
        "id": 3,
        "title": "Natural Language Processing: From Theory to Practice",
        "content": "NLP is one of the most exciting fields in AI today...",
        "excerpt": "Explore the fundamentals of Natural Language Processing and implement practical solutions using Python libraries.",
        "tags": ["nlp", "python", "text-analysis", "ai"],
        "author": "Your Name",
        "featured_image": "/images/nlp-practice.jpg",
        "slug": "natural-language-processing-theory-practice",
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "read_time": 15
    }
]

@router.get("/", response_model=List[BlogPost])
async def get_blog_posts(tag: Optional[str] = None, limit: Optional[int] = None):
    """Get all blog posts, optionally filtered by tag and limited in number"""
    posts = sample_posts
    
    if tag:
        posts = [post for post in posts if tag in post["tags"]]
    
    if limit:
        posts = posts[:limit]
    
    return posts

@router.get("/{post_slug}", response_model=BlogPost)
async def get_blog_post(post_slug: str):
    """Get a specific blog post by slug"""
    for post in sample_posts:
        if post["slug"] == post_slug:
            return post
    raise HTTPException(status_code=404, detail="Blog post not found")

@router.get("/tags/list")
async def get_blog_tags():
    """Get all available blog tags"""
    all_tags = set()
    for post in sample_posts:
        all_tags.update(post["tags"])
    return {"tags": list(all_tags)}

@router.post("/", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate):
    """Create a new blog post"""
    # Generate slug from title
    slug = post.title.lower().replace(" ", "-").replace(":", "").replace(",", "")
    
    new_post = {
        "id": len(sample_posts) + 1,
        **post.dict(),
        "slug": slug,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
        "read_time": len(post.content.split()) // 200  # Rough estimate: 200 words per minute
    }
    sample_posts.append(new_post)
    return new_post 