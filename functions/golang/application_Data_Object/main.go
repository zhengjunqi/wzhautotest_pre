package application_Data_Object

import (
  "context"
  "time"
  "github.com/byted-apaas/server-sdk-go/application"
  cUtils "github.com/byted-apaas/server-common-go/utils"
  "github.com/byted-apaas/server-sdk-go/application/operator"
  "functions/common"
  "github.com/byted-apaas/faas-sdk-go/faas"
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
  application.GetLogger(ctx).Infof("%s 函数开始执行, logid: %s", time.Now().Format("2006-01-02 15:04:05.999"), faas.Tool.GetLogID(ctx))

  // 在这里补充业务代码
  // 创建单条记录
  createRecord := common.TestObject{
    Text:     "suntest",
  }
	
  recordOnlyID, err := application.Data.Object("object_f9e49172728").Create(ctx, createRecord)
  if err != nil {
      panic(err)
  }

	// 这里是为了避免写立即查主从延迟问题，仅为了示例展示，实际业务场景应避免写立即查
	time.Sleep(1 * time.Second)

	// 查询单条记录
	record := common.TestObject{}
	err = application.Data.Object("object_f9e49172728").Where(operator.Eq("_id", recordOnlyID)). Select("text").FindOne(ctx, &record)
  if err != nil {
      panic(err)
  }
	application.GetLogger(ctx).Infof("record: %s", cUtils.ToString(record))

	// 更新单条记录
	err = application.Data.Object("object_f9e49172728").Update(ctx, recordOnlyID.ID, map[string]interface{}{"text": "单个更新"})
	if err != nil {
			panic(err)
	}

	//删除单条记录
	err = application.Data.Object("object_f9e49172728").Delete(ctx, recordOnlyID.ID)
	if err != nil {
			panic(err)
	}

	// 创建多条记录
	records := []*common.TestObject{
		{
				Text:         "ljstext",
				// 其它字段省略，构造方式同「创建单条记录」示例
		},
		{
				Text:         "ljstext",
				// 其它字段省略，构造方式同「创建单条记录」示例
		},
	}
	recordIDs, err := application.Data.Object("object_f9e49172728").BatchCreate(ctx, records)
	if err != nil {
			panic(err)
	}
	application.GetLogger(ctx).Infof("recordIDs: %s", cUtils.ToString(recordIDs))

	//更新多条记录
	err = application.Data.Object("object_f9e49172728").BatchUpdate(ctx, map[int64]interface{}{
		recordIDs[0]: map[string]interface{}{"text": "批量更新1"},
		recordIDs[1]: map[string]interface{}{"text": "批量更新2"},
	})
	if err != nil {
		panic(err)
	}

	//删除多条记录
	err = application.Data.Object("object_f9e49172728").BatchDelete(ctx, recordIDs)
	if err != nil {
			panic(err)
	}

	//查询数量count()
	count, err := application.Data.Object("object_f9e49172728").Where(nil).Select("text").Count(ctx)
	if err != nil {
		panic(err)
	}
	application.GetLogger(ctx).Infof("count: %d", count)

	//FindOne()
	FindOne_record := common.TestObject{}
	//🔴注意：传入一个空的列表进去，命令执行成功后，会将查询到的参数赋值给这个空参数
	err = application.Data.Object("object_f9e49172728").Where(operator.Contain("text","chuxu")).Select("text").FindOne(ctx,&FindOne_record)
	if err != nil {
		panic(err)
	}
	application.GetLogger(ctx).Infof("FindOne_record: %d", cUtils.ToString(FindOne_record))


	//Find()、FuzzySearch()、Where()、Select()、Offset()、Limit()、OrderBy()
	//🔴注意：这里要定义数组来接受
	comprehensive_records := []*common.TestObject{}
	err = application.Data.Object("object_f9e49172728").
			FuzzySearch("l", []string{"text"}).  //模糊搜索text字段包含"l"的item
			Where(
				operator.And(
				operator.Contain("text", "l"),  //text字段包含"l"字符串
				operator.NotEmpty("text"),  //text字段不为空
			)).OrderBy("_id").Offset(3).Limit(2).Select("text").Find(ctx, &comprehensive_records)	
	if err != nil {
		panic(err)
	}
	application.GetLogger(ctx).Infof("comprehensive_records: %d", cUtils.ToString(comprehensive_records))


	//OrderByDesc()
	OrderByDesc_records := []*common.TestObject{}
	err = application.Data.Object("object_f9e49172728").
	FuzzySearch("l", []string{"text"}).
	Where(
		operator.And(
		operator.Contain("text", "l"),
		operator.NotEmpty("text"),
	)).OrderByDesc("_id").Offset(3).Limit(2).Select("text").Find(ctx, &OrderByDesc_records)	
	if err != nil {
		panic(err)
	}
	application.GetLogger(ctx).Infof("OrderByDesc_records: %d", cUtils.ToString(OrderByDesc_records))


	//使用用户身份鉴权UseUserAuth()
	count_user_auth, err := application.Data.Object("object_f9e49172728").UseUserAuth().Where(nil).Select("text").Count(ctx)
	if err != nil {
		panic(err)
	}
	application.GetLogger(ctx).Infof("count_user_auth: %d", count_user_auth)

	//使用系统身份鉴权UseUserAuth()
	count_system_auth, err := application.Data.Object("object_f9e49172728").UseSystemAuth().Where(nil).Select("text").Count(ctx)
	if err != nil {
		panic(err)
	}
	application.GetLogger(ctx).Infof("count_system_auth: %d", count_system_auth)

  return &Result{}, nil
}