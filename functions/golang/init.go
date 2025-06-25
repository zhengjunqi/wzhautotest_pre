package functions

import (
	_ "github.com/byted-apaas/server-sdk-go"
)

// GlobalInit method is called before function deployment starts the server
// any exception in the GlobalInit method will cause the deployment to fail
// server-sdk-go cannot be used in GlobalInit
func GlobalInit() {
	// do something for server initial
}
