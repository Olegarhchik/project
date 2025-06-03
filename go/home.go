package main

import (
	"net/http"
	"text/template"
)

type (
	Request struct {
		Title string
	}
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("templates/base.html", "templates/home.html")

	if err != nil {
		responseError(w, err)
		return
	}

	tmpl.ExecuteTemplate(w, "base.html", Request{
		Title: "Главная",
	})
}