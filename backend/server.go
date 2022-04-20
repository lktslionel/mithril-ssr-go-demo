package main

import (
	"fmt"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/console"
	"github.com/dop251/goja_nodejs/require"
)

func main() {

	registry := require.NewRegistry()

	vm := goja.New()
	required := registry.Enable(vm)
	console.Enable(vm)

	const SCRIPT = `
	var m = require("./render.js") 
	
	console.log(m)
	`

	mod, _ := required.Require("./render.js")
	fmt.Println(mod)

	required.Require("mithril")

	v, err := vm.RunString(SCRIPT)
	if err != nil {
		fmt.Println("Error: %v", err)
	}
	
	fmt.Println(v, required)

	// mod, err := req.Require("render.js")
	// if err != nil {
		// fmt.Errorf("Failed")
	// }
// 
	// fmt.Println(mod)
	


}
