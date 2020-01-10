 // Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

var moment = require('moment');
require('moment-timezone');
moment.tz('Asia/Tokyo');

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var request = require("request");

// var url = "mongodb://localhost:27017/cupgame";
// var url = "mongodb://joemar12:joemar12@ds149206-a0.mlab.com:49206,ds149206-a1.mlab.com:49206/cupgame?replicaSet=rs-ds149206"
// var url = "mongodb+srv://joemar12:joemar12@cupgame-hbe6s.mongodb.net/test?retryWrites=true&w=majority";
// var url = "mongodb+srv://joemar12:joemar12@dollygo-hbe6s.mongodb.net/test?retryWrites=true&w=majority";
var url = "mongodb+srv://joemar12:joemar12@cupgame-oh6ud.mongodb.net/test?retryWrites=true&w=majority"
const crypto = require('crypto');
app.set('port',5000);
var ObjectId = require('mongodb').ObjectID;


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'




app.get('/tableresult',function(request, response){
	response.sendFile(path.join(__dirname, 'tableresult.html'));
})


app.get('/',function(request, response){
	response.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/result',function(request, response){
	response.sendFile(path.join(__dirname, 'result.json'));
})


app.get('/gameResult',function(request, response){
	response.sendFile(path.join(__dirname, 'gameresult.html'));
})

app.get('/0F0D243A1E8960D137D1FB188B9E8B3BB1B300814E4CCD867565508CEE623B87',function(req, res){


	var url = "http://realbet365.net/realbet_access.json"


	request({
	    url: url,
	    json: true
	}, function (error, response, body) {

	    if (!error && response.statusCode === 200) {

	    	var access_list_count = body['ipadd'].length;
	    	var access = false;
	    	var active = true;
	    	var userIp_add = req.headers['x-forwarded-for'].split(',')[0];

	    		// Render All the ip address
	    		for(i = 0; i < access_list_count; i++) 
	    		{
	    			if (body['ipadd'][i]['ip'] == userIp_add) {
	    				access = true;
	    				if (body['ipadd'][i]['status'] == 'INACTIVE') {
	    					active = false;
	    				} 
	    			} 
	    		}
	    		
	    		// If IP address MATCH ACESS
			  	if (access) {
			  		if (active) {
			  			res.sendFile(path.join(__dirname, 'admin.html'));
			  		} else {
			  			res.send('YOUR IP HAS BEEN BLOCK !')
			  		}
			  	} else {
			  		res.json({ status: '404 Not Found' })
			  	}



	        
	    }
	})

})



// server.listen(5000, function() {
//   console.log('Starting server on port 5000');
// });



server.listen(server_port , server_ip_address , function(){
	console.log('Listening on' + server_ip_address + ', port' + server_port);	
})



app.use(express.static('./'));


var gameRes = 0;

function genRes(){

	return Math.floor(Math.random() * 3 ) + 1;

}

gameRes = genRes();

setInterval(function(){
	var seconds = 60 - moment().format('ss');
	io.sockets.emit('sec' ,seconds);


	if(seconds == 1 ){


			var roundx = moment().format('HH') * 60;
			var roundy = moment().format('mm');
			var rounds = (parseInt(roundy)+parseInt(roundx)) + 1;
			var nowdate = moment().format('YYYY-MM-DD');
			var decideToshow = Math.floor(Math.random() * 3 ) + 1;
			var secret_code = rounds+'cupgame'+moment().format('DD-MM-YYY');
			const hash = crypto.createHmac('sha256', secret_code).digest('hex');


			io.sockets.emit('gameData' , {'rounds' : rounds , 'hash' : hash , 'result' : gameRes , 'showPosition' : decideToshow});


			MongoClient.connect(url, {userNewUrlParse : true} , function (err, db) {
					if (err) throw err;

					var dbo = db.db('cupgame');

					var gameObj = {
						nowdate : nowdate,
						rounds : rounds,
						hash : hash,
						gameResult : gameRes,
					}

					if (gameRes == 1) {
						var apires = 'A';
					} else if (gameRes == 2) {
						var apires = 'B';
					} else {
						var apires = 'C';
					}

					var jsonObj = {
						rounds : rounds,
						result : apires,

					}

					var fs = require('fs');
					let data = JSON.stringify(jsonObj);

					setTimeout(function(){
						fs.writeFileSync('result.json' , data);
					},1000);


				setTimeout(function(){
					dbo.collection('game').insertOne(gameObj , function(eer , res){
						if (err) throw err;
						console.log('ROUNDS' + rounds + 'Recorded');
						db.close();
					});
				},1000);

		});


		setTimeout(function(){
		gameRes = genRes();	
		},5000);
			

	}


},1000);


io.on('connection' ,function(socket){


	socket.on('game_administrator',function(data){

		gameRes = data;

	})




	socket.on('newVisitor',function(){
	
		socketid = socket.id;

		MongoClient.connect(url, { userNewUrlParse : true }, function(err , db){
			if (err) throw err;

			var dbo = db.db('cupgame');
			var mysort = {_id : -1};
			dbo.collection('game').find().limit(100).sort(mysort).toArray(function(err , result){
				if (err) throw err;
				socket.emit('loadData' , result);
				db.close();
			})
		})
	})

socket.on('LoadMoreResult',function(data){
	socketid = socket.id;

	MongoClient.connect(url, { userNewUrlParse : true}, function(err,db){
		if (err) throw err;
		var dbo = db.db('cupgame');
		var mysort = {_id : -1};
		var query = {nowdate : data.today_data_date};
		dbo.collection("game").find(query).limit(data.result_limit).sort(mysort).toArray(function(err,result){
			if (err) throw err;
			console.log(result)
			socket.emit('loadData' , result);
			db.close();
		})
	})
})



	socket.on('HistoryClient' , function(date){
		socketid = socket.id;

		MongoClient.connect(url,function(err , db){
			if (err) throw err;
			var dbo = db.db('cupgame');
			var mysort = {_id: -1};
			var query = {nowdate : date.sort};
			dbo.collection('game').find(query).limit(10).sort(mysort).toArray(function(err, result) {
					if(err) throw err;
					socket.emit('loadDatahis' , result);
					db.close();
			});

			dbo.collection('game').find(query).count(function(err, dataCount) {
		  
				      socket.emit('pageCount', dataCount);
				      db.close();
				});			



		})
	})

		socket.on('sortbydate' , function (date){
			socketid = socket.id;
			MongoClient.connect(url, { userNewUrlParse: true } ,  function(err , db) {
				var mysort = {_id: -1};
				var query = {nowdate : date};
				if (err) throw err;
				var dbo = db.db('cupgame');
				dbo.collection('game').find(query).limit(10).sort(mysort).toArray(function(err , result){
					socket.emit('loadsort' , result);

					db.close();
				});
				dbo.collection('game').find(query).count(function(err, dataCount) {
		     
				      socket.emit('pageCount', dataCount);
				      db.close();
			});
		});

	})


	socket.on('searchDatahis',function(data){
		socketid = socket.id;
		MongoClient.connect(url, function(err, db) {

		  if (err) throw err;
		  var dbo = db.db("cupgame");

		  var dbrounds = parseInt(data.roundcode);
		  var dbgameid = ObjectId(data.saltcode);
		  var query = { _id : dbgameid , hash : data.hashcode , rounds : dbrounds};
		   // { $and : [{ hash : data.hashcode } , {rounds : data.roundcode }] };
		  dbo.collection("game").find(query).toArray(function(err, result) {
		  	if (result.length > 0) {
		  		 socket.emit('resdata', result);
		  		
		  	} else {
		    	 socket.emit('invalid');
		  	}
		    db.close();
		  });
		});
	})

		
		

	socket.on('page_control' , function(data){

		socketid = socket.id;

		MongoClient.connect(url, function(err , db){
			var mysort = {_id : -1};
			var query = {nowdate : data.sort};
			if (err) throw err;
			var dbo = db.db('cupgame');
			dbo.collection('game').find(query).skip(data.skip).limit(10).sort(mysort).toArray(function(err, result){
				socket.emit('getpageload', result);
				db.close();

			});
		});

	})
});
