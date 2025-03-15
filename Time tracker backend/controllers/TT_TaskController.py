from models.TT_TaskModel import Task,TaskOut
from bson import ObjectId
from config.TT_Db import timetracker_task_collection,timetracker_projet_module_collection,timetracker_projet_collection,timetracker_status_collection
from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
from bson.errors import InvalidId

# async def addTask(task:Task):
#     savedTask=await timetracker_task_collection.insert_one(task.dict())
#     return JSONResponse(content={"message":"Task added successfully"})
async def addTask(task: Task):
    saved_task = await timetracker_task_collection.insert_one(task.dict())
    if not saved_task.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to add task")
    return JSONResponse(content={"message": "Task added successfully", "task_id": str(saved_task.inserted_id)})

# async def getTask():
#     tasks = await timetracker_task_collection.find().to_list(length=None)
#     for task in tasks:

#         # Fetch module details
#         if "moduleId" in task:
#             module_data = await timetracker_projet_module_collection.find_one({"_id": ObjectId(task["moduleId"])})
#             if module_data:
#                 module_data["_id"] = str(module_data["_id"])
#                 task["module_id"] = module_data
#             else:
#                 task["module_id"] = None

#         # Fetch project details
#         if "projectId" in task:
#             project_data = await timetracker_projet_collection.find_one({"_id": ObjectId(task["projectId"])})
#             if project_data:
#                 project_data["_id"] = str(project_data["_id"])
#                 task["project_id"] = project_data
#             else:
#                 task["project_id"] = None

#         # Fetch status details
#         if "statusId" in task:
#             status_data = await timetracker_status_collection.find_one({"_id": ObjectId(task["statusId"])})
#             if status_data:
#                 status_data["_id"] = str(status_data["_id"])
#                 task["status_id"] = status_data
#             else:
#                 task["status_id"] = None

#     return [TaskOut(**task) for task in tasks]
async def getTask():
    tasks = await timetracker_task_collection.find().to_list(length=None)

    for task in tasks:
        try:
            if "moduleId" in task:
                module_data = await timetracker_projet_module_collection.find_one({"_id": ObjectId(task["moduleId"])})
                task["module_id"] = module_data if module_data else None

            if "projectId" in task:
                project_data = await timetracker_projet_collection.find_one({"_id": ObjectId(task["projectId"])})
                task["project_id"] = project_data if project_data else None

            if "statusId" in task:
                status_data = await timetracker_status_collection.find_one({"_id": ObjectId(task["statusId"])})
                task["status_id"] = status_data if status_data else None

        except (InvalidId, KeyError):
            continue

    return [TaskOut(**task) for task in tasks]
