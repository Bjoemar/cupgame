var socket = io();
var result;


$('#btn1').click(function(){
	result = 1;
	socket.emit('game_administrator',result);
});

$('#btn2').click(function(){
	result = 2;
	socket.emit('game_administrator',result);
});

$('#btn3').click(function(){
	result = 3;
	socket.emit('game_administrator',result);
});
