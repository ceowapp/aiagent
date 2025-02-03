package models

import (
   "database/sql/driver" 
   "encoding/json"       
   "time"                
   "gorm.io/gorm"        
)

type Position struct {
    X float64 `json:"x"`
    Y float64 `json:"y"`
}

type Task struct {
    ID          uint           `gorm:"primaryKey" json:"id"`
    Icon        string         `gorm:"size:50" json:"icon"`
    Type        string         `gorm:"size:50;not null" json:"type"`
    Title       string         `gorm:"size:100;not null" json:"title"`
    Category    string         `gorm:"size:50" json:"category,omitempty"`
    Details     string         `gorm:"type:text" json:"details"`
    Config      JSON           `gorm:"type:jsonb" json:"config"` 
    Position    Position       `gorm:"embedded" json:"position"`
    Connections []string       `gorm:"type:text[]" json:"connections"`
    FolderID    *uint         `json:"folderId,omitempty"`
    Folder      *Folder       `gorm:"foreignKey:FolderID" json:"-"`
    CreatedAt   time.Time     `json:"createdAt"`
    UpdatedAt   time.Time     `json:"updatedAt"`
    DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
}

type Folder struct {
    ID        uint           `gorm:"primaryKey" json:"id"`
    Name      string         `gorm:"size:100;not null" json:"name"`
    Tasks     []Task         `gorm:"foreignKey:FolderID" json:"tasks"`
    CreatedAt time.Time      `json:"createdAt"`
    UpdatedAt time.Time      `json:"updatedAt"`
    DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type JSON map[string]interface{}

func (j *JSON) Scan(value interface{}) error {
    bytes, ok := value.([]byte)
    if !ok {
        return nil
    }

    var data map[string]interface{}
    if err := json.Unmarshal(bytes, &data); err != nil {
        return err
    }
    *j = JSON(data)
    return nil
}

func (j JSON) Value() (driver.Value, error) {
    if j == nil {
        return nil, nil
    }
    return json.Marshal(j)
}