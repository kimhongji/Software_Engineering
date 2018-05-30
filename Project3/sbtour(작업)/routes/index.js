var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 5,
	host : '127.0.0.1',
	user : 'root',
	database: 'sbtour',
	password: '123321123'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query('SELECT * FROM package', function (err,rows){
			if(err){// packate 정보에 대한 data select
				connection.release();
				return res.send(400,'couldnt get a connection');
			} console.error("err: "+err);
			console.log("rows : "+JSON.stringify(rows));

			res.render('index', { title: 'test', rows: rows });
			connection.release();
		});
	});
});

//----------------------Get route define -----------------------
//각 get 마다 필요한 query 문으로 data select 해서 가져와서 출력 ex)get '/' 함수

/* GET korea 여행 home */
router.get('/board', function(req, res, next) {
	pool.getConnection(function(err,connection){
		if(err) return res.sendStatus(400);
		connection.query('SELECT * FROM board', function(err,rows){
			if(err){connection.release();
				return res.send(400,'could not get a connection');
			} console.error("err: "+err);
			console.log("rows: "+JSON.stringify(rows));
			res.render('board',{title:'board',rows: rows});
			connection.release();
		});
	});
});

router.get('/korea', function(req, res, next) {
	res.render('korea',{title: "국내여행"});
});

/* GET oversea 여행 home */
router.get('/oversea', function(req, res, next) {
	res.render('oversea',{title: "해외여행"});
});

/* GET */
router.get('/blog-single', function(req, res, next) {
	res.render('blog-single',{title: "blog-single"});
});

/* GET  */
router.get('/blog-home', function(req, res, next) {
	res.render('blog-home',{title: "blog-home"});
});

/* GET  */
router.get('/about', function(req, res, next) {
	res.render('about',{title: "about"});
});

/* GET  */
router.get('/product', function(req, res, next) {
	res.render('product',{title: "product"});
});

/* GET  */
router.get('/element', function(req, res, next) {
	res.render('element',{title: "element"});
});

/* GET  */
router.get('/contact', function(req, res, next) {
	res.render('contact',{title: "contact"});
});

/* GET  */
router.get('/insurance', function(req, res, next) {
	res.render('insurance',{title: "insurance"});
});

//-------------------------------------------------------------
module.exports = router;
