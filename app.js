/**
 * Created by luzhen on 14-11-10.
 */
var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ips={};
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
var onlineNum=0;
io.on('connection', function (socket) {
    console.log(socket.request.connection.remoteAddress);
    ips[socket.request.connection.remoteAddress]=socket.request.connection.remoteAddress;//客户端ip
    //socket.handshake.address 服务端ip
    onlineNum++;
    socket.broadcast.emit('join', {'ip':socket.request.connection.remoteAddress});//广播新用户加入
 
    io.emit('online num',onlineNum);//广播当前在线人数
 
    socket.on('chat message', function (msg) {
        io.emit('chat message', {ip:socket.request.connection.remoteAddress,'content':msg});
        console.log('message: ' + msg);
    });
 
    socket.on('typing', function (msg) {
        socket.broadcast.emit('typing', {'ip':socket.request.connection.remoteAddress});
    });
    socket.on('stop typing', function (msg) {
        socket.broadcast.emit('stop typing', {'ip':socket.request.connection.remoteAddress});
    });
 
    socket.on('disconnect',function(){
        delete ips[socket.request.connection.remoteAddress];
        onlineNum--;
        socket.broadcast.emit('user left', {'ip':socket.request.connection.remoteAddress,'onlineNum':onlineNum});
    });
});
 
http.listen(3000, function () {
    console.log('listening on *:3000');
});