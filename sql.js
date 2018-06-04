const Mysql = require('mysql');
// 创建连接
const connection = Mysql.createConnection({
  // host: '172.31.118.139',
  host: 'localhost',
  user: 'root',
  port: 3306,
  // password: 'Mysql1996!',
  password: 'mysql1996',
  database: 'chat',
  useConnectionPooling: true
})
module.exports = connection