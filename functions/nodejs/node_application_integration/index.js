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

  //application.integration
  logger.info("===========application.integration")
  const defaultAppAccessToken = await application.integration.getDefaultAppAccessToken();
  logger.info(`defaultAppAccessToken: ${JSON.stringify(defaultAppAccessToken)}`);
  const defaultTenantAccessToken = await application.integration.getDefaultTenantAccessToken();
  logger.info(`defaultTenantAccessToken: ${JSON.stringify(defaultTenantAccessToken)}`);
  // const tenantAccessToken = await application.integration.getTenantAccessToken("larkIntegration_d5baf60772d");
  // logger.info(`tenantAccessToken: ${JSON.stringify(tenantAccessToken)}`);
  // const appAccessToken = await application.integration.getAppAccessToken("larkIntegration_900bbb7a51b");
  // logger.info(`appAccessToken: ${JSON.stringify(appAccessToken)}`);

  // 在这里补充业务代码
}