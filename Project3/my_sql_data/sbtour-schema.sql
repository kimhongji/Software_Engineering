#sbtour 데이터베이스 생성
CREATE SCHEMA sbtour;
use sbtour; 

#국가
CREATE TABLE country (
  country_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  country_name VARCHAR(45) NOT NULL,
  PRIMARY KEY  (country_id),
  KEY idx_country_name (country_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#도시
CREATE TABLE city (
  city_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_name VARCHAR(45) NOT NULL,
  PRIMARY KEY  (city_id),
  KEY idx_city_name (city_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#국가-도시를 묶은 투어
CREATE TABLE tour (
  tour_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  country_id SMALLINT UNSIGNED NOT NULL,
  city_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (tour_id),
  KEY idx_country_id (country_id),
  KEY idx_city_id (city_id),
  CONSTRAINT `fk_country_id` FOREIGN KEY (country_id) REFERENCES country (country_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_city_id` FOREIGN KEY (city_id) REFERENCES city (city_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#판매자
CREATE TABLE seller (
  seller_id VARCHAR(45) NOT NULL, #아이디 '000'
  seller_name VARCHAR(45) NOT NULL, #이름 '판매자'
  seller_phone VARCHAR(45) NOT NULL, #전화번호 '010-0000-0000'
  seller_email VARCHAR(45) NOT NULL, #이메일 '*****@naver.com'
  seller_account VARCHAR(45) NOT NULL, #계좌 '국민 110-000-000000'
  PRIMARY KEY  (seller_id),
  KEY idx_seller_name (seller_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#여행 패키지 정보
CREATE TABLE package (
  package_id VARCHAR(45) NOT NULL, #패키지 아이디 '** 여행'
  seller_id VARCHAR(45) NOT NULL,
  tour_id SMALLINT UNSIGNED NOT NULL,
  package_name VARCHAR(45) NOT NULL, #패키지 이름
  package_explanation VARCHAR(150) NOT NULL, #패키지 설명
  package_img VARCHAR(45) NOT NULL, #패키지 이미지
  package_start VARCHAR(45) NOT NULL, #패키지 출발일 '2018-05-20'
  package_arrive VARCHAR(45) NOT NULL, #패키지 도착일 '2018-05-22'
  package_term VARCHAR(45) NOT NULL, #패키지 여행 기간 '2박3일'
  package_validity SMALLINT UNSIGNED NOT NULL, #??? 요거 모르겠다
  package_cost SMALLINT UNSIGNED NOT NULL, #패키지 가격
  package_closed VARCHAR(45) NOT NULL, #패키지 마감 일자
  PRIMARY KEY  (package_id),
  KEY idx_package_name (package_name),
  CONSTRAINT `fk_seller_id` FOREIGN KEY (seller_id) REFERENCES seller (seller_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tour_id` FOREIGN KEY (tour_id) REFERENCES tour (tour_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#소비자
create table customer(
	customer_id VARCHAR(45) NOT NULL, #아이디 '000'
    customer_name VARCHAR(45) NOT NULL, #이름 '판매자'
    customer_phone VARCHAR(45) NOT NULL, #전화번호 '010-0000-0000'
    customer_email VARCHAR(45) NOT NULL, #이메일 '*****@naver.com'
    customer_account VARCHAR(45) NOT NULL, #계좌 '국민 110-000-000000'
    primary key(customer_id),
    KEY idx_customer_name (customer_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#결제정보
create table payment(
	pay_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    pay_option varchar(45) not null, #결제옵션 '신용카드'
    pay_status varchar(45) not null, #결제상태 '결제확인중'
    primary key(pay_id),
    reserve_id  SMALLINT UNSIGNED NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

#예약정보
create table reservation(
	reserve_id  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    reserve_date VARCHAR(45) NOT NULL, #예약 날짜 '2015-05-17'
    reserve_start VARCHAR(45) NOT NULL, #패키지 출발일 '2015-05-20'
    reserve_arrive VARCHAR(45) NOT NULL, #패키지 도착일 '2018-05-22'
    reserve_people SMALLINT UNSIGNED NOT NULL, #예약 인원
    reserve_price SMALLINT UNSIGNED NOT NULL, #예약 가격
    reserve_status SMALLINT UNSIGNED NOT NULL, #??? 예약 상태
    customer_id  VARCHAR(45) NOT NULL, 
    package_id VARCHAR(45) NOT NULL,
    pay_id SMALLINT UNSIGNED NOT NULL,
    primary key(reserve_id),
    KEY idx_reserve_id (reserve_id),
    CONSTRAINT `fk_package_id` FOREIGN KEY (package_id) REFERENCES package (package_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_pay_id` FOREIGN KEY (pay_id) REFERENCES payment (pay_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_customer_id` FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

set foreign_key_checks=0;

