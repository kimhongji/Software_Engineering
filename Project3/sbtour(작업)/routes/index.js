var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport'); //login
var session = require('express-session'); //login
var LocalStrategy = require('passport-local').Strategy; //login
var bcrypt = require('bcrypt');
var pool = mysql.createPool({
	connectionLimit: 5,
	host : '127.0.0.1',
	user : 'root',
	database: 'sbtour',
	password: 'toqlc123',
	multipleStatements: true
});

/*====image upload 하기 위해 필요한 모듈=====*/
var fs = require('fs');

let multer = require("multer");

let upload = multer({
	dest : "public/images"
});
function imageUpload(files) {
    fs.readFile(files.path, function (err, data) {
        var filePath = __dirname + '\\../public/img/packages/\\' + files.originalname;
        fs.writeFile(filePath, data, function (error) {
            if (error) {
                throw error;
            } else {
                fs.unlink(files.path, function (removeFileErr) {
                    if (removeFileErr) {
                        throw removeFileErr;
                    }
                });
            }
        });
	});
	return files.originalname;
}
/*=========================================*/

/* GET home page. */
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        if (err) return res.sendStatus(400);
        connection.query('SELECT * FROM package', function(err, rows) {
            if (err) { // packate 정보에 대한 data select
                connection.release();
                return res.send(400, 'couldnt get a connection');
            }
            console.error("err: " + err);
            console.log("rows : " + JSON.stringify(rows));

            if (req.user == undefined)
                var login = 'unlogin';
            else
				var login = 'login';
				

            res.render('index', { title: 'test', rows: rows, login: login });
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
	if (req.user == undefined)
		var login = 'unlogin';
	else
		var login = 'login';
		
	res.render('product',{title: "product", login:login});
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



//-----------------------홍지부분---------------------------

/* GET */ 
router.get('/packages/:name', function(req, res, next) {
	var isKorea = req.params.name;
	if (req.user == undefined)
		var login = 'unlogin';
	else
		var login = 'login';
		

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
			res.render('packages', { title: 'packages', rows: rows, login:login });
			connection.release();
		});
	});
});

/*index에서 날짜데이터 받고 ejs로 건내줌?
여기선 정렬기능 넣지 말*/
router.get('/packages_search', function(req,res,next){
	var city = req.query.city_name;
	var start = req.query.start;
	var end = req.query.end; 
	var data;
	var sqlForSelectList;
	if (req.user == undefined)
            var login = 'unlogin';
    else
			var login = 'login';
				
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		if(city === ""){
			sqlForSelectList = "select * from package where  package_start > ? and package_arrive < ? " ;
			data=[start,end];
		}
		else if(start=== "" || end === ""){
			sqlForSelectList = "select * from package where tour_id in (select tour_id from tour where city_id in (select city_id from city where city_name = ? ))" ;
			data=[city];
		}
		connection.query(sqlForSelectList,data, function (err,rows){
			if(err) console.error("err : " + err);
			console.log("city : "+JSON.stringify(city));
			console.log("start : "+JSON.stringify(start));
			console.log("end : "+JSON.stringify(end));
			console.log("rows : "+JSON.stringify(rows));

			res.render('packages_search', { title: 'packages', rows: rows, login:login });
			connection.release();
		});
	});
});

router.get('/packages_sort/:city', function(req,res,next){
	var city = req.params.city;
	var sort = req.query.sort;
	var sqlForSelectList;
	if (req.user == undefined)
            var login = 'unlogin';
    else
			var login = 'login';

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
			res.render('packages', { title: 'packages', rows: rows, login:login });
			connection.release();
		});
	});
});
//-----------------------홍지부분 끝 ---------------------------
//-------------------------나래부분--------------------------
router.get('/board/:page', function(req, res, next) {
	var page = req.params.page;
	var category = req.query.id;
	var sql = "select * from board order by board_hit DESC;";

	if (req.user == undefined)
            var login = 'unlogin';
    else
			var login = 'login';

	if(category === '1'){
		var Korea = 1;
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
	else {
		var Korea = 1;
	}
	if(Korea ===1){
 		sql += "select * from board";
	}
	else {
		sql += "select * from board where package_id in (select package_id from package where tour_id in (select tour_id from tour where country_id in (select country_id from country where country_category =?)))";
}
	pool.getConnection(function(err,connection){
			if(err) return res.sendStatus(400);
	connection.query(sql,[Korea],function(err,rows){
		if(err){connection.release();
			return res.send(400,'cound not get a connection');
		}
		console.log("err: "+JSON.stringify(category));
		console.log("rows: "+JSON.stringify(rows));
		res.render('board', { title: 'board', rows: rows,page:page, login:login});
		connection.release();
		});
	});
});

router.get('/insertcon', function(req, res, next) {

	if (req.user == undefined)
            var login = 'unlogin';
    else
			var login = 'login';

	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query('SELECT * FROM package', function (err,rows){
			if(err){// packate 정보에 대한 data select
				connection.release();
				return res.send(400,'couldnt get a connection');
			}
			console.error("err: "+err);
			console.log("rows : "+JSON.stringify(rows));

			res.render('insertcon', { title: 'insertcon', rows: rows , login:login});
			connection.release();
		});
	});
});

router.post('/insertcon',  upload.array('img'),  function(req, res, next) {
	var customer_id = req.user.user_id;
	var package_id = req.body.package;
	var board_title = req.body.title;
	var board_start = req.body.start;
	var board_arrive = req.body.arrive;
	var board_content = req.body.content;
	var board_img = req.body.img;
	var board_rating = req.body.star;
	var board_hit = "10";
	var datas = [customer_id,package_id,board_title,board_start,board_arrive,board_content,board_img,board_rating,board_hit];

	var filelength = req.files.length;
	var uploadcnt = 0;


	pool.getConnection(function(err,connection){
		var sqlForInsertBoard = "insert into board(customer_id,package_id,board_title,board_start,board_arrive,board_content,board_img,board_rating,board_hit) values(?,?,?,?,?,?,?,?,?)";
		
		for(var i = 0; i< filelength; i++){
			console.log(filelength);
			filename = imageUpload(req.files[i]);
			uploadcnt +=1;
			console.log("filename" + JSON.stringify(filename));
			console.log("uploadcnt" + JSON.stringify(uploadcnt));
			console.log("datas" + JSON.stringify(datas));
			if(uploadcnt == filelength ){
				connection.query(sqlForInsertBoard,[customer_id,package_id,board_title,board_start,board_arrive,board_content,filename,board_rating,board_hit],function(err,rows){
				if(err)console.error("err :"+err);
				console.log("rows" + JSON.stringify(rows));
				res.redirect('/board/0');
				connection.release();
			});
			}
		}
	});
});

router.get('/contents/:idx', function(req, res, next) {

	if (req.user == undefined)
            var login = 'unlogin';
    else
			var login = 'login';
			
	var idx = req.params.idx;
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query('update board set board_hit =board_hit+1 where board_id=?; SELECT * FROM board where board_id=?; select * from board order by board_hit DESC',[idx,idx],function(err,rows){
			if(err){connection.release();
			return res.send(400,'cound not get a connection');
		}
		console.error("err: "+err);
		console.log("rows: "+JSON.stringify(rows));
		res.render('contents', { title: 'contents', rows: rows, login:login});
		connection.release();
		});
	});
});
router.post('/contents/:idx', function(req, res, next) {
	var idx=req.params.idx;
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query('delete from board where board_id=?',[idx],function(err,rows){
			if(err){connection.release();
			return res.send(400,'cound not get a connection');
		}
		console.error("err: "+err);
		res.redirect('/board/0');
		connection.release();
		});
	});

});

//-----------------------나래부분끝---------------------------


//------------------------지현이부분--------------------------
/*로그인 성공시 사용자 정보를 Session에 저장한다*/
passport.serializeUser(function(user, done) {
    done(null, user);
});

/*인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.*/
passport.deserializeUser(function(user, done) {
    done(null, user); // 여기의 user가 req.user가 됨
});

/*로그인된 유저 판단 로직*/
var isAuthenticated = function(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    console.log('이미 로그인');
    res.redirect('/');
};


/* 로그인 */
passport.use(new LocalStrategy({
    usernameField: 'user_id',
    passwordField: 'user_passwd',
    passReqToCallback: true
}, function(req, user_id, user_passwd, done) {
    console.log('type: ' + req.body.user_type);
    pool.getConnection(function(err, connection) {
        if (err) return res.sendStatus(400);

        if (req.body.user_type == 'customer') { //소비자
            var sqlForLogin = "SELECT * FROM customer WHERE customer_id = ?";
        } else { //판매자
            var sqlForLogin = "SELECT * FROM seller WHERE seller_id = ?";
        }

        connection.query(sqlForLogin, user_id, function(err, result) {
            if (err) {
                console.log('err :' + err);
                return done(false, null);
            } else {
                if (result.length === 0) {
                    console.log('해당 유저가 없습니다');
                    return done(false, null, req.flash('login_msg', '아이디가 존재하지 않습니다.'));
                } else {
                    if (req.body.user_type == 'customer') { //소비자 
                        if (user_passwd != result[0].customer_passwd) {
                            console.log('패스워드가 일치하지 않습니다', req.flash('login_msg', '패스워드가 일치하지 않습니다'));
                            return done(false, null);
                        } else {
                            console.log('로그인 성공');

                            return done(null, {
                                user_id: result[0].customer_id,
                                user_name: result[0].customer_name,
                                user_type: req.body.user_type
                            });
                        }
                    } else {
                        if (user_passwd != result[0].seller_passwd) { //판매자
                            console.log('패스워드가 일치하지 않습니다', req.flash('login_msg', '패스워드가 일치하지 않습니다'));
                            return done(false, null);
                        } else {
                            console.log('로그인 성공');

                            return done(null, {
                                user_id: result[0].seller_id,
                                user_name: result[0].seller_name,
                                user_type: req.body.user_type
                            });
                        }
                    }
                }
            }
        })
    })
}));

/* POST 회원가입 */
router.post('/joinForm', function(req, res, next) {
    var id = req.body.user_id;
    var passwd = req.body.user_passwd;
    var name = req.body.user_name;
    var phone = req.body.user_phone;
    var email = req.body.user_email;
    var account = req.body.user_account1 + " " + req.body.user_account2;

    var datas = [id, passwd, name, phone, email, account];
    console.log(datas);

    pool.getConnection(function(err, connection) {

        if (req.body.user_type == 'customer') { //소비자
            var sqlForInsertBoard = "insert into customer(customer_id, customer_passwd, customer_name, customer_phone, customer_email, customer_account) values(?,?,?,?,?,?)";
        } else { //판매자
            var sqlForInsertBoard = "insert into seller(seller_id, seller_passwd, seller_name, seller_phone, seller_email, seller_account) values(?,?,?,?,?,?)";
        }

        connection.query(sqlForInsertBoard, datas, function(err, rows) {
            if (err) console.error("err: " + err);
            console.log(req.body.user_type + "회원가입 완료");
            console.log("rows: " + JSON.stringify(rows));

            res.redirect('/');
            connection.release();
        });
    });
});

/* GET 로그인 */
router.get('/login', function(req, res, next) {
	
	if (req.user == undefined)
            var login = 'unlogin';
    else{
		var login = 'login';
		res.redirect('/');
	}
    res.render('login', { title: 'login', login: login });
});

/* POST 로그인 */
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    if (req.user != undefined) //로그인이 된 경우
        console.log(req.user.user_id, req.user.user_name, req.user.user_type); //세션 출력
    res.redirect('/login');
})

/* GET 로그아웃 */
router.get('/logout', function(req, res) {
	if (req.user == undefined)
            var login = 'unlogin';
    else{
		var login = 'login';
		req.logout();
	}
	res.redirect('/');		
});

/* GET 회원가입 */
router.get('/joinForm', isAuthenticated, function(req, res, next) { //로그인한 상태에서는 홈으로 바로 이동
	if (req.user == undefined)
        var login = 'unlogin';
    else{
		var login = 'login';
	}
    res.render('joinForm', { title: 'Join Form', login:login });
});
//------------------------지현이부분 끝--------------------------


//------------------------정현우부분-------------------------
router.get('/product/:package_id', function (req, res, next) {
	var package = req.params.package_id;
	if (req.user == undefined)
        var login = 'unlogin';
    else{
		var login = 'login';
	}
	console.log(req.user);
	if (req.user == undefined) {
		res.send('<script type="text/javascript">alert("로그인이 필요합니다!!!!!!!");location.href="/login";</script>');
	}
	else{
		var customer_id = req.user.user_id;
		pool.getConnection(function (err, connection) {
			if (err) return res.sendStatus(400);
			var sqlForSelectList = "select * from package where package_id = ?;" +
				"select * from customer where customer_id = ?;" +
				"select * from seller where seller_id in (select seller_id from package where package_id = ? );";

			connection.query(sqlForSelectList, [package, customer_id, package], function (err, rows) {
				if (err) console.error("err1 : " + err);
				console.log("package_id : " + JSON.stringify(package));
				console.log("rows[0] : " + JSON.stringify(rows[0]));
				console.log("rows[1] : " + JSON.stringify(rows[1]));
				console.log("rows[2] : " + JSON.stringify(rows[2]));
				res.render('product', {
					title: 'package_id',
					rows: rows[0],
					customer: rows[1],
					seller: rows[2],
					login:login
				});
				connection.release();
			});

		});
	}
});
function formatDate(date) { 
	var d = new Date(date), 
	month = '' + (d.getMonth() + 1), 
	day = '' + d.getDate(), 
	year = d.getFullYear(); 
	if (month.length < 2) 
	month = '0' + month; 
	if (day.length < 2) day = '0' + day; 
	return [year, month, day].join('/'); 
}

router.post('/product/:package_id', function (req, res, next) {
	var customer_id = req.user.user_id;
	var package_id = req.body.package_id;
	var pay_id = Math.floor(Math.random() * 32767);//small int
	var reserve_id = Math.floor(Math.random() * 32767); //small int
	var reserve_date = Date();
	var reserve_start = req.body.reserve_start;
	var reserve_arrive = req.body.reserve_arrive;
	var reserve_people = req.body.validity;
	var reserve_price = req.body.reserve_price * reserve_people;
	var reserve_status  = 0;
	reserve_date = formatDate(reserve_date);


	var data1 = [pay_id, reserve_id];
	var data2 = [customer_id, package_id, pay_id, reserve_date, reserve_start, reserve_arrive, reserve_people, reserve_price, reserve_status];
	console.log(data1);
	console.log(data2);
	

	pool.getConnection(function (err, connection) {
		var sqlForInsertBoard1 = "INSERT INTO payment(pay_id, pay_option, pay_status, reserve_id) values(?,0,0,?)";
		var sqlForInsertBoard2 = "INSERT into reservation(customer_id,package_id,pay_id,reserve_date,reserve_start,reserve_arrive,reserve_people,reserve_price,reserve_status) values(?,?,?,?,?,?,?,?,?)";
		connection.query(sqlForInsertBoard1, data1, function (err, rows1) {
			if (err) console.error("err: " + err);
				connection.query(sqlForInsertBoard2, data2, function (err, rows2) {
					if (err) console.error("err: " + err);
					res.redirect('/reservation/'+ customer_id);
					connection.release();
				});
		});
	});
});

router.get('/reservation/:user_id', function (req, res, next) {
	var user_id = req.user.user_id;
	if (req.user == undefined)
        var login = 'unlogin';
    else{
		var login = 'login';
	}
	console.log(user_id);
	pool.getConnection(function (err, connection) {
		if (err) return res.sendStatus(400);
		var sqlForSelectList = 
		"select * from reservation where customer_id = ?;"+
		"select * from package where package_id in(select package_id from reservation where customer_id = ? );";
		connection.query(sqlForSelectList, [user_id, user_id], function (err, rows) {
			if (err) console.error("err1 : " + err);
				console.log("rows[0] : " + JSON.stringify(rows[0]));
				console.log("rows[1] : " + JSON.stringify(rows[1]));
				res.render('reservation', {
					title: 'reservation',
					reservation: rows[0],
					package: rows[1],
					login:login
				});
				connection.release();
		});

	});
});
//------------------------정현우 부분 끝--------------------------
//------------------------홍지(내정보 부분)--------------------------
router.get('/profile_get', function (req, res, next) {
	var user_id;
	var type;
	var sqlForSelectList1;
	var render_;
	
	if (req.user == undefined){
		var login = 'unlogin';
		console.log('로그인 정보가 없습니다. ');
		res.send('<script type="text/javascript">alert("로그인 정보가 없습니다..");location.href="/";</script>');
	}
	else{
		var login = 'login';
		user_id  = req.user.user_id;
		type = req.user.user_type;
	}
		

	if(type === "seller"){
		sqlForSelectList1 = "select * from seller where seller_id = ?;"
		render_ = "profile_seller";
	}
	else{
		sqlForSelectList1 = "select * from customer where customer_id = ?;"
		render_ = "profile";
	}
	pool.getConnection(function (err, connection) {
		if (err) return res.sendStatus(400);
		connection.query(sqlForSelectList1, [user_id], function (err, rows) {
			if (err) console.error("err1 : " + err);
				console.log("rows[0] : " + JSON.stringify(rows));
				res.render(render_, { title: render_ ,rows :rows , login:login});
				connection.release();
		});

	});
});
/* GET 판매등록창 */
router.get('/sale_product', function(req, res, next) { //로그인한 상태에서는 홈으로 바로 이동
	if (req.user == undefined)
		var login = 'unlogin';
	else{
		var login = 'login';
	}	
	var sql = "select * from city;" 
			+"select * from country;";
	pool.getConnection(function (err,connection){
		if(err) return res.sendStatus(400);
		connection.query(sql, function (err,rows){
			if(err){// packate 정보에 대한 data select
				connection.release();
				return res.send(400,'couldnt get a connection');
			} console.error("err: "+err);
			console.log("rows : "+JSON.stringify(rows));

			res.render('sale_product', { title: 'sale_product', rows: rows, login:login });
			connection.release();
		});
	});
});

/* POST 판매등록 PACKAGE INSERT */
router.post('/sale_product', upload.array('img'), function(req, res, next) {
	var user_id;
	var type;
	var render_;
	var tour_id;
	if (req.user != undefined) { //로그인이 된 경우
		console.log(req.user.user_id, req.user.user_name, req.user.user_type); //세션 출력
		user_id  = req.user.user_id;
		type = req.user.user_type;
	}
	var country_name = req.body.country;
	var city_name = req.body.package;
	var package_id = req.body.package_id;
    var package_name = req.body.package_name;
	var package_explan = req.body.package_explan;
	var package_img = req.body.img;
    var start = req.body.start;
    var end = req.body.end;
	var package_term = req.body.package_term;
	var package_validity = req.body.package_validity;
	var package_cost = req.body.package_cost;
	var package_closed = req.body.package_closed;

	var data1 = [country_name, city_name] ;
	
    var filelength = req.files.length;
	var uploadcnt = 0;
	
	
    pool.getConnection(function(err, connection) {
		var sqlforInsertTour = 
					"select tour_id from tour where country_id in (select country_id from country where country_name = ? ) and  city_id in (select city_id from city where city_name=?) ORDER BY tour_id LIMIT 1";
		 var sqlForInsertBoard = "insert into package(package_id, seller_id, tour_id, package_name, package_explanation, package_img ,package_start, package_arrive, package_term, package_validity, package_cost, package_closed, package_hit) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
		
		 for(var i = 0; i< filelength; i++){
			console.log(filelength);
			filename = imageUpload(req.files[i]);
			uploadcnt +=1;
			console.log("filename" + JSON.stringify(filename));
			console.log("uploadcnt" + JSON.stringify(uploadcnt));
		
			if(uploadcnt == filelength ){
				 connection.query(sqlforInsertTour,  data1 , function(err, tour_id) {
				if (err) console.error("err: " + err);
				console.log("tour_id: " + JSON.stringify(tour_id));
				var datas2 = [package_id, user_id, tour_id[0].tour_id, package_name, package_explan, filename ,start, end, package_term, package_validity, package_cost, package_closed, '0'];
				console.log("datas2: " + JSON.stringify(datas2));	
					
					connection.query(sqlForInsertBoard, datas2, function(err, rows) {
      	    		if (err) console.error("err: " + err);
        	   		 console.log("rows: " + JSON.stringify(rows));

					res.redirect('/profile_get');
				});
        	connection.release();
			});
		}
	}
    });
});


router.get('/reservation_my', function (req, res, next) {
	var user_id = req.user.user_id;

	if (req.user == undefined)
		var login = 'unlogin';
	else
		var login = 'login';

	console.log(user_id);
	pool.getConnection(function (err, connection) {
		if (err) return res.sendStatus(400);
		var sqlForSelectList = 
		"select * from reservation where customer_id = ?;"+
		"select * from package where package_id in(select package_id from reservation where customer_id = ? );";
		connection.query(sqlForSelectList, [user_id, user_id], function (err, rows) {
			if (err) console.error("err1 : " + err);
				console.log("rows[0] : " + JSON.stringify(rows[0]));
				console.log("rows[1] : " + JSON.stringify(rows[1]));
				res.render('reservation', {
					title: 'reservation',
					reservation: rows[0],
					package: rows[1],
					login : login,
					user_id: user_id
				});
				connection.release();
		});

	});
});
//router.post()

//------------------------지현(은)는 (판매자의 내정보 부분에서 판매 현황)을 인터셉트했다!--------------------------
/*판매자 MY -> 판매 현황 */
router.get('/selling_product_my', function (req, res, next) {
	var user_id = req.user.user_id;

	if (req.user == undefined)
		var login = 'unlogin';
	else
		var login = 'login';

	console.log(user_id);
	pool.getConnection(function (err, connection) {
		if (err) return res.sendStatus(400);
		var sqlForSelectList = "select * from package where seller_id = ?;";
		connection.query(sqlForSelectList, user_id, function (err, rows) {
			if (err) console.error("err1 : " + err);
				console.log("rows : " + JSON.stringify(rows));
				res.render('selling_product_my', {
					title: 'selling_product_my',
					package: rows,
					login : login,
					user_id: user_id
				});
				connection.release();
		});

	});
});
module.exports = router;
