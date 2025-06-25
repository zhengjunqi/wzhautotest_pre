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

  // 使用application.data.object.where()中的filter参数来使用各种逻辑运算符
  logger.info("==========================start")
  logger.info("==========================逻辑-与")
  let filter_records = await application.data.object('object_6aecfa241c6')
    .select('_id','name','age')
    .where({
      "age": application.operator.and(application.operator.gt(17),application.operator.lt(22))
    })
    .find()
  logger.info("大于17岁且小于22岁的记录",filter_records)

  logger.info("==========================逻辑-或")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "age": application.operator.or(application.operator.lt(17),application.operator.gt(22))
  })
  .find()
  logger.info("小于17岁或大于22岁的记录",filter_records)

  logger.info("==========================逻辑-包含")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "name": application.operator.contain("abcd")
  })
  .find()
  logger.info("姓名包含‘abcd’的记录",filter_records)

  logger.info("==========================逻辑-不包含")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "name": application.operator.notContain("abcd")
  })
  .find()
  logger.info("姓名不包含‘abcd’的记录",filter_records)

  logger.info("==========================逻辑-包含于")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "name": application.operator.in("李朗hijklmn987654321")
  })
  .find()
  logger.info("姓名包含于‘李朗hijklmn987654321’的记录",filter_records)

  logger.info("==========================逻辑-不属于任何一个")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "name": application.operator.notIn("hahahaha")
  })
  .find()
  logger.info("姓名不包含于‘hahahaha’的记录",filter_records)

  
  logger.info("==========================逻辑-为空")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "name": application.operator.empty()
  })
  .find()
  logger.info("姓名为空记录",filter_records)

  logger.info("==========================逻辑-不为空")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "name": application.operator.notEmpty()
  })
  .find()
  logger.info("姓名不为空的记录",filter_records)

  logger.info("==========================逻辑-等于")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "age": application.operator.eq(18)
  })
  .find()
  logger.info("年龄等于18的记录",filter_records)

  logger.info("==========================逻辑-不等于")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "age": application.operator.neq(18)
  })
  .find()
  logger.info("年龄不等于18的记录",filter_records)

  logger.info("==========================逻辑-大于")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "age": application.operator.gt(18)
  })
  .find()
  logger.info("年龄大于18的记录",filter_records)

  logger.info("==========================逻辑-大于等于")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "age": application.operator.gte(18)
  })
  .find()
  logger.info("年龄大于等于18的记录",filter_records)

  logger.info("==========================逻辑-小于")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "age": application.operator.lt(18)
  })
  .find()
  logger.info("年龄小于18的记录",filter_records)

  logger.info("==========================逻辑-小于等于")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age')
  .where({
    "age": application.operator.lte(18)
  })
  .find()
  logger.info("年龄小于等于18的记录",filter_records)

  logger.info("==========================逻辑-存在给定的多个值中的任何一个值")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age','multi_option')
  .where({
    "multi_option": application.operator.hasAnyOf("a","option_cc6bc48235d")
  })
  .find()
  logger.info("选项里有A或者B的记录",filter_records)

  logger.info("==========================逻辑-不存在给定的多个值中的任何值")
  filter_records = await application.data.object('object_6aecfa241c6')
  .select('_id','name','age','multi_option')
  .where({
    "multi_option": application.operator.hasNoneOf("option_cc6bc48235d","option_1736153988682_17b")
  })
  .find()
  logger.info("选项里既没有A也没有B的记录",filter_records)
  logger.info("==========================end")


}