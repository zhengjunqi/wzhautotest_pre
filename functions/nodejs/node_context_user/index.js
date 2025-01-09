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

  // context.tenant
  logger.info("===========context.tenant")
  const tenant = context.tenant;
  logger.info(
    `tenant.id: ${tenant.id}\n`,
    `tenant.name: ${tenant.name}\n`,
    `tenant.type: ${tenant.type}\n`,
    `tenant.domain: ${tenant.domain}\n`,
  );

  //context.app
  logger.info("===========context.app")
  const app = context.app
  logger.info(
    `app.namespace: ${app.namespace}\n`,
    `app.label: ${app.label}\n`,
    `app.description: ${app.description}\n`,
    `app.createdAt: ${app.createdAt}\n`,
    `app.createdBy: ${app.createdBy}\n`
  );
  logger.info(app)

  //context.user
  logger.info("===========context.user")
  const user = context.user
  logger.info(user)

  //context.event
  logger.info("===========context.event")
  const event = context.event
  logger.info(event)

  // 在这里补充业务代码
}