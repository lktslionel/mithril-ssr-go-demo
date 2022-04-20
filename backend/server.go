package main

import (
	"fmt"
	"html"
	"net/http"
	"os"

	kitlog "github.com/go-kit/log"
	"github.com/go-logr/logr"
	"github.com/tonglil/gokitlogr"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/require"
)

func main() {
	kl := kitlog.NewLogfmtLogger(kitlog.NewSyncWriter(os.Stderr))
	kl = kitlog.With(kl, "ts", kitlog.DefaultTimestampUTC, "caller", kitlog.Caller(5))

	gokitlogr.NameFieldKey = "logger"
	gokitlogr.NameSeparator = "/"
	var log logr.Logger = gokitlogr.New(&kl)

	log = log.WithName("server")

	registry := new(require.Registry) // this can be shared by multiple runtimes

	runtime := goja.New()
	req := registry.Enable(runtime)

	runtime.RunString(`
    var m = require("m.js");
    m.test();
    `)

	m, err := req.Require("m.js")
	_, _ = m, err

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})

	http.HandleFunc("/api/v1/data", func(w http.ResponseWriter, r *http.Request) {

	})

	log.Error(http.ListenAndServe(":8080", nil), "", nil)

}
