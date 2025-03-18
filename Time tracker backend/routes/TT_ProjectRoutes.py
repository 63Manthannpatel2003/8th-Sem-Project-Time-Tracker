from typing import List
from fastapi import APIRouter , HTTPException
from config.TT_Db import timetracker_project_collection
from models.TT_Project import Project,ProjectOut
from controllers.TT_ProjectController import addProject,getProjects
from bson import ObjectId

router = APIRouter()
@router.post("/addProject")
async def add_project(project:Project):
    return await addProject(project)


@router.get("/projects")
async def get_projects():
    projects = await timetracker_project_collection.find().to_list(length=100)
    
    if not projects:
        raise HTTPException(status_code=404, detail="No projects found")
    
    return projects

