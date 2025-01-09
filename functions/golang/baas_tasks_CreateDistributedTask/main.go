package baas_tasks_CreateDistributedTask

import (
	"context"
	"time"

	"github.com/byted-apaas/baas-sdk-go/baas"
	"github.com/byted-apaas/baas-sdk-go/tasks"
	"github.com/byted-apaas/faas-sdk-go/faas"
	"github.com/byted-apaas/server-sdk-go/application"
)

/*Params 函数入参定义
 * 结构体名称不支持自定义, 必须为 Params
 * 结构体属性支持自定义, 和 index.meta.json 中的 input 参数一一对应
 */
type Params struct {
}

/*Result 函数出参定义
 * 结构体名称不支持自定义, 必须为 Result
 * 结构体属性支持自定义, 和 index.meta.json 中的 output 参数一一对应
 */
type Result struct {
}

/*Handler 函数入口
 * 入口函数签名不支持自定义, 必须为 func(context.Context, *Params) (*Result, error)
 * @param ctx    请求上下文参数, 使用 server-sdk-go 需要链路透传该参数
 * @param params 请求参数
 */
func Handler(ctx context.Context, params *Params) (*Result, error) {
	application.GetLogger(ctx).Infof("%s 函数开始执行, logid: %s", time.Now().Format("2006-01-02 15:04:05.999"), faas.Tool.GetLogID(ctx))

	taskID, err := baas.Tasks.CreateDistributedTask(ctx, []interface{}{1, 2, 3, 4, 5, 6, 7, 8, 9, 10},
			"application_Metadata_go", "func_application_Tenant", "application_GlobalVar_go",
			&tasks.Options{
					Concurrency:          3,
					MaxSliceNumber:       2,
					ProgressCallbackStep: 1,
			})
	if err != nil {
			panic(err)
	}
	application.GetLogger(ctx).Infof("taskID: %d", taskID)

	return &Result{}, nil
}
