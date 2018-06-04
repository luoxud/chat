'use strict';

module.exports = {
	random: function(max) {
		return (Math.random() * max).toFixed(0)
	},
	randomToken: function (num) {
		var filed = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9],
			token = ''
		for (var i = 0; i < num; i++) {
			token += filed[Number(this.random(34))];
		}
		return token.toLocaleUpperCase();
	},
	checkLogin: function (connection, token) {
		function isLogin () {
			return new Promise((resolve, reject) => {
				connection.query(`SELECT * FROM blog_login where token='${token}'`, (err, rows) => {
					if (err) return console.log(err);
					resolve(rows)
				})
			})
		}
		return isLogin();
	},
	formatDate: function (dateObj) {
		if (!dateObj && dateObj instanceof Date === false) return '';
		var curDateObj = new Date(),
			curYear = curDateObj.getFullYear(),
			curMonth = curDateObj.getMonth() + 1,
			curDate = curDateObj.getDate()
		if (dateObj.getFullYear() === curYear) {
			if (dateObj.getMonth() + 1 === curMonth) {
				if (dateObj.getDate() === curDate) {
					return '今天'
				}
				if (dateObj.getDate() === curDate - 1) {
					return '1天前'
				}
				if (dateObj.getDate() === curDate - 2) {
					return '2天前'
				}
			}
		}
		return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
	},
	responseObj: function () {
		return {
			errorCode: 0,
			errorMessage: '',
			data: null
		}
	},
	checkUser: function (sql, token) {
		let promise = new Promise((resolve, reject) => {
			// token不存在
			if (!token) {
				return reject(error);
			} else {
				sql.query(`SELECT * from temporary_users where token='${token}'`, (err, rows) => {
					if (err) return console.log(err);
					if (rows.length === 0) {
						return reject(err);
					} else {
						return resolve(rows);
					}
				})
			}
		})
		return promise;
	}
}