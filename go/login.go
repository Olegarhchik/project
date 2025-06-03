package main

import (
	"net/http"
	"text/template"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("templates/base.html", "templates/auth.html")

	if err != nil {
		responseError(w, err)
		return
	}

	tmpl.ExecuteTemplate(w, "base.html", Request{
		Title: "Вход",
	})
}