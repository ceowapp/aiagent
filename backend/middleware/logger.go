package middleware

import (
    "time"
    "github.com/gin-gonic/gin"
    "go.uber.org/zap"
)

func RequestLogger() gin.HandlerFunc {
    logger, _ := zap.NewProduction()
    defer logger.Sync()

    return func(c *gin.Context) {
        start := time.Now()
        path := c.Request.URL.Path
        query := c.Request.URL.RawQuery
        requestID, _ := c.Get("RequestID")

        c.Next()

        latency := time.Since(start)
        status := c.Writer.Status()

        logger.Info("request",
            zap.String("request_id", requestID.(string)),
            zap.String("path", path),
            zap.String("query", query),
            zap.String("ip", c.ClientIP()),
            zap.String("method", c.Request.Method),
            zap.Int("status", status),
            zap.Duration("latency", latency),
            zap.String("user_agent", c.Request.UserAgent()),
        )
    }
}