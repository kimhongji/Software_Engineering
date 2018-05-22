#sbtour 데이터베이스 생성
CREATE SCHEMA sbtour;
use sbtour; 

#----------------------------------------------------------------------------------------------------------------------------------

#국가
CREATE TABLE country (
  country_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, #국가 아이디 (PK)
  country_category VARCHAR(45) NOT NULL,				#국가 범주 (한국 / 중국 / 일본 / 동남아 / 유럽 / 미주 / 남태평양)
  country_name VARCHAR(45) NOT NULL,					#국가 이름
  PRIMARY KEY  (country_id),
  KEY idx_country_name (country_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#도시
CREATE TABLE city (
  city_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,	#도시 아이디 (PK)
  city_name VARCHAR(45) NOT NULL,						#도시 이름
  PRIMARY KEY  (city_id),
  KEY idx_city_name (city_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#국가-도시를 묶은 여행지
CREATE TABLE tour (
  tour_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, #여행지 아이디 (PK)
  country_id SMALLINT UNSIGNED NOT NULL,			 #국가 아이디 (FK)
  city_id SMALLINT UNSIGNED NOT NULL,				 #도시 아이디 (FK)
  PRIMARY KEY  (tour_id),
  KEY idx_country_id (country_id),
  KEY idx_city_id (city_id),
  CONSTRAINT `fk_country_id` FOREIGN KEY (country_id) REFERENCES country (country_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_city_id` FOREIGN KEY (city_id) REFERENCES city (city_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#----------------------------------------------------------------------------------------------------------------------------------

#관리자 
create table admin(
	admin_id VARCHAR(45) NOT NULL, 		#관리자 아이디	 'admin_0' (PK)
    admin_name VARCHAR(45) NOT NULL,	#관리자 이름 	 '관리자'
	admin_passwd VARCHAR(45) NOT NULL, 	#관리자 비밀번호 '486'
    primary key(admin_id),
    KEY idx_admin_name (admin_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#소비자 
create table customer(
	customer_id VARCHAR(45) NOT NULL, 		#소비자 아이디	 'customer_0' (PK)
    customer_name VARCHAR(45) NOT NULL,		#소비자 이름 	 '소비자'
    customer_passwd VARCHAR(45) NOT NULL, 	#소비자 비밀번호 '486'
    customer_phone VARCHAR(45) NOT NULL, 	#소비자 전화번호 '010-0000-0000'
    customer_email VARCHAR(45) NOT NULL, 	#소비자 이메일 	 '*****@naver.com'
    customer_account VARCHAR(45) NOT NULL, 	#소비자 계좌 	 '국민 110-000-000000'
    primary key(customer_id),
    KEY idx_customer_name (customer_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#판매자 
CREATE TABLE seller (
  seller_id VARCHAR(45) NOT NULL, 		#판매자 아이디  'seller_1' (PK)
  seller_name VARCHAR(45) NOT NULL, 	#판매자 이름 	 '판매자'
  seller_passwd VARCHAR(45) NOT NULL, 	#판매자 비밀번호 '486'
  seller_phone VARCHAR(45) NOT NULL, 	#판매자 전화번호 '010-0000-0000'
  seller_email VARCHAR(45) NOT NULL, 	#판매자 이메일   '*****@naver.com'
  seller_account VARCHAR(45) NOT NULL, 	#판매자 계좌    '국민 110-000-000000'
  PRIMARY KEY  (seller_id),
  KEY idx_seller_name (seller_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#----------------------------------------------------------------------------------------------------------------------------------

#여행 패키지 정보
CREATE TABLE package (
  package_id VARCHAR(45) NOT NULL, 				#패키지 아이디 '** 여행' (PK)
  seller_id VARCHAR(45) NOT NULL,				#패키지 판매자 아이디 (FK)
  tour_id SMALLINT UNSIGNED NOT NULL,			#패키지 여행지 아이디 (FK)
  package_name VARCHAR(45) NOT NULL, 		 	#패키지 이름
  package_explanation VARCHAR(150) NOT NULL,	#패키지 설명
  package_img VARCHAR(45) NOT NULL, 			#패키지 이미지
  package_start VARCHAR(45) NOT NULL, 			#패키지 출발일 '2018-05-20'
  package_arrive VARCHAR(45) NOT NULL, 			#패키지 도착일 '2018-05-22'
  package_term VARCHAR(45) NOT NULL, 			#패키지 여행 기간 '2박3일'
  package_validity SMALLINT UNSIGNED NOT NULL, 	#패키지 제한 인원
  package_cost SMALLINT UNSIGNED NOT NULL, 		#패키지 가격
  package_closed VARCHAR(45) NOT NULL, 			#패키지 마감 일자 '2018-05-25'
  package_hit SMALLINT UNSIGNED NOT NULL,		#패키지 조회수
  PRIMARY KEY  (package_id),
  KEY idx_package_name (package_name),
  CONSTRAINT `fk_seller_id` FOREIGN KEY (seller_id) REFERENCES seller (seller_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tour_id` FOREIGN KEY (tour_id) REFERENCES tour (tour_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#----------------------------------------------------------------------------------------------------------------------------------

#결제정보
create table payment(
	pay_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, 	#결제정보 아이디 (PK)
    pay_option varchar(45) not null, 					#결제 옵션 '신용카드'
    pay_status SMALLINT UNSIGNED NOT NULL, 				#결제 상태 (정수로 표현하고 웹에서 받아와서 문자열로 출력 ex: 0 - 결제확인, 1 - 결제취소 등등)
    primary key(pay_id),
    reserve_id  SMALLINT UNSIGNED NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#예약정보
create table reservation(
	reserve_id  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,	#예약정보 아이디 (PK)
	customer_id  VARCHAR(45) NOT NULL, 						#예약 소비자 아이디 (FK)
    package_id VARCHAR(45) NOT NULL,						#예약 패키지 아이디 (FK)
    pay_id SMALLINT UNSIGNED NOT NULL,						#예약 결제정보 (FK)
    reserve_date VARCHAR(45) NOT NULL, 						#예약 날짜 '2015-05-17'
    reserve_start VARCHAR(45) NOT NULL, 					#패키지 출발일 '2015-05-20'
    reserve_arrive VARCHAR(45) NOT NULL, 					#패키지 도착일 '2018-05-22'
    reserve_people SMALLINT UNSIGNED NOT NULL, 				#예약 인원
    reserve_price SMALLINT UNSIGNED NOT NULL,				#예약 가격
    reserve_status SMALLINT UNSIGNED NOT NULL, 				#예약 상태 (정수로 표현하고 웹에서 받아와서 문자열로 출력 ex: 0 - 예약확인, 1 - 예약취소 등등)
    primary key(reserve_id),
    KEY idx_reserve_id (reserve_id),
    CONSTRAINT `fk_package_id` FOREIGN KEY (package_id) REFERENCES package (package_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_pay_id` FOREIGN KEY (pay_id) REFERENCES payment (pay_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_customer_id` FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#----------------------------------------------------------------------------------------------------------------------------------

#게시판
create table board(
	board_id  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,	#게시글 아이디 (PK)
	customer_id  VARCHAR(45) NOT NULL, 						#소비자 아이디 (FK)
    package_id VARCHAR(45) NOT NULL,						#패키지 아이디 (FK)
    board_title  VARCHAR(45) NOT NULL,						#게시글 제목
    board_content MEDIUMTEXT NOT NULL, 						#게시글 내용
    board_img  MEDIUMTEXT NOT NULL,							#게시글 이미지
    board_rating SMALLINT UNSIGNED NOT NULL,				#게시글 평점
    board_hit SMALLINT UNSIGNED NOT NULL,					#게시글 조회수
    primary key(board_id),
    KEY idx_board_id (board_id),
    CONSTRAINT `fk_package_id1` FOREIGN KEY (package_id) REFERENCES package (package_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_customer_id1` FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

set foreign_key_checks=0;

