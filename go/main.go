package main

import (
	"net/http"
	"net/http/cgi"
	"strings"
)

func main() {
	cgi.Serve(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := strings.TrimPrefix(r.URL.Path, "/main.cgi")

		switch path {
		case "/":
			homeHandler(w, r)
		case "/courses":
			coursesHandler(w, r)
		case "/profile":
			profileHandler(w, r)
		}
	}))
}