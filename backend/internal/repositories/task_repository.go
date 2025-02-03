package repositories

import (
    "fmt"
    "aiagent/backend/internal/models"
    "gorm.io/gorm"
)

type TaskRepository struct {
    db *gorm.DB
}

func NewTaskRepository(db *gorm.DB) *TaskRepository {
    return &TaskRepository{db: db}
}

func (r *TaskRepository) CreateTask(task *models.Task) error {
    return r.db.Create(task).Error
}

func (r *TaskRepository) GetTaskByID(id uint) (*models.Task, error) {
    var task models.Task
    err := r.db.First(&task, id).Error
    if err != nil {
        return nil, err
    }
    return &task, nil
}

func (r *TaskRepository) UpdateTask(task *models.Task) error {
    return r.db.Save(task).Error
}

func (r *TaskRepository) DeleteTask(id uint) error {
    return r.db.Delete(&models.Task{}, id).Error
}

func (r *TaskRepository) GetTasksByFolderID(folderID uint) ([]models.Task, error) {
    var tasks []models.Task
    err := r.db.Where("folder_id = ?", folderID).Find(&tasks).Error
    return tasks, err
}

func (r *TaskRepository) CreateFolder(folder *models.Folder) error {
    return r.db.Create(folder).Error
}

func (r *TaskRepository) GetFolderByID(id uint) (*models.Folder, error) {
    var folder models.Folder
    err := r.db.Preload("Tasks").First(&folder, id).Error
    if err != nil {
        return nil, err
    }
    return &folder, nil
}

func (r *TaskRepository) UpdateFolder(folder *models.Folder) error {
    return r.db.Save(folder).Error
}

func (r *TaskRepository) DeleteFolder(id uint) error {
    return r.db.Transaction(func(tx *gorm.DB) error {
        if err := tx.Where("folder_id = ?", id).Delete(&models.Task{}).Error; err != nil {
            return err
        }
        return tx.Delete(&models.Folder{}, id).Error
    })
}

func (r *TaskRepository) ListFolders() ([]models.Folder, error) {
    var folders []models.Folder
    err := r.db.Preload("Tasks").Find(&folders).Error
    return folders, err
}

func (r *TaskRepository) ListUnassignedTasks() ([]models.Task, error) {
    var tasks []models.Task
    r.db = r.db.Debug()
    err := r.db.Where("folder_id IS NULL").Find(&tasks).Error
    return tasks, err
}

func (r *TaskRepository) UpdateTaskConnections(taskID uint, connections []string) error {
    return r.db.Model(&models.Task{}).
        Where("id = ?", taskID).
        Update("connections", connections).
        Error
}

func (r *TaskRepository) SearchTasks(query string) ([]models.Task, error) {
    var tasks []models.Task
    err := r.db.Where(
        "title ILIKE ? OR details ILIKE ?", 
        "%"+query+"%", 
        "%"+query+"%",
    ).Find(&tasks).Error
    return tasks, err
}

func (r *TaskRepository) BulkCreateTasks(tasks []models.Task) error {
    return r.db.Create(&tasks).Error
}

func (r *TaskRepository) BulkUpdateTasks(tasks []models.Task) error {
    return r.db.Transaction(func(tx *gorm.DB) error {
        for _, task := range tasks {
            if err := tx.Save(&task).Error; err != nil {
                return err
            }
        }
        return nil
    })
}

func (r *TaskRepository) DuplicateFolder(folderID uint) error {
    return r.db.Transaction(func(tx *gorm.DB) error {
        var originalFolder models.Folder
        if err := tx.Preload("Tasks").First(&originalFolder, folderID).Error; err != nil {
            return err
        }
        newFolder := models.Folder{
            Name: originalFolder.Name + " (Copy)",
        }
        if err := tx.Create(&newFolder).Error; err != nil {
            return err
        }
        for _, task := range originalFolder.Tasks {
            newTask := task
            newTask.ID = 0 
            newFolderID := newFolder.ID 
            newTask.FolderID = &newFolderID 
            if err := tx.Create(&newTask).Error; err != nil {
                return err
            }
        }

        return nil
    })
}

func (r *TaskRepository) MoveTaskToFolder(taskID, folderID uint) error {
    return r.db.Model(&models.Task{}).
        Where("id = ?", taskID).
        Update("folder_id", folderID).
        Error
}

func (r *TaskRepository) ValidateConnections(taskID uint, connections []string) error {
    var count int64
    err := r.db.Model(&models.Task{}).
        Where("id IN ?", connections).
        Count(&count).Error
    if err != nil {
        return err
    }
    if int(count) != len(connections) {
        return fmt.Errorf("invalid connections: some tasks do not exist")
    }
    return nil
}

func (r *TaskRepository) BatchUpdateTasksInFolder(folderID uint, updates map[string]interface{}) error {
    return r.db.Model(&models.Task{}).
        Where("folder_id = ?", folderID).
        Updates(updates).Error
}

func (r *TaskRepository) GetTasksByType(taskType string, limit, offset int) ([]models.Task, error) {
    var tasks []models.Task
    err := r.db.Where("type = ?", taskType).
        Limit(limit).
        Offset(offset).
        Find(&tasks).Error
    return tasks, err
}

func (r *TaskRepository) GetRecentlyModifiedTasks(limit int) ([]models.Task, error) {
    var tasks []models.Task
    err := r.db.Order("updated_at DESC").
        Limit(limit).
        Find(&tasks).Error
    return tasks, err
}

func (r *TaskRepository) ReorderTasks(folderID uint, taskIDs []uint) error {
    return r.db.Transaction(func(tx *gorm.DB) error {
        for i, taskID := range taskIDs {
            if err := tx.Model(&models.Task{}).
                Where("id = ? AND folder_id = ?", taskID, folderID).
                Update("position", i).Error; err != nil {
                return err
            }
        }
        return nil
    })
}

func (r *TaskRepository) CleanupOrphanedTasks() error {
    return r.db.Where("folder_id NOT IN (?)", 
        r.db.Model(&models.Folder{}).Select("id"),
    ).Delete(&models.Task{}).Error
}

func (r *TaskRepository) PermanentlyDeleteTask(taskID uint) error {
    return r.db.Unscoped().Delete(&models.Task{}, taskID).Error
}
