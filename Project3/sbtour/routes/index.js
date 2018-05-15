var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 5,
	host : '서버 ip로 ',
	user : 'root',
	database: '바꾸기',
	password: '서버 바꾸기'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query('SELECT * FROM board', function (err,rows){
			if(err){
				connection.release();
				return res.send(400,'couldnt get a connection');
			} console.error("err: "+err);
			console.log("rows : "+JSON.stringify(rows));

			res.render('index', { title: 'test', rows: rows });
			connection.release();
		});
	});
  
});

module.exports = router;
