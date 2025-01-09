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

  //数据操作接口支持指定鉴权身份 ( >= v1.0.15)
  //·不显式指定: 访问数据模型时, 权限 1.0 应用默认使用系统身份鉴权, 权限 2.0 应用默认使用用户身份鉴权
  //·useUserAuth(): 访问数据模型时, 使用用户身份鉴权；——🌟应用管理员、开发者自动获取所有权限，亲测需要到应用管理和测试授权中同时关掉沙箱环境开关，才能关闭这部分权限
  //·useSystemAuth(): 访问数据模型时, 使用系统身份鉴权
  // ==> 🔴如果关掉应用管理员、开发者自动获取所有权限的沙箱环境开关，由于权限2.0应用默认又使用的是用户身份鉴权，那么所有没加.useUserAuth()的都会报无权限

  // 常规执行sql
  let oql_str = "select name,age from object_6aecfa241c6";
  let records = await application.data.oql(oql_str).execute()
  logger.info(records)

  // 加限制条件及limit条件。注意：使用 LIKE 时，必须以「%」同时开头并结尾
  oql_str = "select name,age from object_6aecfa241c6 where name like '%张三%' limit 3";
  records = await application.data.oql(oql_str).execute()
  logger.info(records)

  // 使用参数替换
  oql_str = "select name,age from object_6aecfa241c6 where age > $age";
  records = await application.data.oql(oql_str,{"age": 18}).execute()
  logger.info(records)

  // 走用户身份鉴权——我是应用管理员，在未关闭应用管理员和开发者自动获取所有权限的开关时，拥有所有权限
  oql_str = "select name,age from object_6aecfa241c6 where age > $age";
  records = await application.data.oql(oql_str,{"age": 18}).useUserAuth().execute()
  logger.info(records)

  // 走系统身份鉴权——我是应用管理员，自然有权限
  oql_str = "select name,age from object_6aecfa241c6 where age > $age";
  records = await application.data.oql(oql_str,{"age": 18}).useSystemAuth().execute()
  logger.info(records)



  // 在这里补充业务代码
}