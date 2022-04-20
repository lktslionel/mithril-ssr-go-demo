package main

import (
	"fmt"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/console"
	"github.com/dop251/goja_nodejs/require"
)

func main() {

	globalFolders := []string{
		// ".",
		"node_modules",
	}

	registry := require.NewRegistry(require.WithGlobalFolders(globalFolders...))

	vm := goja.New()
	req := registry.Enable(vm)
	console.Enable(vm)

	view, err := vm.RunString(`

		window = document =	requestAnimationFrame = undefined

    var m = require("render.js");

    console.log(m.AppView);
    `)

	fmt.Println(view, err)

	m, err := req.Require("render.js")
	_, _ = m, err

}
