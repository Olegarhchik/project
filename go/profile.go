package main

import (
	"net/http"
	"text/template"
)

func profileHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("templates/base.html", "templates/profile.html")

	if err != nil {
		responseError(w, err)
		return
	}

	tmpl.ExecuteTemplate(w, "base.html", Request{
		Title: "Профиль",
	})
}