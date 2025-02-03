package handlers

import (
    "net/http"
    "strconv"
    "aiagent/backend/internal/models"
    "aiagent/backend/internal/repositories"
    "github.com/gin-gonic/gin"
)

type TaskHandler struct {
    taskRepo *repositories.TaskRepository
}

func NewTaskHandler(taskRepo *repositories.TaskRepository) *TaskHandler {
    return &TaskHandler{taskRepo: taskRepo}
}

func (h *TaskHandler) RegisterRoutes(r *gin.Engine) {
    api := r.Group("/api")
    {
        api.GET("/folders", h.ListFolders)
        api.GET("/folders/:id", h.GetFolder)
        api.POST("/folders", h.CreateFolder)
        api.PUT("/folders/:id", h.UpdateFolder)
        api.DELETE("/folders/:id", h.DeleteFolder)

        api.GET("/tasks", h.ListTasks)
        api.POST("/tasks", h.CreateTask)
        api.PUT("/tasks/:id", h.UpdateTask)
        api.DELETE("/tasks/:id", h.DeleteTask)
        api.PUT("/tasks/:id/connections", h.UpdateTaskConnections)

        api.POST("/folders/:id/duplicate", h.DuplicateFolder)
        api.PUT("/tasks/:id/move", h.MoveTask)
    }
}

func (h *TaskHandler) ListFolders(c *gin.Context) {
    folders, err := h.taskRepo.ListFolders()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, folders)
}

func (h *TaskHandler) ListTasks(c *gin.Context) {
    tasks, err := h.taskRepo.ListUnassignedTasks()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, tasks)
}

func (h *TaskHandler) GetFolder(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    folder, err := h.taskRepo.GetFolderByID(uint(id))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Folder not found"})
        return
    }

    c.JSON(http.StatusOK, folder)
}

func (h *TaskHandler) CreateFolder(c *gin.Context) {
    var folder models.Folder
    if err := c.ShouldBindJSON(&folder); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := h.taskRepo.CreateFolder(&folder); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, folder)
}

func (h *TaskHandler) UpdateFolder(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var updates models.Folder
    if err := c.ShouldBindJSON(&updates); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    folder, err := h.taskRepo.GetFolderByID(uint(id))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Folder not found"})
        return
    }

    folder.Name = updates.Name
    if err := h.taskRepo.UpdateFolder(folder); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, folder)
}

func (h *TaskHandler) DeleteFolder(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    if err := h.taskRepo.DeleteFolder(uint(id)); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Folder deleted successfully"})
}

func (h *TaskHandler) CreateTask(c *gin.Context) {
    var task models.Task
    if err := c.ShouldBindJSON(&task); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := h.taskRepo.CreateTask(&task); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, task)
}

func (h *TaskHandler) UpdateTask(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var updates models.Task
    if err := c.ShouldBindJSON(&updates); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    task, err := h.taskRepo.GetTaskByID(uint(id))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
        return
    }

    task.Title = updates.Title
    task.Details = updates.Details
    task.Config = updates.Config
    task.Icon = updates.Icon
    task.Type = updates.Type
    task.Category = updates.Category
    task.FolderID = updates.FolderID

    if err := h.taskRepo.UpdateTask(task); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, task)
}

func (h *TaskHandler) DeleteTask(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
      c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
      return
    }

    if err := h.taskRepo.DeleteTask(uint(id)); err != nil {
      c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
       return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Task deleted successfully"})
}

func (h *TaskHandler) UpdateTaskConnections(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var request struct {
        Connections []string `json:"connections"`
    }
    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := h.taskRepo.ValidateConnections(uint(id), request.Connections); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := h.taskRepo.UpdateTaskConnections(uint(id), request.Connections); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    task, err := h.taskRepo.GetTaskByID(uint(id))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, task)
}

func (h *TaskHandler) DuplicateFolder(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    if err := h.taskRepo.DuplicateFolder(uint(id)); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Folder duplicated successfully"})
}

func (h *TaskHandler) MoveTask(c *gin.Context) {
    taskID, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
        return
    }

    var request struct {
        FolderID uint `json:"folderId"`
    }
    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := h.taskRepo.MoveTaskToFolder(uint(taskID), request.FolderID); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Task moved successfully"})
}

