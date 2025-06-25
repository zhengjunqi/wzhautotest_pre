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
  logger.info(`${new Date()} 函数开始执行`);
  // 查询当前用户
  const user = await context.db.object('_user').select('_name').where({
    _email: 'chuxu.2023@bytedance.com'
  }).findOne();
  logger.info(user)
  // 创建一个info消息
  const msgId = await context.msg.notifyCenter.create({
    icon: 'info',
    target_users: [user._id],
    title: new kunlun.type.Multilingual({
      zh: '测试消息'
    }),
    detail: new kunlun.type.Multilingual({
      zh: '测试消息内容'
    })
  });
  // 将该消息更新为一个success消息
  await context.msg.notifyCenter.update(msgId, {
    icon: 'success',
  })
}