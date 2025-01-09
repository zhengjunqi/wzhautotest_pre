package application_User

import (
	"context"
	"time"
	"github.com/byted-apaas/faas-sdk-go/faas"
  cUtils "github.com/byted-apaas/server-common-go/utils"
  "github.com/byted-apaas/server-sdk-go/application"
  "github.com/byted-apaas/server-sdk-go/common/structs"
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
	UserID     int64               `json:"userID"`
	UserLocal  *structs.Locale     `json:"userLocale"`
	UserLocals []*structs.Locale   `json:"userLocales"`
}

/*Handler 函数入口
 * 入口函数签名不支持自定义, 必须为 func(context.Context, *Params) (*Result, error)
 * @param ctx    请求上下文参数, 使用 server-sdk-go 需要链路透传该参数
 * @param params 请求参数
 */
func Handler(ctx context.Context, params *Params) (*Result, error) {
	application.GetLogger(ctx).Infof("%s 函数开始执行, logid: %s", time.Now().Format("2006-01-02 15:04:05.999"), faas.Tool.GetLogID(ctx))

    // 获取用户ID
    userID := application.User.GetUserID(ctx)
   
    application.GetLogger(ctx).Infof("userID: %d", userID)

    // 获取用户的 locale
    userLocale, err := application.User.GetLocaleByUserID(ctx, 1773839894926344)
    if err != nil {
        panic(err)
    }
    application.GetLogger(ctx).Infof("userLocale: %s", cUtils.ToString(userLocale))

    // 批量获取用户的 locale
    userLocales, err := application.User.GetLocaleByUserIDList(ctx, []int64{1773839894926344})
    if err != nil {
        panic(err)
    }
    application.GetLogger(ctx).Infof("userLocales: %s", cUtils.ToString(userLocales))

    return &Result{
        UserID:     userID,
        UserLocal:  userLocale,
        UserLocals: userLocales,
    }, nil
}
