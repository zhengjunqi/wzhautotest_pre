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

  // 上传文件
  logger.info("==================================")
  // 1.获取网络文件流
  const resp = await axios({
    url: 'https://images.pexels.com/photos/27077973/pexels-photo-27077973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    method: 'get',
    responseType: 'stream'
  });
  logger.info(resp)
  // 2.上传文件获取文件 token
  const file_info = await application.resources.file.upload(resp.data);
  logger.info(file_info);

  // 3.下载文件
  const download_content = await application.resources.file.download({id: file_info.id});
  logger.info(download_content.toString());

  // 在这里补充业务代码
}