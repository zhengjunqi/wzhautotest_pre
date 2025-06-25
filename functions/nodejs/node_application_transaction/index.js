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
  // 开启事务
  let tx = application.data.newTransaction();
  // 新建一个object_test的记录
  let first_record = tx.object("object_6aecfa241c6").registerCreate({
    "name":  "张三" + new application.constants.type.DateTime(),
    "age": 18
  });

  // 事务：事务内的若干任务要么都成功、要么都失败；如果在这里造一个错误，那么前面已经执行成功的也不会真生效
  // throw new Error('手动制造的错误');

  // 再新建一个object_test的记录
  let second_record = tx.object("object_6aecfa241c6").registerCreate({
    "name":  "李四" + new application.constants.type.DateTime(),
    "age": 19
  });
  // 提交事务
  await tx.commit();
  // 打印返回值（事务提交前，返回值中的 _id 均为临时 _id，只有提交事务后，才是 DB 中的真实 _id）
  logger.info("first_record: ", first_record);
  logger.info("second_record: ", second_record);

  // 批量删除上面新增的记录
  await application.data.object('object_6aecfa241c6').delete(first_record)
  await application.data.object('object_6aecfa241c6').delete(second_record)

  // 在这里补充业务代码

}