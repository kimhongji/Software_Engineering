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
	else if(isKorea === 'sa' ){
		var Korea = "동남아"; //ifelse 로 예외처리
	}
	else if(isKorea === 'china' ){
		var Korea = "중국"; //ifelse 로 예외처리
	} 
	else if(isKorea === 'japan' ){
		var Korea = "일본"; //ifelse 로 예외처리
	} 
	else if(isKorea === 'europe' ){
		var Korea = "유럽"; //ifelse 로 예외처리
	} 
	else if(isKorea === 'hawaii' ){
		var Korea = "미주"; //ifelse 로 예외처리
	} 
	else if(isKorea === 'guam' ){
		var Korea = "남태평양"; //ifelse 로 예외처리
	} 
 

	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		var sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where country_id in (select country_id from country where country_category = ? ))" ;
		connection.query(sqlForSelectList,[Korea], function (err,rows){
			if(err) console.error("err : " + err);

			console.log("isKorea : "+JSON.stringify(Korea));
			console.log("rows : "+JSON.stringify(rows[0]));
			res.render('packages', { title: 'packages', rows: rows });
			connection.release();
		});
	});
});

/*index에서 날짜데이터 받고 ejs로 건내줌?
여기선 정렬기능 넣지 말*/
router.get('/packages_search', function(req,res,next){
	var city = req.query.city_name;
	
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		var sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where city_id in (select city_id from city where city_name = ? ))" ;
		connection.query(sqlForSelectList,[city], function (err,rows){
			if(err) console.error("err : " + err);
			console.log("city : "+JSON.stringify(city));
			console.log("rows : "+JSON.stringify(rows));

			res.render('packages_search', { title: 'packages', rows: rows });
			connection.release();
		});
	});
});

router.get('/packages_sort/:city', function(req,res,next){
	var city = req.params.city;
	var sort = req.query.sort;
	var sqlForSelectList;
	if(sort === 'lowprice')
	{
		sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where country_id in (select country_id from country where country_category in (select country_category from country where country_id in (select country_id from tour where tour_id = ?) ))) order by package_cost" ;
	}
	else if(sort === 'highprice')
	{
		sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where country_id in (select country_id from country where country_category in (select country_category from country where country_id in (select country_id from tour where tour_id = ?) ))) order by package_cost DESC" ;
	}
	else if(sort === 'hit'){
		sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where country_id in (select country_id from country where country_category in (select country_category from country where country_id in (select country_id from tour where tour_id = ?) ))) order by package_hit" ;
	}
	else if(sort === 'named'){
		sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where country_id in (select country_id from country where country_category in (select country_category from country where country_id in (select country_id from tour where tour_id = ?) ))) order by package_id" ;
	}
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query(sqlForSelectList,[city], function (err,rows){
			if(err) console.error("err : " + err);
			console.log("sort : "+JSON.stringify(sort));
			console.log("rows : "+JSON.stringify(rows));
			res.render('packages', { title: 'packages', rows: rows });
			connection.release();
		});
	});
});
//-------------------------나래부분--------------------------
router.get('/board', function(req, res, next) {
	var category = req.query.id;
	if(category === '1'){
		var Korea = "대한민국";
	}
	else if (category === '2'){
		var Korea = "대한민국";
	}
	else if(category === '3' ){
		var Korea = "동남아"; //ifelse 로 예외처리
	}
	else if(category === '4' ){
		var Korea = "중국"; //ifelse 로 예외처리
	} 
	else if(category === '5' ){
		var Korea = "일본"; //ifelse 로 예외처리
	} 
	else if(category === '6' ){
		var Korea = "유럽"; //ifelse 로 예외처리
	} 
	else if(category === '7' ){
		var Korea = "미주"; //ifelse 로 예외처리
	} 
	else if(category === '8' ){
		var Korea = "남태평양"; //ifelse 로 예외처리
	}
	var sql = "select * from board where package_id in (select package_id from package where tour_id in (select tour_id from tour where country_id in (select country_id from country where country_category = ?)))";
	pool.getConnection(function(err,connection){
			if(err) return res.sendStatus(400);
	connection.query(sql, [Korea], function(err,rows){
		if(err){connection.release();
			return res.send(400,'cound not get a connection');
		} 
		console.log("err: "+JSON.stringify(category));
		console.log("rows: "+JSON.stringify(rows));
		res.render('board', { title: 'board', rows: rows});
		connection.release();
		});
	});
});

router.get('/insertcon', function(req, res, next) {
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query('SELECT * FROM package', function (err,rows){
			if(err){// packate 정보에 대한 data select
				connection.release();
				return res.send(400,'couldnt get a connection');
			} 
			console.error("err: "+err);
			console.log("rows : "+JSON.stringify(rows));

			res.render('insertcon', { title: 'insertcon', rows: rows });
			connection.release();
		});
	});
});

router.post('/insertcon', function(req, res, next) {
	var customer_id = "custromer_1";
	var package_id = req.body.package;
	var board_title = req.body.title;
	var board_start = req.body.start;
	var board_arrive = req.body.arrive;
	var board_content = req.body.content;
	var board_img = "busan.jpg";
	var board_rating = req.body.star;
	var board_hit = "10";
	var datas = [customer_id,package_id,board_title,board_start,board_arrive,board_content,board_img,board_rating,board_hit];
	pool.getConnection(function(err,connection){
		var sqlForInsertBoard = "insert into board(customer_id,package_id,board_title,board_start,board_arrive,board_content,board_img,board_rating,board_hit) values(?,?,?,?,?,?,?,?,?)";
		connection.query(sqlForInsertBoard,datas,function(err,rows){
			if(err)console.error("err :"+err);
			console.log("rows" + JSON.stringify(rows));
			res.redirect('/board');
			connection.release();
		});
	});
});

router.get('/contents/:idx', function(req, res, next) {
	var idx = req.params.idx;
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query('SELECT * FROM board where board_id=?',[idx],function(err,rows){
			if(err){connection.release();
			return res.send(400,'cound not get a connection');
		} 
		console.error("err: "+err);
		console.log("rows: "+JSON.stringify(rows));
		res.render('contents', { title: 'contents', rows: rows});
		connection.release();
		});
	});
});
//-------------------------나래부분끝---------------------------


//-------------------------------------------------------------

//router.post()
module.exports = router;
