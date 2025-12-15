"""
Task Board Backend API
A clean, modern FastAPI backend for task management with JSON persistence.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import os
from datetime import datetime
from uuid import uuid4

app = FastAPI(title="Task Board API", version="1.0.0")

# Get CORS origins from environment variable
cors_origins = os.getenv("CORS_ORIGINS", "*").split(",")

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins if cors_origins[0] != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data file path
DATA_FILE = "tasks.json"


class Task(BaseModel):
    """Task model with validation"""
    id: Optional[str] = None
    title: str
    completed: bool = False
    created_at: Optional[str] = None
    completed_at: Optional[str] = None


class TaskUpdate(BaseModel):
    """Model for updating task completion status"""
    completed: bool


class Stats(BaseModel):
    """Task statistics model"""
    total: int
    completed: int
    pending: int
    completion_rate: float
    current_streak: int


def load_tasks() -> List[dict]:
    """Load tasks from JSON file"""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            return []
    return []


def save_tasks(tasks: List[dict]):
    """Save tasks to JSON file"""
    with open(DATA_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)


def calculate_streak(tasks: List[dict]) -> int:
    """Calculate current completion streak (consecutive completed tasks)"""
    streak = 0
    for task in reversed(tasks):
        if task.get('completed'):
            streak += 1
        else:
            break
    return streak


@app.get("/")
def read_root():
    """API health check"""
    return {"status": "healthy", "message": "Task Board API is running"}


@app.post("/api/tasks", response_model=Task, status_code=201)
def create_task(task: Task):
    """Create a new task"""
    tasks = load_tasks()

    new_task = {
        "id": str(uuid4()),
        "title": task.title.strip(),
        "completed": False,
        "created_at": datetime.now().isoformat(),
        "completed_at": None
    }

    tasks.append(new_task)
    save_tasks(tasks)

    return new_task


@app.get("/api/tasks", response_model=List[Task])
def get_tasks():
    """Retrieve all tasks"""
    tasks = load_tasks()
    return tasks


@app.get("/api/tasks/stats", response_model=Stats)
def get_stats():
    """Get task statistics including streak"""
    tasks = load_tasks()
    total = len(tasks)
    completed = sum(1 for task in tasks if task.get('completed'))
    pending = total - completed
    completion_rate = (completed / total * 100) if total > 0 else 0
    current_streak = calculate_streak(tasks)

    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "completion_rate": round(completion_rate, 1),
        "current_streak": current_streak
    }


@app.patch("/api/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, task_update: TaskUpdate):
    """Update task completion status"""
    tasks = load_tasks()

    for task in tasks:
        if task['id'] == task_id:
            task['completed'] = task_update.completed
            task['completed_at'] = datetime.now(
            ).isoformat() if task_update.completed else None
            save_tasks(tasks)
            return task

    raise HTTPException(status_code=404, detail="Task not found")


@app.delete("/api/tasks/{task_id}", status_code=204)
def delete_task(task_id: str):
    """Delete a task"""
    tasks = load_tasks()
    initial_length = len(tasks)

    tasks = [task for task in tasks if task['id'] != task_id]

    if len(tasks) == initial_length:
        raise HTTPException(status_code=404, detail="Task not found")

    save_tasks(tasks)
    return None


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
