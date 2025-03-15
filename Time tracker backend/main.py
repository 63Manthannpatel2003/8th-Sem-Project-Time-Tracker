# Import FastAPI and necessary modules
from fastapi import FastAPI, HTTPException
from routes.UserRoutes import router as user_router
from routes.TT_UserRoutes import router as tt_user_router
from routes.TT_ProjectRoutes import router as tt_project_router
from routes.TT_PtojectTeamRoutes import router as tt_project_team_router
from routes.TT_ProjectModuleRoutes import router as tt_project_module_router
from routes.TT_StatusRoutes import router as tt_status_router
from routes.TT_TaskRoutes import router as tt_task_router
from routes.TT_UserTask import router as tt_user_task_router
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing) for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Database Connection (MongoDB)
client = MongoClient("mongodb://localhost:27017")
db = client["time_tracker"]
tasks_collection = db["tasks"]
projects_collection = db["projects"]
users_collection = db["users"]
modules_collection = db["modules"]

# Include Routers
app.include_router(user_router)
app.include_router(tt_user_router)
app.include_router(tt_project_router)
app.include_router(tt_project_team_router)
app.include_router(tt_project_module_router)
app.include_router(tt_status_router)
app.include_router(tt_task_router)
app.include_router(tt_user_task_router)

# --------------------- Custom Endpoints ------------------------

@app.get("/")
def home():
    return {"message": "Time Tracker API is running!"}


# 📌 **Fetch Dropdown Options for Status, Projects, Modules, and Users**
@app.get("/dropdowns")
def get_dropdowns():
    statuses = ["work in progress", "work completed", "todo"]
    projects = list(projects_collection.find({}, {"_id": 1, "name": 1}))
    modules = list(modules_collection.find({}, {"_id": 1, "module_name": 1}))
    users = list(users_collection.find({}, {"_id": 1, "name": 1}))

    # Convert ObjectId to string
    for project in projects:
        project["_id"] = str(project["_id"])
    for module in modules:
        module["_id"] = str(module["_id"])
    for user in users:
        user["_id"] = str(user["_id"])

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
