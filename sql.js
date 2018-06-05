const Mysql = require('mysql');
// 创建连接
const connection = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'mysql1996',
  database: 'chat',
  useConnectionPooling: true
})
module.exports = connection