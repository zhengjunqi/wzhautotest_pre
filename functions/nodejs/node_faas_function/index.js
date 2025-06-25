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

  // 函数间的相互调用
  const result1 = await faas.function('node_application_global_var').invoke({"demo_input_field":"hello world"})
  const result2 = await faas.function('node_application_oql').invoke()
  const result3 = await faas.function('node_application_metadata').invoke()
  logger.info(JSON.stringify(result1));
  logger.info(JSON.stringify(result2));
  logger.info(JSON.stringify(result3));


  // 在这里补充业务代码
}