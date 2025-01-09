// 通过 NPM dependencies 成功安装 NPM 包后此处可引入使用
// 如安装 linq 包后就可以引入并使用这个包
// const linq = require("linq");

/**
 * @param {Params}  params     自定义参数
 * @param {Context} context    上下文参数，可通过此参数下钻获取上下文变量信息等
 * @param {Logger}  logger     日志记录器
 *
 * @return 函数的返回数据
 */
 module.exports = async function (params, context, logger) {
  // 日志功能
  // logger.info(`${new Date()} 函数开始执行`);

  // 新增记录
  logger.info("===========application.data.object.create()")
  const new_record_id = await application.data.object('object_6aecfa241c6').create({
    "name":  "张三" + new application.constants.type.DateTime(),
    "age": 18
  })
  logger.info(new_record_id)

  // 更新记录——⚠️注意常量是不可被改变的
  logger.info("===========application.data.object.update()")
  await application.data.object('object_6aecfa241c6').update(new_record_id, 
    {
      "name":  "李四" + new application.constants.type.DateTime(),
      "age": 28
    }
  )

  // 删除记录
  logger.info("===========application.data.object.delete()")
  await application.data.object("object_6aecfa241c6").delete(new_record_id)

  // 批量创建
  logger.info("===========application.data.object.batchCreate()")
  const new_record_ids = await application.data.object('object_6aecfa241c6').batchCreate(
    [
      {
        "name":  "张三" + new application.constants.type.DateTime(),
        "age": 18
      },
      {
        "name":  "李四" + new application.constants.type.DateTime(),
        "age": 19
      },
      {
        "name":  "王五" + new application.constants.type.DateTime(),
        "age": 20
      }
    ]
  )
  logger.info(new_record_ids)

  // 批量编辑
  logger.info("===========application.data.object.batchUpdate()")
  const update_record_ids = await application.data.object('object_6aecfa241c6').batchUpdate(
    [
      {
        "_id": new_record_ids[0],
        "name":  "张三" + new application.constants.type.DateTime() + "_edit",
        "age": 28
      },
      {
        "_id": new_record_ids[1],
        "name":  "李四" + new application.constants.type.DateTime() + "_edit",
        "age": 28
      },
      {
        "_id": new_record_ids[2],
        "name":  "王五" + new application.constants.type.DateTime() + "_edit",
        "age": 30
      }
    ]
  )
  logger.info(new_record_ids)

  // 批量删除
  logger.info("===========application.data.object.batchDelete()")
  await application.data.object('object_6aecfa241c6').batchDelete(new_record_ids)

  // 查询记录数量
  logger.info("===========application.data.object.count()")
  const count = await application.data.object('object_6aecfa241c6').count()
  logger.info("记录数量为：",count)


  // 查询一条记录——🔴查询的是哪条记录？还是随机的？
  logger.info("===========application.data.object.findOne()")
  const one_record = await application.data.object('object_6aecfa241c6').select('_id','name','age').findOne()
  logger.info("查询一条记录：",one_record)
  logger.info(`records: ${JSON.stringify(one_record)}`)

  // 查询记录列表
  logger.info("===========application.data.object.find()")
  const records = await application.data.object('object_6aecfa241c6').select('_id','name','age').find()
  logger.info("查询多条记录：",records)

  // 流式查询——🔴完全不知所云
  logger.info("===========application.data.object.finsStream()")
  const all_records = []
  const stream_records = await application.data.object('object_6aecfa241c6').select('_id','name','age').findStream(async (records) => {
    all_records.push(...records)
  })
  logger.info("流式查询记录",stream_records)

  // 带过滤条件查询
  logger.info("===========application.data.object.where()")
  let filter_records = await application.data.object('object_6aecfa241c6')
    .select('_id','name','age')
    .where({
      "age": application.operator.gt(18)
    })
    .find()
  logger.info("查询年龄大于18的记录",filter_records)
  logger.info("=================================")
  // 🔴注意常量是不可被改变的，此处要想复用filter_records这个变量，上面就不能定义为const
  filter_records = await application.data.object('object_6aecfa241c6')
    .select('_id','name','age')
    .where({
      "name": application.operator.contain("张环")
    })
    .find()
  logger.info("查询姓名包含张环的应用",filter_records)

  // 模糊查询——🔴模糊查询，走的ES；需在对象中配置可搜索字段。
  logger.info("===========application.data.object.fuzzySearch()")
  const fuzzy_records = await application.data.object('object_6aecfa241c6').select('name','age').fuzzySearch("张环",['name']).find()
  logger.info("查询姓名包含张环的应用",fuzzy_records)

  // select()，指定查询字段【不允许查询select *】，上述几乎每个命令都用到了
  logger.info("===========application.data.object.select()")

  // offset()，查询偏移量，也就是跳过多少条数据，通常和limit()一起用，MySQL中通过limit(m,n)一起指定偏移量和查询条数
  logger.info("===========application.data.object.offset()")
  const offset_records = await application.data.object('object_6aecfa241c6').select('name','age').offset(5).find()
  logger.info("查询偏移量",offset_records)

  // limit()，偏移量和查询条数一起用
  logger.info("===========application.data.object.limit()")
  const offset_limit_records = await application.data.object('object_6aecfa241c6').select('name','age').offset(5).limit(2).find()
  logger.info("偏移量和查询条数一起用",offset_limit_records)

  // 排序，升序
  logger.info("===========application.data.object.limit()")
  const asc_records = await application.data.object('object_6aecfa241c6').select('name','age').orderBy('age').find()
  logger.info("年龄升序",asc_records)

  // 排序，降序
  logger.info("===========application.data.object.limit()")
  const desc_records = await application.data.object('object_6aecfa241c6').select('name','age').orderByDesc('age').find()
  logger.info("年龄降序",desc_records)


  // 在这里补充业务代码
}