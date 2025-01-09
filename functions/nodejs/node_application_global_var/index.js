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

  //application.globalVar
  logger.info("===========application.globalVar")
  const globalVarValues = {
    float: await application.globalVar.getVar("globalParam_e2fbe64d853"),
    text: await application.globalVar.getVar("globalParam_7f3acfe6f8b"),
    date: await application.globalVar.getVar("globalParam_3acfe6f8b3b"),
    record: await application.globalVar.getVar("globalParam_cfe6f8b3bd8"),
  };
  logger.info(JSON.stringify(globalVarValues));

  //打印入参
  logger.info(params.demo_input_field)

  //返回出参
  return {
    "demo_output_field": "ni hao"
  }

  // 在这里补充业务代码
}