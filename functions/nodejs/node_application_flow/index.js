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

  // 调用流程，仅支持 “直接触发流程” 类型的流程
  logger.info("==================================")
  let result = await application.flow.execute("automation_0386213465f")
  logger.info(result)

  // 获取流程实例信息
  logger.info("==================================")
  execution_id = result['executionId']
  result = await application.flow.getExecutionInfo(execution_id)
  logger.info(result)

  // 获取流程实例人工任务信息
  logger.info("==================================")
  result = await application.flow.getExecutionUserTaskInfo(execution_id)
  logger.info(result)

  // 获取流程审批实例列表
  logger.info("==================================")
  result = await application.flow.getApprovalInstanceList()
  logger.info(result)

  // 获取流程审批实例详情，如果上面的命令返回空列表，则这一步就没有可用入参
  // logger.info("==================================")
  // result = await application.flow.getApprovalInstance(result.approvalInstanceIds[0])
  // logger.info(result)

  // 在这里补充业务代码
}