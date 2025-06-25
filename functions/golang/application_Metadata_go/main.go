package application_Metadata_go

import (
    "context"
    "time"

    cUtils "github.com/byted-apaas/server-common-go/utils"
    "github.com/byted-apaas/server-sdk-go/application"
)

/*Params 函数入参定义
 * 结构体名称不支持自定义, 必须为 Params
 * 结构体属性支持自定义, 和 meta.json 中的 input 参数一一对应
 */
type Params struct{}

/*Result 函数出参定义
 * 结构体名称不支持自定义, 必须为 Result
 * 结构体属性支持自定义, 和 meta.json 中的 output 参数一一对应
 */
type Result struct {
    Field interface{} `json:"field"`
}

/*Handler 函数入口
 * 入口函数签名不支持自定义, 必须为 func(context.Context, *Params) (*Result, error)
 * @param ctx    请求上下文参数, 使用 server-sdk-go 需要链路透该参数
 * @param params 请求参数
 */
func Handler(ctx context.Context, params *Params) (*Result, error) {
    // 日志功能
    application.GetLogger(ctx).Infof("%s 函数开始执行", time.Now().Format("2006-01-02 15:04:05.999"))

    // 在这里补充业务代码
    var field interface{}
    err := application.Metadata.Object("object_f9e49172728").GetField(ctx, "text", &field)
    if err != nil {
        panic(err)
    }
    application.GetLogger(ctx).Infof("field: %s", cUtils.ToString(field))

    return &Result{
        Field: field,
    }, nil
}
