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
	password: 'gusdn0',
	multipleStatements: true
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



//-----------------------홍지부분---------------------------

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
//-----------------------홍지부분 끝 ---------------------------
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
	var customer_id = req.user.user_id;
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
    if (req.user != undefined) { //로그인이 된 경우
		
		console.log('이미 로그인');
		res.send('<script type="text/javascript">alert("이미 로그인 되었습니다.");location.href="/";</script>');
    }
    res.render('login', { title: 'login' });
});

/* POST 로그인 */
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
    if (req.user != undefined) //로그인이 된 경우
		console.log(req.user.user_id, req.user.user_name, req.user.user_type); //세션 출력
		res.send('<script type="text/javascript">alert("로그인 되었습니다.");location.href="/";</script>');
    res.redirect('/');
})

/* GET 로그아웃 */
router.get('/logout', function(req, res) {
    if (req.user != undefined) { //로그인된 경우에만
		console.log('로그아웃');
        req.logout(); 
		res.send('<script type="text/javascript">alert("로그아웃 되었습니다");location.href="/";</script>');
    }
});

/* GET 회원가입 */
router.get('/joinForm', isAuthenticated, function(req, res, next) { //로그인한 상태에서는 홈으로 바로 이동
    res.render('joinForm', { title: 'Join Form' });
});
//------------------------지현이부분 끝--------------------------


//------------------------정현우부분-------------------------
router.get('/product/:package_id', function (req, res, next) {
	var package = req.params.package_id;
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
					seller: rows[2]
				});
				connection.release();
			});

		});
	}
});

router.post('/product/:package_id', function (req, res, next) {
	var customer_id = req.user.user_id;
	var package_id = req.body.package_id;
	var pay_id = Math.floor(Math.random() * 32767);//small int
	var reserve_id = Math.floor(Math.random() * 32767); //small int
	var reserve_date = Date.now();
	var reserve_start = req.body.reserve_start;
	var reserve_arrive = req.body.reserve_arrive;
	var reserve_people = req.body.validity;
	var reserve_price = req.body.reserve_price;
	var reserve_status  = 0;

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
	var customer_id = req.params.customer_id;

	pool.getConnection(function (err, connection) {
		if (err) return res.sendStatus(400);
		var sqlForSelectList1 = "select * from customer where customer_id = ?;"
		connection.query(sqlForSelectList1, [user_id], function (err, rows) {
			if (err) console.error("err1 : " + err);
				console.log("rows[0] : " + JSON.stringify(rows[0]));
				res.render('reservation', { title: 'package_id', rows: rows});
				connection.release();
		});

	});
});

//------------------------정현우 부분 끝--------------------------
//router.post()
module.exports = router;
