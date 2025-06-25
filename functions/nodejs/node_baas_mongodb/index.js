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

  //0.建表
  const T = baas.mongodb.table("student");

  //1.创建记录
  // create 并不会入库，会初始化系统字段
  logger.info("=================================create()/save()创建记录")
  const record1 = T.create({ "name": "小明", "age": 18 });
  logger.info(`record1: ${JSON.stringify(record1)}`);
  const record2 = T.create([{ "name": "小华", "age": 20 }]);
  logger.info(`record2: ${JSON.stringify(record2)}`);
  // 可以先 create 再用 save 入库，也可以直接调用 save 入库
  const result = await T.save([record1, ...record2]);
  logger.info(`result: ${JSON.stringify(result)}`);

  //2.更新记录，由于调用的是async方法，所以必须加await关键字。可通过JSON路径获取属性。
  logger.info("=================================save()更新记录")
  await initDataUpdate(logger)
  await queryUpdate(logger)
  await queryBatchUpdate(logger)

  //3.删除记录【直接删除/条件删除】
  logger.info("=================================delete()删除记录")
  await initDataDelete(logger)
  await queryDelete(logger)
  await queryBatchDelete(logger)
  await whereDelete(logger)

  //4.查询记录
  logger.info("=================================find()查询记录")
  await initDataQuery(logger)
  //无条件查询：find、findOne、count
  await queryNoCondition(logger)
  //条件查询：操作符 eq 的使用及下钻场景
  await queryWhere(logger)
  //正则表达式查询
  await queryRegex(logger)
  //算术操作符链式查询
  await queryGteAndLt(logger)
  //操作符 in 查询
  await queryIn(logger)
  //逻辑操作符查询
  await queryOr(logger)
  //翻页查询
  await querySkipLimit(logger)

  //5.分组聚合
  logger.info("=================================groupBy()分组聚合")
  await initDataGroupBy(logger)
  //数据求和与分组求和
  await aggSum(logger)
  //聚合取别名
  await aggAs(logger)
  //数据条数
  await aggNum(logger)
  //分组聚合
  await aggGroup(logger)
  //算术操作符
  await aggMultiply(logger)
}

async function initDataUpdate(logger) {
  const T = baas.mongodb.table("goods");
  let records = await T.where().delete();
  logger.info(`initData records: ${JSON.stringify(records)}`);
  
  records = await T.create([
    { item: "iphone 6", qty: 25, info: { city: '上海', tag: [] } },
    { item: "iphone 7", qty: 150, info: { city: '上海', tag: ['hot'] } },
    { item: "iphone X", qty: 100, info: { city: '北京', tag: ['new'] } },
    { item: "Mac Pro", qty: 75, info: { city: '北京', tag: ['new', 'hot'] } },
    { item: "Mac Air", qty: 45, info: { city: '北京', tag: [] } }
  ]);
  logger.info(`initData records: ${JSON.stringify(records)}`);
  await T.save(records);
}

async function queryUpdate(logger) {
  const T = baas.mongodb.table("goods");
  let record = await T.where({ item: "iphone 6" }).findOne();
  logger.info(`queryUpdate record: ${JSON.stringify(record)}`);
 
  record.qty += 10;
  let saveRes = await T.save(record);
  logger.info(`queryUpdate saveRes: ${JSON.stringify(saveRes)}`);
 
  let newRes = await T.where({ item: "iphone 6" }).findOne();
  logger.info(`queryUpdate newRes: ${JSON.stringify(newRes)}`);
}

async function queryBatchUpdate(logger) {
  const T = baas.mongodb.table("goods");
  let oldRes = await T.where({ "info.city": "上海" }).find();
  logger.info(`queryBatchUpdate oldRes: ${JSON.stringify(oldRes)}`);

  oldRes.forEach((record) => record.qty += 10);

  let saveRes = await T.save(oldRes);
  logger.info(`queryBatchUpdate saveRes: ${JSON.stringify(saveRes)}`);
}

async function initDataDelete(logger) {
  const T = baas.mongodb.table("goods");
  let records = await T.where().delete();
  logger.info(`initData records: ${JSON.stringify(records)}`);
 
  records = await T.create([
    { item: "iphone 6", qty: 25, info: { city: '上海', tag: [] } },
    { item: "iphone 7", qty: 150, info: { city: '上海', tag: ['hot'] } },
    { item: "iphone X", qty: 100, info: { city: '北京', tag: ['new'] } },
    { item: "Mac Pro", qty: 75, info: { city: '北京', tag: ['new', 'hot'] } },
    { item: "Mac Air", qty: 45, info: { city: '北京', tag: [] } }
  ]);
  logger.info(`initData records: ${JSON.stringify(records)}`);
  await T.save(records);
}

async function queryDelete(logger) {
  const T = baas.mongodb.table("goods");
  let record = await T.where().findOne();
  logger.info(`queryDelete record: ${JSON.stringify(record)}`);

  let records = await T.delete(record);
  logger.info(`queryDelete records: ${JSON.stringify(records)}`);
}

async function queryBatchDelete(logger) {
  const T = baas.mongodb.table("goods");
  let records = await T.where().find();
  logger.info(`queryBatchDelete records: ${JSON.stringify(records)}`);

  records = await T.delete(records);  
  logger.info(`queryBatchDelete records: ${JSON.stringify(records)}`);
}

async function whereDelete(logger) {
  const T = baas.mongodb.table("goods");
  let result = await T.where({ "info.city": "shanghai" }).delete();
  logger.info(`whereDelete result: ${JSON.stringify(result)}`);
}

async function initDataQuery(logger) {
  const T = baas.mongodb.table("goods");
  let res = await T.where().delete();
  logger.info(`delete res: ${JSON.stringify(res)}`);

  res = await T.create([
    { item: "iphone 6", qty: 25, info: { city: '上海', tag: [] } },
    { item: "iphone 7", qty: 15, info: { city: '上海', tag: [] } },
    { item: "iphone 7", qty: 150, info: { city: '上海', tag: ['hot'] } },
    { item: "iphone X", qty: 100, info: { city: '北京', tag: ['new'] } },
    { item: "Mac Pro", qty: 75, info: { city: '北京', tag: ['new', 'hot'] } },
    { item: "Mac Air", qty: 45, info: { city: '北京', tag: [] } }
  ]);
  res = await T.save(res);
  logger.info(`save res: ${JSON.stringify(res)}`);
}

//无条件查询
async function queryNoCondition(logger) {
   const T = baas.mongodb.table("goods");
   let record = await T.where().findOne();
   logger.info(`findOne record: ${JSON.stringify(record)}`);

   let records = await T.where().find();
   logger.info(`find record: ${JSON.stringify(record)}`);

   let count = await T.where().count();
   logger.info(`count: ${count}`);
}

//条件查询：操作符 eq 的使用及下钻场景
async function queryWhere(logger) {
   const T = baas.mongodb.table("goods");
   // eq 可省略
   // where({field:value})
   let records = await T.where({ item: "iphone 6" }).find();
   logger.info(`queryWhere records: ${JSON.stringify(records)}`);

   // where({field:eq(value)})
   records = await T.where({ item: baas.mongodb.eq("iphone 6") }).find();
   logger.info(`queryWhere records: ${JSON.stringify(records)}`);

   // where(field).eq(value)
   records = await T.where("item").eq("iphone 6").find();
   logger.info(`queryWhere records: ${JSON.stringify(records)}`);

   // where({_id:ObjectID(value)})
   records = await T.where({ _id: baas.mongodb.ObjectId("61f4e223b9dddbc61e289722") }).find();
   logger.info(`queryWhere records: ${JSON.stringify(records)}`);

   // where({"a.b":value})
   records = await T.where({ "info.city": "北京" }).find();
   logger.info(`queryWhere records: ${JSON.stringify(records)}`);

   // where({"a.b"}).eq(value)
   records = await T.where("info.city").eq("北京").find();
   logger.info(`queryWhere records: ${JSON.stringify(records)}`);
}

//正则表达式查询
async function queryRegex(logger) {
   const T = baas.mongodb.table("goods");
   // where({field:value})
   let records = await T.where({ "item": /^iphone/ }).find();
   logger.info(`queryRegex records: ${JSON.stringify(records)}`);

   // where(field).regex(value1)
   records = await T.where("item").regex(/^iphone/).find();
   logger.info(`queryRegex records: ${JSON.stringify(records)}`);

   // where(field).regex(value1)
   records = await T.where("item").regex("^iphone").find();
   logger.info(`queryRegex records: ${JSON.stringify(records)}`);
}

//算术操作符链式查询
async function queryGteAndLt(logger) {
  const T = baas.mongodb.table("goods");
  // where({field:gte(value1).lt(value2)})
  let records = await T.where({ "qty": baas.mongodb.gte(45).lt(100) }).find();
  logger.info(`queryGteAndLt records: ${JSON.stringify(records)}`);

  // where(field).gte(value1).lt(value2)
  records = await T.where("qty").gte(45).lt(100).find();
  logger.info(`queryGteAndLt records: ${JSON.stringify(records)}`);
}

//操作符 in 查询
async function queryIn(logger) {
   const T = baas.mongodb.table("goods");
   let records = await T.where().find();
   let recordIds = [];
   records.forEach(record => recordIds.push(record._id));
   let result = await T.where({ _id: baas.mongodb.in(recordIds) }).find();
   logger.info(`queryIn result: ${JSON.stringify(result)}`);
}

//逻辑操作符查询
async function queryOr(logger) {
   const T = baas.mongodb.table("goods");
   // where(cond1).or(cond2)
   let records = await T.where({ 'info.city': '北京' })
       .or({ qty: baas.mongodb.gt(100) })
       .find();
   logger.info(`queryOr records: ${JSON.stringify(records)}`);

   // where(or(cond1, cond2))
   records = await T.where(
       baas.mongodb.or(
           { 'info.city': '北京' },
           { qty: baas.mongodb.gt(100) }
       )
   ).find();
   logger.info(`queryOr records: ${JSON.stringify(records)}`);

   // where(or(and(cond1, cond2), and(cond3, cond4)))
   records = await T.where(
       baas.mongodb.or(
           baas.mongodb.and(
               { 'info.city': 'shanghai' },
               { qty: 150 }
           ),
           baas.mongodb.and(
               { 'info.city': '北京' },
               { qty: 75 }
           )
       )
   ).find();
   logger.info(`queryOr records: ${JSON.stringify(records)}`);

   // where(or(cond1, cond2)).and(cond3)
   records = await T.where(
       baas.mongodb.or(
           { 'info.city': '北京' },
           { qty: baas.mongodb.gt(100) }
       )
   ).and({ item: "iphone 7" }).find();
   logger.info(`queryOr records: ${JSON.stringify(records)}`);
}

//翻页查询
async function querySkipLimit(logger) {
   const T = baas.mongodb.table("goods");
   // projection
   let records = await T.where().projection({ "item": 1, "qty": 1 }).find();
   logger.info(`querySkipLimit records: ${JSON.stringify(records)}`);

   // sort-skip-limit
   records = await T.where({
       "qty": baas.mongodb.gte(0).lt(200),
   }).sort({ "qty": -1 }).skip(1).limit(3).find();
   logger.info(`querySkipLimit records: ${JSON.stringify(records)}`);

   // sort-mul-fields
   records = await T.where({
       "qty": baas.mongodb.gte(0).lt(200),
   }).sort({ "qty": 1, "item": -1 }).find();
   logger.info(`querySkipLimit records: ${JSON.stringify(records)}`);

   records = await T.where({
       "qty": baas.mongodb.gte(0).lt(200),
   }).sort([{ "item": -1 }, { "qty": 1 }]).find();
   logger.info(`querySkipLimit records: ${JSON.stringify(records)}`);

   // sort-skip-limit1
   records = await T.where({
       "qty": baas.mongodb.gte(0),
   }).find();
   logger.info(`querySkipLimit records: ${JSON.stringify(records)}`);
}

async function initDataGroupBy(logger) {
   const T = baas.mongodb.table("goods");
   let records = await T.where().delete();
   logger.info(`initData records: ${JSON.stringify(records)}`);

   res = await T.create([
       {
           "item": "iPhone 4",
           "type": "iPhone",
           "stock": 10,
           "price": 10,
           "quantity": 2,
           "date": new Date("2014-03-01T08:00:00Z")
       },
       {
           "item": "iPhone 5",
           "type": "iPhone",
           "stock": 10,
           "price": 20,
           "quantity": 1,
           "date": new Date("2014-03-01T09:00:00Z")
       },
       {
           "item": "iPhone 6",
           "type": "iPhone",
           "stock": 10,
           "price": 5,
           "quantity": 10,
           "date": new Date("2014-03-15T09:00:00Z")
       },
       {
           "item": "iPhone 7",
           "type": "iPhone",
           "stock": 20,
           "price": 5,
           "quantity": 20,
           "date": new Date("2014-04-04T11:00:00Z")
       },
       {
           "item": "iPhone 8",
           "type": "iPhone",
           "stock": 20,
           "price": 10,
           "quantity": 10,
           "date": new Date("2014-04-04T21:00:00Z")
       },
       {
           "item": "iPhone 9",
           "type": "iPhone",
           "stock": 20,
           "price": 7.5,
           "quantity": 5,
           "date": new Date("2015-06-04T05:00:00Z")
       },
       {
           "item": "MacBook Pro",
           "type": "MacBook",
           "stock": 40,
           "price": 7.5,
           "quantity": 10,
           "date": new Date("2015-09-10T08:00:00Z")
       },
       {
           "item": "MacBook Air",
           "type": "MacBook",
           "stock": 30,
           "price": 10,
           "quantity": 5,
           "date": new Date("2016-02-06T20:00:00Z")
       },
   ]);
   records = await T.save(records);
   logger.info(`initData records: ${JSON.stringify(records)}`);
}

//数据求和与分组求和
async function aggSum(logger) {
   const T = baas.mongodb.table("goods");

   // sum：全部数据求和 & 分组求和
   let records = await T.where().groupBy().sum("stock").find();
   logger.info(`aggSum records: ${JSON.stringify(records)}`);

   records = await T.where().groupBy("type").sum("stock").find();
   logger.info(`aggSum records: ${JSON.stringify(records)}`);
}

//聚合取别名
async function aggAs(logger) {
   const T = baas.mongodb.table("goods");

   // as：重命名
   let records = await T.where()
       .groupBy("type").as("类型")
       .sum("stock").as("stockSum")
       .avg("stock").as("stockAvg")
       .find();
   logger.info(`aggAs records: ${JSON.stringify(records)}`);
}

//数据条数
async function aggNum(logger) {
   const T = baas.mongodb.table("goods");

   // num：求数据条数
   let records = await T.where()
       .groupBy("type")
       .num()
       .find();
   logger.info(`aggNum records: ${JSON.stringify(records)}`);
}


//分组聚合
async function aggGroup(logger) {
   const T = baas.mongodb.table("goods");

   // 表达式分组
   let records = await T
       // 查询一个时间段的数据用于聚合
       .where('date')
       .gte(new Date('2014-01-01'))
       .lt(new Date('2015-01-01'))
       // 开始分组, 分组对象是表达式, 用 $dateToString 操作符将 date 转为年月日形态来分组
       .groupBy({ $dateToString: { format: '%Y-%m-%d', date: '$date' } })
       .as('dateGroup')
       // 聚合对象为表达式 price * quantity, 需要使用 $multiply 操作符执行乘法
       .sum({ $multiply: ['$price', '$quantity'] })
       .as('totalSaleAmount')
       // 聚合对象为字段
       .avg('quantity')
       .as('averageQuantity')
       .num()
       .as('num')
       // 聚合完成后对中间结果查询, 按照 totalSaleAmount 倒序排列
       .where()
       .sort({ totalSaleAmount: -1 })
       .find();
   logger.info(`aggGroup records: ${JSON.stringify(records)}`);
}

//算术操作符
async function aggMultiply(logger) {
  const T = baas.mongodb.table("goods");

  // 算术运算 multiply
  let records = await T.where("date")
    .gte(new Date("2014-01-01")).lt(new Date("2015-01-01"))
    .groupBy("type").as('typeGroup')
    .sum({ $multiply: ['$price', '$quantity'] }).as("totalSaleAmount")
    .find();
  logger.info(`aggMultiply records: ${JSON.stringify(records)}`);
}