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

  // baas.redis：缓存数据库。不可以用作存储，有逐出策略。

  // 日志功能
  logger.info(`${new Date()} 函数开始执行, logid: %s`, faas.tool.getLogID());

  // 1.set()/get()：设置缓存，需要设置过期时间，不建议用作存储场景
  logger.info("=================================set()/get()")
  let result = await baas.redis.set("key1", "helloworld", 'ex', 3);
  logger.info(`result: ${result}`)
 
  let value = await baas.redis.get("key1");
  logger.info(`value: ${value}`)
 
  // setNx，由于上面已经设置过了，过期之前无法设置
  let i = 0;
  await faas.tool.retry(async () => {
    result = await baas.redis.set("key1", "helloworld", 'ex', 3, 'nx');
    if (result !== "OK") {
      logger.warn(`第 ${++i} 次未获取到锁`)
      throw new Error("未获取到锁");
    }
    logger.info(`第 ${++i} 次获取到锁`)
  }, 
  {
    retryCount: 5,
    retryDelay: 1000,
  });

  //2.mset()：批量设置缓存
  logger.info("=================================mset()")
  let mset_result = await baas.redis.mset('mset_key','zhangsan','key2','lisi')
  logger.info(mset_result)

  //3.hset()：设置哈希结构的字段值
  logger.info("=================================hset()")
  let hset_result = await baas.redis.hset('hset_key','name','zhangsan')
  logger.info(hset_result)

  //4.hmset()：批量设置哈希结构的字段值
  logger.info("=================================hmset()")
  let hmset_result = await baas.redis.hmset('hmset_key',{'key1':'zhangsan','key2':'lisi'})
  logger.info(hmset_result)


  //5.lpush()/rpush()：将一个或多个值顺序插入到 key 中存储的列表的第一个/最后一个位置，如果 key 不存在，将创建一个列表
  logger.info("=================================lpush()/rpush()")
  let lpush_result = await baas.redis.lpush('lpush_key','value1','value2')
  logger.info(lpush_result)

  //6.lpop()/rpop()：删除并且获取 key 中存储的列表中的第一个值
  logger.info("=================================lpop()/rpop()")
  //为避免lpush_key对应的列表项持续膨胀，每次都删到只剩3个
  for(let i=0;i<lpush_result-3;i++){
    let lpop_value = await baas.redis.lpop('lpush_key')
    logger.info(lpop_value)
  }

  //7.lrange()：获取 key 中存储的列表的某个范围内的全部值
  logger.info("=================================lrange()")
  let lrange_value = await baas.redis.lrange('lpush_key',0,-1)
  logger.info(lrange_value)

  //8.sadd()：添加元素到 key 中存储的集合中，当 value 重复时，自动覆盖
  logger.info("=================================sadd()")
  let sadd_result = await baas.redis.sadd('sadd_key','value1','value2')
  logger.info(sadd_result)

  //9.smembers()：获取 key 中存储的集合的全部元素值
  logger.info("=================================smembers()")
  let smembers_value = await baas.redis.smembers('sadd_key')
  logger.info(smembers_value)
 
  return {};


  // 在这里补充业务代码
}