package middleware

import (
    "fmt"
    "net/http"
    "github.com/gin-gonic/gin"
)

type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}

func (e *AppError) Error() string {
    return fmt.Sprintf("error code: %d, message: %s", e.Code, e.Message)
}

func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
        if len(c.Errors) > 0 {
            err := c.Errors.Last()
            
            if appErr, ok := err.Err.(*AppError); ok {
                c.JSON(appErr.Code, appErr)
                return
            }

            c.JSON(http.StatusInternalServerError, gin.H{
                "code":    http.StatusInternalServerError,
                "message": "Internal Server Error",
            })
        }
    }
}