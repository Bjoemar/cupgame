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

$('#btn1').click(function(){
	$('#btn-btn1').show();
	$('#btn-btn2').hide();
	$('#btn-btn3').hide();
})
$('#btn2').click(function(){
	$('#btn-btn2').show();
	$('#btn-btn1').hide();
	$('#btn-btn3').hide();
})
$('#btn3').click(function(){
	$('#btn-btn3').show();
	$('#btn-btn1').hide();
	$('#btn-btn2').hide();	
}) 