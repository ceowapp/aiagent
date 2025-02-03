package database

import (
    "log"
    "os"
    "aiagent/backend/config"
    "aiagent/backend/internal/models"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() *gorm.DB {
    dsn := os.Getenv("DATABASE_URL")
    if dsn == "" {
        cfg := config.LoadConfig().Database
        dsn = cfg.URL
        if dsn == "" {
            log.Fatal("Database URL not found in environment or config")
        }
    }

    log.Println("Connecting to database...")
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatalf("Failed to connect to database: %v", err)
    }

    log.Println("Running database migrations...")
    if err := db.AutoMigrate(
        &models.User{},
        &models.Task{},
        &models.Folder{},
    ); err != nil {
        log.Fatalf("Failed to run migrations: %v", err)
    }

    sqlDB, err := db.DB()
    if err != nil {
        log.Fatalf("Failed to get database instance: %v", err)
    }
    
    if err := sqlDB.Ping(); err != nil {
        log.Fatalf("Failed to ping database: %v", err)
    }

    log.Println("Successfully connected to database")
    DB = db
    return db
}

func CloseDB() {
    if DB != nil {
        sqlDB, err := DB.DB()
        if err != nil {
            log.Printf("Error getting underlying SQL DB: %v", err)
            return
        }
        if err := sqlDB.Close(); err != nil {
            log.Printf("Error closing database connection: %v", err)
        } else {
            log.Println("Database connection closed successfully")
        }
    }
}