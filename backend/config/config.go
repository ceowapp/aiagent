package config

import (
    "log"
    "strings"
    "github.com/spf13/viper"
)

type Config struct {
    Port        string   `mapstructure:"PORT"`
    Environment string   `mapstructure:"ENVIRONMENT"`
    Version     string   `mapstructure:"VERSION"`
    Database    DBConfig `mapstructure:"DATABASE"`
    CORS        CORSConfig `mapstructure:"CORS"`
}

type DBConfig struct {
    URL      string `mapstructure:"URL"`   
    Host     string `mapstructure:"HOST"`
    Port     string `mapstructure:"PORT"`
    User     string `mapstructure:"USER"`
    Password string `mapstructure:"PASSWORD"`
    Name     string `mapstructure:"NAME"`
    SSLMode  string `mapstructure:"SSLMODE"`
}

type CORSConfig struct {
    AllowedOrigins []string `mapstructure:"ALLOWED_ORIGINS"`
}

func LoadConfig() *Config {
    viper.SetConfigName("config") 
    viper.SetConfigType("yaml")   
    
    viper.AddConfigPath(".")
    viper.AddConfigPath("./config")
    
    viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
    
    viper.AutomaticEnv()

    setDefaults()

    if err := viper.ReadInConfig(); err != nil {
        if _, ok := err.(viper.ConfigFileNotFoundError); ok {
            log.Println("No config file found, using environment variables and defaults")
        } else {
            log.Printf("Error reading config file: %v", err)
        }
    } else {
        log.Printf("Using config file: %s", viper.ConfigFileUsed())
    }

    config := &Config{}
    if err := viper.Unmarshal(config); err != nil {
        log.Fatalf("Unable to decode config into struct: %v", err)
    }

    return config
}

func setDefaults() {
    viper.SetDefault("PORT", "8000")
    viper.SetDefault("ENVIRONMENT", "development")
    viper.SetDefault("VERSION", "1.0.0")

    viper.SetDefault("DATABASE.HOST", "localhost")
    viper.SetDefault("DATABASE.PORT", "5432")
    viper.SetDefault("DATABASE.USER", "postgres")
    viper.SetDefault("DATABASE.NAME", "aiagent")
    viper.SetDefault("DATABASE.SSLMODE", "disable")
    viper.SetDefault("DATABASE.URL", "")

    viper.SetDefault("CORS.ALLOWED_ORIGINS", []string{"http://localhost:3000"})
}