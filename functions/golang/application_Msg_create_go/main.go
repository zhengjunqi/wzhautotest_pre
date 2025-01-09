package application_Msg_create_go

import (
	"context"
	"time"

	"github.com/byted-apaas/server-sdk-go/application"
	"github.com/byted-apaas/server-sdk-go/common/structs"
	"github.com/byted-apaas/server-sdk-go/service/data/field_type/faassdk"
)

/*Params 函数入参定义
 * 结构体名称不支持自定义, 必须为 Params
 * 结构体属性支持自定义, 和 index.meta.json 中的 input 参数一一对应
 */
type Params struct {
	DemoInputField string `json:"demo_input_field"` // 示例字段
}

/*Result 函数出参定义
 * 结构体名称不支持自定义, 必须为 Result
 * 结构体属性支持自定义, 和 index.meta.json 中的 output 参数一一对应
 */
type Result struct {
	DemoOutputField string `json:"demo_output_field"` // 示例字段
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

	// 1.创建一条消息
	taskID, err := application.Msg.NotifyCenter.Create(ctx, &structs.MessageBody{
		Icon:        "info",
		Percent:     10,
		TargetUsers: []int64{}, //pre 沙箱/线上 不同环境记得修改
		Title:       &faassdk.Multilingual{{LanguageCode: 1033, Text: "英文标题1"}, {LanguageCode: 2052, Text: "中文标题1"}},
		Detail:      &faassdk.Multilingual{{LanguageCode: 2052, Text: "中文详情1"}, {LanguageCode: 1033, Text: "英文详情1"}},
	})
	application.GetLogger(ctx).Infof("create----%v------%v", taskID, err)

	// 2.更新这条消息，🔴err上面已经定义过，这里不能用":="，只能直接用"="
	err = application.Msg.NotifyCenter.Update(ctx, taskID, &structs.MessageBody{
		Icon:        "success",
		Percent:     100,
		TargetUsers: []int64{1742877049790472},
		Title:       &faassdk.Multilingual{{LanguageCode: 1033, Text: "英文标题1"}, {LanguageCode: 2052, Text: "中文标题1"}},
		Detail:      &faassdk.Multilingual{{LanguageCode: 2052, Text: "中文详情1"}, {LanguageCode: 1033, Text: "英文详情1"}},
	})
	if err != nil {
		panic(err)
	}

	return nil, nil
}
