package server

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/arthurbaquit/seelect-2023/adapters/web/handler"
	"github.com/arthurbaquit/seelect-2023/app"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

type WebServer struct {
	Service app.ProductServiceInterface
}

func NewWebServer(service app.ProductServiceInterface) *WebServer {
	return &WebServer{Service: service}
}

func (w *WebServer) Serve() {
	r := mux.NewRouter()
	n := negroni.New(
		negroni.NewRecovery(),
		negroni.NewLogger(),
	)
	handler.MakeProductHandlers(r, n, w.Service)
	http.Handle("/", r)
	server := &http.Server{
		ReadHeaderTimeout: 10 * time.Second,
		WriteTimeout:      10 * time.Second,
		Addr:              ":8080",
		Handler:           http.DefaultServeMux,
		ErrorLog:          log.New(os.Stderr, "web-server", log.Lshortfile),
	}
	fmt.Println("server started at port 8080")
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
