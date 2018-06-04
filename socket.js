const Global = require('./global');
const sql = require('./sql');

function timingSend (socket) {
	setInterval(() => {
		socket.emit('messageServer', {noMsg: ''})
	}, 60000)
}

module.exports = function (io) {
	io.on('connection', function(socket){
	  socket.on('messageClient', function(bo){
	    Global.checkUser(sql, bo.cookie).then(rows => {
			socket.broadcast.emit('messageServer', {
				value: bo.value,
				userName: rows[0].userName,
				avater: rows[0].avater
			});
			sql.query(`insert into history_msg values('', '${rows[0].userName}', '${bo.value}', '${rows[0].avater}')`)

			timingSend(socket);
	    })
	    .catch(err => {
	    	let resObj = Global.responseObj();
	    	resObj.errorCode = -1;
	    	socket.emit('messageServer', resObj)
	    })
	  });
	  socket.on('loginIn', function(bo){
		socket.broadcast.emit('loginInServer', bo);
	  });
	  socket.on('loginOut', function(msg){
		socket.broadcast.emit('loginOutServer', bo);
	  });
	});
}