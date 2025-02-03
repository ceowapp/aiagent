package main

import (
    "encoding/json"
    "log"
    "github.com/gorilla/mux"
)

func main () {
    r := mux.NewRouter()

    log.Println("Server start on port 3000")
    log.Fatal(http.ListenAndServe("3000", r))
}