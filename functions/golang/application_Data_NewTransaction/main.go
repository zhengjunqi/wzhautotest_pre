package application_Data_NewTransaction

import (
	"context"
	"time"
	"functions/common"
	"github.com/byted-apaas/server-sdk-go/application"
	cUtils "github.com/byted-apaas/server-common-go/utils"
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
	// 日志功能
	application.GetLogger(ctx).Infof("%s 函数开始执行", time.Now().Format("2006-01-02 15:04:05.999"))

	// 1.开启事务
	tx := application.Data.NewTransaction()

	// 2.向simpleObject中写入一条记录
	first_record := common.TestObject{
		Text: "suntest_1",
	}
	first_record_id,err := tx.Object("object_f9e49172728").RegisterCreate(first_record)
	if err != nil {
		panic(err)
	}
	application.GetLogger(ctx).Infof(cUtils.ToString(first_record_id))


	// 3.事务：事务内的若干任务要么都成功、要么都失败；如果在这里造一个错误，那么前面已经执行成功的也不会真生效
	// 手动抛一个异常
	// errors.New("a error")

	// 4.再向simpleObject中写入一条记录
	second_record := common.TestObject{
		Text: "suntest_2",
	}
	second_record_id,err := tx.Object("object_f9e49172728").RegisterCreate(second_record)
	if err != nil {
		panic(err)
	}
	application.GetLogger(ctx).Infof(cUtils.ToString(second_record_id))

	// 6.提交事务
	err = tx.Commit(ctx)
	if err != nil {
		panic(err)
	}
	// 事务提交前，返回值中的 _id 均为临时 _id，只有提交事务后，才是 DB 中的真实 _id
	application.GetLogger(ctx).Infof("事务提交后，first_record_id：", cUtils.ToString(first_record_id))
	application.GetLogger(ctx).Infof("事务提交后，second_record_id：", cUtils.ToString(second_record_id))


	// 5.删除上面新增的记录，注意这里的参数要加上，调试可知first_record_id是一个interface{}类型
	//【<interface {}(int64)>)】实际是一个int64类型，这里需要强转一下
	application.Data.Object("object_f9e49172728").Delete(ctx, (first_record_id.ID).(int64))
	application.Data.Object("object_f9e49172728").Delete(ctx, (second_record_id.ID).(int64))

	return &Result{}, nil
}
