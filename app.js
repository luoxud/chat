const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const controller = require('./controller');
const Global = require('./global');
const socket = require('./socket')(io);
const cookieParser = require('cookie-parser');
const sql = require('./sql');

app.use(controller)

app.use(express.static('./temp'))

http.listen(80);