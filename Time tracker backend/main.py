# Import FastAPI and necessary modules
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Database Connection (MongoDB)
MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client["time_tracker"]

# Collections
tasks_collection = db["tasks"]
projects_collection = db["projects"]
users_collection = db["users"]
modules_collection = db["modules"]

# --------------------- API Endpoints ------------------------

@app.get("/")
def home():
    return {"message": "Time Tracker API is running!"}

# 📌 **Fetch All Users**
@app.get("/users")
def get_users():
    users = list(users_collection.find({}, {"_id": 0}))  # Get all users
    return {"users": users}

# 📌 **Fetch Dropdown Options for Status, Projects, Modules, and Users**
@app.get("/dropdowns")
def get_dropdowns():
    statuses = ["work in progress", "work completed", "todo"]
    projects = list(projects_collection.find({}, {"_id": 1, "name": 1}))
    modules = list(modules_collection.find({}, {"_id": 1, "module_name": 1}))
    users = list(users_collection.find({}, {"_id": 1, "name": 1}))

    # Convert ObjectId to string
    for item in [projects, modules, users]:
        for obj in item:
            obj["_id"] = str(obj["_id"])

    return {"statuses": statuses, "projects": projects, "modules": modules, "users": users}

# 📌 **Start a Task (Independent for Each Task)**
@app.post("/tasks/{task_id}/start")
def start_task(task_id: str):
    result = tasks_collection.update_one(
        {"_id": ObjectId(task_id)}, 
        {"$set": {"start_time": datetime.utcnow(), "end_time": None}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task started", "task_id": task_id}

# 📌 **Stop a Task (Independent for Each Task)**
@app.post("/tasks/{task_id}/stop")
def stop_task(task_id: str):
    result = tasks_collection.update_one(
        {"_id": ObjectId(task_id)}, 
        {"$set": {"end_time": datetime.utcnow()}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task stopped", "task_id": task_id}
