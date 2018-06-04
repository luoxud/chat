'use strict';

const express = require('express');
const router = express.Router();
const Global = require('./global');
const sql = require('./sql');
const cookieParser = require('cookie-parser');

router.use(cookieParser())

router.get('/', function(req, res){
  res.sendFile(__dirname + '/temp/app.html');
});

/**
* 查询用户是否失效
*/
router.get('/checkUser', (req, res) => {
	let cookie_token = req.cookies.startToken;

	let resObj = Global.responseObj();
	
	Global.checkUser(sql, cookie_token).then(rows => {
		// console.log('成功')
		resObj.data = rows[0];
		res.send(resObj)
	}).catch(err => {
		// console.log('失效')
		resObj.errorCode = -1;
		res.send(resObj)
	})

})

/* 创建用户 */
router.get('/startChat', (req, res) => {
	// console.log(req.query);
	// error
	// let resObj = new responseObj();

	let token = Global.randomToken(16);
	let { userId, userName, avater} = req.query
	res.cookie('startToken', token, { maxAge: 86400000})

	sql.query(`insert into temporary_users values('${userId}', '${userName}', '${token}', '${avater}')`, (err, rows) => {
		let resObj = Global.responseObj();
		resObj.data = req.query;
		res.send(resObj)
	})
})

/* 获取历史记录 */
router.get('/getHistory', (req, res) => {
	sql.query(`SELECT * from history_msg`, (err, rows) => {
		if(err) return console.log(err);
		let resObj = Global.responseObj();
		resObj.data = rows;
		res.send(resObj);
	})
})

module.exports = router;