package models

import (
   "time" 
   "gorm.io/gorm"
)

type User struct {
    ID       uint           `gorm:"primaryKey"`
    Name     string         `gorm:"size:100;not null"`
    Email    string         `gorm:"uniqueIndex;size:100;not null"`
    Password string         `gorm:"size:255;not null"`
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt gorm.DeletedAt `gorm:"index"`
}
