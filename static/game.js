var socket = io();

socket.on('sec',function(seconds){

if (seconds < 10) {
	$('#bet-time').html('00 : 0'+seconds);
}else {
	$('#bet-time').html('00 : '+seconds);
}

if (seconds == 10) {
	$('#loading').css('width','90%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('10 초');

} else if (seconds == 9) {
	$('#loading').css('width','80%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('9 초');

}else if (seconds == 8) {
	$('#loading').css('width','70%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('8 초');

}else if (seconds == 7) {
	$('#loading').css('width','60%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('7 초');

}else if (seconds == 6) {
	$('#loading').css('width','50%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('6 초');

}else if (seconds == 5) {
	$('#loading').css('width','40%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('5 초');

}else if (seconds == 4) {
	$('#loading').css('width','30%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('4 초');

}else if (seconds == 3) {
	$('#loading').css('width','20%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('3 초');

}else if (seconds == 2) {
	$('#loading').css('width','10%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('2 초');

}else if (seconds == 1) {
	$('#loading').css('width','0%')
	$('#loading').css('transition','width 1s linear')
	$('#timer').html('1 초');

}else if (seconds == 59) {
	$('#loading').css('width','100%')
	$('#loading').css('transition','none')
	$('#timer').html('오프닝');

}else if (seconds == 55){
}

})

socket.on('gameData',function(data){ // Galing sa server Gagawin nya each time na ang second is = 1;



 runtimes = 0;
	
 b1pos = 40; 
 b2pos = 310; 
 b3pos = 585; 

 positionA = '#box-object-1'; 
 positionB = '#box-object-2'; 
 positionC = '#box-object-3'; 

 result = 0; 
 resPos = '';

$('#topRounds').html(data.rounds + 1 );
$('.lvl span').html(data.rounds);
$('.hashCode span').html(data.hash);

result = data.result;

// $('.object-position img').hide();
	showKick(); // I shoshow nya yung image;


	setTimeout(function(){ // do this function after 3 seconds
		$('.object-position img').hide();
		// NOTE !! Itatago ang image lahat ni kick para pag gumalaw yung box or change position walang kick na makikita
	},3000);

	setTimeout(function(){ // do this function after 5 seconds
		startAnimation(); // Papagalawin yung box

	},3500);
});



function closeBox() { // Papalitan yung image box-top-body and box-down-body na image+

	setTimeout(function(){ // 0.1 seconds bago nya i hide and i show yung close box

		$('#box-object-1 .box-top-body').hide(); // hide si box-top-body
		$('#box-object-1 .box-down-body').hide(); // hide si box-down-body
		$('#box-object-1 .box-close-body').show(); // papakita yung close box

	},100);

	setTimeout(function(){ // 0.3 seconds bago nya i hide and i show yung close box
		$('#box-object-2 .box-top-body').hide();
		$('#box-object-2 .box-down-body').hide();
		$('#box-object-2 .box-close-body').show();
	},300);

	setTimeout(function(){ // 0.4 seconds bago nya i hide and i show yung close box
		$('#box-object-3 .box-top-body').hide();
		$('#box-object-3 .box-down-body').hide();
		$('#box-object-3 .box-close-body').show();

	},500);


	// NOTE!! Kaya may timeout is para mauuna mag sara yung first box sunod second box and third box
}

function showKick(){
	var decideToshow = Math.floor(Math.random() * 3 ) + 1; // Mag gegenerate sya nang number 1 to 3;

	if (decideToshow == 1 ) { // if 1 ang generated number

		$('.position1 img').first().show(); // left image ni kick and lalabas

			setTimeout(function(){ // mag aantay sya nang half second

				$('.position1 img').animate({ // mag animation sya pababa na tatagal nang 1 seconds
					'bottom' : '-225px',
				},1000);

			},500);

			setTimeout(function(){ // mag aantay sya nang 1 and half second
				$('.position1 img').first().hide();
				$('.position1 img').first().next().show();
			},1500);

			setTimeout(function(){
				$('.position1 img').css({ // mag animation sya pababa na tatagal nang 2 seconds
					'bottom' : '-290px',
				})
			},2000);


			setTimeout(function(){ // Mag aantay nang 2.2 seconds at gagwin yung function na closeBox
				closeBox();
			},2200)

	}else if (decideToshow == 2) { // if 2 ang genrated number
		$('.position2 img').first().show(); // center image ni kick and lalabas

			setTimeout(function(){

				$('.position2 img').animate({
					'bottom' : '-225px',
				},1000);

			},500);		

			setTimeout(function(){
				$('.position2 img').first().hide();
				$('.position2 img').first().next().show();
			},1500);

			setTimeout(function(){
				$('.position2 img').css({
					'bottom' : '-290px',
				})
			},2000);


			setTimeout(function(){
				closeBox();
			},2200)

	}else if (decideToshow == 3){ // if 3 ang genrated number
		$('.position3 img').first().show(); // right image ni kick and lalabas

			setTimeout(function(){

				$('.position3 img').animate({
					'bottom' : '-225px',
				},1000);

			},500);

			setTimeout(function(){
				$('.position3 img').first().hide();
				$('.position3 img').first().next().show();
			},1500);


			setTimeout(function(){
				$('.position3 img').css({
					'bottom' : '-290px',
				})
			},2000);

			setTimeout(function(){
				closeBox();
			},2200)
	}

	// NOTE!! This function is for random kung saan lalabas si kick na itatago;
}

function resetGame(){ // Reset game is for get things to normal;


 // NOTE !! lahat nang variables nag che-change value each time na gagwin yung animation, binalik lang sa dati
	$('.box-top-body').show();
	$('.box-down-body').show();
	$('.box-close-body').hide();

	$('.object-position img').css({
		'bottom' : '1px',
	});

	$('.box-object-1').css({
		'left' : '40',
	})
	$('.box-object-2').css({
		'left' : '310',
	})
	$('.box-object-3').css({
		'left' : '585',
	})

	$('.object-position img').hide();

	// NOTE !! Dahil sa animation nang laro nag bago yung position ang function na to is i seset lang lahat kung ano yung original na position
}

	// Variable of animation
	var runtimes = 0; // Check nya kung ilang beses na nag run yung function na startAnimation
	
	var b1pos = 40; // position nang close box parent na left side
	var b2pos = 310; // position nang close box parent na center side
	var b3pos = 585; // position nang close box parent na right side

	var positionA = '#box-object-1'; // id nang mga parent nang box-images
	var positionB = '#box-object-2'; // id nang mga parent nang box-images
	var positionC = '#box-object-3'; // id nang mga parent nang box-images

	var result; // dito mo manipulate kung ano yung result na lalabas
	var resPos = ''; // position nang result na lalabas left or center or right

	// End Variable of animation

function startAnimation(){ // Codes nang pagpagalaw nang box


	var decideMove = Math.floor(Math.random() * 3) +1; // mag generate nang number between 1 - 3;

	if (decideMove == 1) { // and number na generated is = 1


		$(positionA).animate({
			'left' : b2pos,
		},200); // change position nang left box to center box

		$(positionB).animate({
			'left' : b1pos,
		},200); // change position nang center box to left box

		var pos1 = positionA; // mag set nang variable para sa new position
		var pos2 = positionB; // mag set nang variable para sa new position

		positionA = pos2; // pag palitin yung position ni #box-object-1 at #box-object-2
		positionB = pos1; // pag palitin yung position ni #box-object-2 at #box-object-1

		// !NOTE  need i change ang result so may track kung saan yung box na may laman



	}else if (decideMove == 2) { // and number na generated is = 2

		$(positionB).animate({
			'left' : b3pos,
		},200);
		$(positionC).animate({
			'left' : b2pos,
		},200);

		var pos1 = positionB;
		var pos2 = positionC;

		positionB = pos2;
		positionC = pos1;




	}else if (decideMove == 3) { // and number na generated is = 3
		$(positionA).animate({
			'left' : b3pos,
		},200);
		$(positionC).animate({
			'left' : b1pos,
		},200);

		var pos1 = positionA;
		var pos2 = positionC;

		positionA = pos2;
		positionC = pos1;

	}

	setTimeout(function(){ // Kada 0.3 seconds 
		
		if (runtimes < 20 ) {  // compare yung value ni runtimes kung mas maliit pa sya kay 20
			runtimes++; // pag nag true plus 1 kay runtimes
			
			return startAnimation(); // run nya ulit yung startAnimation
		
		} else { // if runtimes is = 20
			

        
        showResult(); // para lumabas ang result
		setTimeout(function(){
			resetGame(); // resetNa yung game back to normal layour
		},15000)
		}
	},300);

}	




function showResult(){ // 


	$('.box-close-body').hide(); // hide si box na close
	$('.box-top-body').show(); // papakita yung open box
	$('.box-down-body').show();	 // papakita yung open box

	if(result == 1){ // animate yung ulo ni kick pataas bandang left
		$('.position1 img').first().next().show();
		$('.position1 img').css({
		
		'bottom' : '-230px',
	});


	}else if(result == 2){ // animate yung ulo ni kick pataas bandang center
		$('.position2 img').first().next().show();
		$('.position2 img').css({
		
		'bottom' : '-230px',
	});
	}else if (result == 3) { // animate yung ulo ni kick pataas bandang right
		$('.position3 img').first().next().show();
		$('.position3 img').css({
		
		'bottom' : '-230px',
	});
	}

	// NOTE !! show yung result pag katapos nang animation
}
socket.emit('newVisitor');

socket.on('loadData' , function(data){


	$('#topRounds').html(data[0].rounds + 1 );
	$('.lvl span').html(data[0].rounds);
	$('.hashCode span').html(data[0].hash);


});