package main

import (
    "context"
    "log"
    "net/http"
    "os"
    "os/signal"
    "syscall"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "aiagent/backend/config"
    "aiagent/backend/pkg/database"
    "aiagent/backend/internal/handlers"
    "aiagent/backend/internal/repositories"
    "aiagent/backend/middleware"
)

func main() {
    cfg := config.LoadConfig()

   if cfg.Environment == "production" {
        gin.SetMode(gin.ReleaseMode)
    }

    db := database.InitDB()
    defer database.CloseDB()

    taskRepo := repositories.NewTaskRepository(db)

    taskHandler := handlers.NewTaskHandler(taskRepo)

    r := gin.Default()

    r.Use(gin.Recovery())
    r.Use(gin.Logger())
    
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:          12 * time.Hour,
    }))

    r.Use(middleware.RequestID())
    r.Use(middleware.RequestLogger())
    r.Use(middleware.ErrorHandler())

    r.GET("/health", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "status": "healthy",
            "time":   time.Now().Format(time.RFC3339),
        })
    })

    taskHandler.RegisterRoutes(r)

    srv := &http.Server{
        Addr:         ":" + cfg.Port,
        Handler:      r,
        ReadTimeout:  15 * time.Second,
        WriteTimeout: 15 * time.Second,
        IdleTimeout:  60 * time.Second,
    }

    go func() {
        log.Printf("Server starting on port :%s in %s mode", cfg.Port, cfg.Environment)
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatalf("Server failed to start: %v", err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit
    log.Println("Shutting down server...")

     ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal("Server forced to shutdown:", err)
    }

    log.Println("Server exiting")

}