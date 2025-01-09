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

  //1.重试：retry
  logger.info("=================================")
  let records = await faas.tool.retry(async() => {
    return await faas.function('node_application_metadata').invoke()
  },{
    retryCount:3,
    retryDelay:500
  })
  logger.info(records)

  //2.🔴网络请求：http ==> 换个请求。。。
  // logger.info("=================================")
  // let allRes = await faas.tool.http({
  //   url: "https://name.kunlun-staging.bytedance.net/public/package1__c/api",
  //   method: "post",
  //   headers: {
  //     "content-Type": "application/json",
  //   },
  //   body: {"hello": "world"},
  //   responseType: "json",
  //   encoding: "utf-8",
  //   timeout: 5000
  // });
  // logger.info(allRes.statusCode) // 响应状态码
  // logger.info(allRes.headers)    // 响应头
  // logger.info(allRes.body)       // 响应体

  //3.设置泳道：setLaneName，🔴配置文件路径：.vscode/launch.json，也就是只有CLI开发才有效
  logger.info("=================================")
  faas.tool.setLaneName("your lane name");
  

  //4.模拟用户，在开发环境模拟用户测试权限信息
  logger.info("=================================")
  faas.tool.mockUserID(123)

  //5.获取日志id，用于排查问题或性能分析
  logger.info("=================================")
  logger.info(`${new Date()} 函数开始执行, logid: %s`, faas.tool.getLogID());

  // 在这里补充业务代码
}