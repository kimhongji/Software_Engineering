var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 5,
	host : '127.0.0.1',
	user : 'root',
	database: 'sbtour',
	password: 'toqlc123'
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


/* GET */ 
router.get('/packages/:name', function(req, res, next) {
	var isKorea = req.params.name;

	if (isKorea === 'korea'){
		var Korea = "대한민국";
	} 
	else{
		var Korea = "일본"; //ifelse 로 예외처리
	} 

	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		var sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where country_id in (select country_id from country where country_category = ? ))" ;
		connection.query(sqlForSelectList,[Korea], function (err,rows){
			if(err) console.error("err : " + err);

			console.log("isKorea : "+JSON.stringify(Korea));
			console.log("rows : "+JSON.stringify(rows[0]));
			res.render('packages', { title: 'korea package', rows: rows });
			connection.release();
		});
	});
});

/**/
router.get('/packages_search', function(req,res,next){
	var city = req.query.city_name;
	
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		var sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where city_id in (select city_id from city where city_name = ? ))" ;
		connection.query(sqlForSelectList,[city], function (err,rows){
			if(err) console.error("err : " + err);
			console.log("city : "+JSON.stringify(city));
			console.log("rows : "+JSON.stringify(rows));

			res.render('packages_search', { title: 'korea package', rows: rows });
			connection.release();
		});
	});
});

//-------------------------------------------------------------

//router.post()
module.exports = router;
