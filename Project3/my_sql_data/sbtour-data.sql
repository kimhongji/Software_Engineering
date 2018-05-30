SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

USE sbtour;

SET AUTOCOMMIT=0;
INSERT INTO city (city_id, city_name)
VALUES 
 (001,'서울'),
 (002,'부산'),
 (003,'대구'),
 (004,'인천'),
 (005,'광주'),
 (006,'대전'),
 (007,'울산'),
 (008,'제주');
COMMIT;


SET AUTOCOMMIT=0;
INSERT INTO  country (country_id, country_category, country_name)
VALUES 
 (01, '대한민국', '대한민국'),
 (02, '중국', '중국'),
 (03, '미주', '미국'),
 (04, '미주', '캐나다'),
 (05, '유럽', '영국'),
 (06, '유럽', '프랑스'),
 (07, '유럽', '독일'),
 (08, '유럽', '이탈리아'),
 (09, '유럽', '러시아'),
 (10, '동남아', '필리핀'),
 (11, '동남아', '대만'),
 (12, '동남아', '베트남');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO tour(tour_id, country_id, city_id)
VALUES 
 (001, 01, 001),
 (002, 01, 002),
 (003, 01, 003),
 (004, 01, 004),
 (005, 01, 005),
 (006, 01, 006),
 (007, 01, 007);
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO admin(admin_id, admin_name, admin_passwd)
VALUES ('admin_1', '난관리자1', '486');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO customer(customer_id, customer_name, customer_passwd, customer_phone, customer_email, customer_account )
VALUES ('custromer_1', '난소비자1', '486', '010-1234-1234','sell1@gmmail.com', '국민 110-111-000000');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO seller(seller_id, seller_name, seller_passwd, seller_phone, seller_email, seller_account )
VALUES ('seller_1', '난판매자1', '486', '010-1234-1234','sell1@gmmail.com', '국민 110-111-000000');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO package(package_id, seller_id, tour_id, package_name, package_explanation, package_img, package_start, package_arrive, package_term, package_validity, package_cost, package_closed, package_hit)
VALUES ('부산여행', '001', 002,'부산놀이','다함께 부산을','busan.jpg','2018/05/17', '2018/05/23', '2박3일', 3, 30, '2018/05/17', 0);
COMMIT;