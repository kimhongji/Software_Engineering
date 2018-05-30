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
INSERT INTO city (city_id, city_name)
VALUES 
 (009,'상하이'),
 (010,'오사카'),
 (011,'도쿄'),
 (012,'벤쿠버'),
 (013,'다낭'),
 (014,'모스크바'),
 (015,'바스코'),
 (016,'런던');
COMMIT;
/*--------------------------------------------------------*/
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
INSERT INTO  country (country_id, country_category, country_name)
VALUES 
 (13, '일본', '일본');
COMMIT;
/*--------------------------------------------------------*/
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
INSERT INTO tour(tour_id, country_id, city_id)
VALUES 
 (008, 02, 009), /*중국-상하이*/
 (009, 13, 010), /*일본-오사카*/
 (010, 13, 011), /*일본-도쿄*/
 (011, 04, 012), /*캐나다-벤쿠버*/
 (012, 09, 014), /*러시아-모스크바*/
 (013, 12, 013); /*베트남-다낭*/
COMMIT;

/*--------------------------------------------------------------------------------------*/

SET AUTOCOMMIT=0;
INSERT INTO admin(admin_id, admin_name, admin_passwd)
VALUES ('admin_1', '난관리자1', '486');
COMMIT;
/*--------------------------------------------------------------------------------------*/
SET AUTOCOMMIT=0;
INSERT INTO customer(customer_id, customer_name, customer_passwd, customer_phone, customer_email, customer_account )
VALUES ('custromer_1', '난소비자1', '486', '010-1234-1234','sell1@gmmail.com', '국민 110-111-000000');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO customer(customer_id, customer_name, customer_passwd, customer_phone, customer_email, customer_account )
VALUES ('custromer_2', '난소비자2', '123', '010-1234-2222','sell2@gmmail.com', '국민 110-222-000000'),
('custromer_3', '난소비자3', '456', '010-1234-3333','sell3@gmmail.com', '국민 110-333-000000'),
('custromer_4', '난소비자4', '789', '010-1234-4444','sell4@gmmail.com', '국민 110-444-000000');
COMMIT;
/*--------------------------------------------------------------------------------------*/
SET AUTOCOMMIT=0;
INSERT INTO seller(seller_id, seller_name, seller_passwd, seller_phone, seller_email, seller_account )
VALUES ('seller_1', '난판매자1', '486', '010-1234-1234','sell1@gmmail.com', '국민 110-111-000000');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO seller(seller_id, seller_name, seller_passwd, seller_phone, seller_email, seller_account )
VALUES ('seller_2', '난판매자2', '123', '010-2222-1234','sell2@gmmail.com', '국민 220-111-000000'),
('seller_3', '난판매자3', '456', '010-3333-1234','sell3@gmmail.com', '국민 330-111-000000'),
('seller_4', '난판매자4', '789', '010-4444-1234','sell4@gmmail.com', '국민 440-111-000000');
COMMIT;
/*--------------------------------------------------------------------------------------*/

SET AUTOCOMMIT=0;
INSERT INTO package(package_id, seller_id, tour_id, package_name, package_explanation, package_img, package_start, package_arrive, package_term, package_validity, package_cost, package_closed, package_hit)
VALUES ('부산여행', '001', 002,'부산놀이','다함께 부산을','busan.jpg','2018/05/17', '2018/05/23', '2박3일', 3, 30, '2018/05/17', 0);
COMMIT;/*날짜, 기간 선택*/


SET AUTOCOMMIT=0;
INSERT INTO package(package_id, seller_id, tour_id, package_name, package_explanation, package_img, package_start, package_arrive, package_term, package_validity, package_cost, package_closed, package_hit)
VALUES 
('상하이여행', 'seller_1', 008,'상하이놀이','다함께 상하이을','sanghae.jpg','2018/05/17', '2018/05/23', '2박3일', 3, 30, '2018/05/17', 0),
('오사카여행', 'seller_2', 009,'오사카놀이','다함께 오사카을','osaka.jpg','2018/06/04', '2018/06/07', '4박3일', 8, 30, '2018/06/01', 0),
('도쿄여행', 'seller_2', 010,'도쿄놀이','다함께 도쿄을','tokyo.jpg','2018/06/12', '2018/06/20', '9박8일', 8, 30, '2018/06/05', 0),
('벤쿠버여행', 'seller_3', 011,'벤쿠버놀이','다함께 벤쿠버을','Vancouver.jpg','2018/07/02', '2018/07/10', '9박8일', 15, 30, '2018/06/30', 0),
('다낭여행', 'seller_4', 013,'다낭놀이','다함께 다낭을','danang.jpg','2018/07/20', '2018/07/25', '6박5일', 12, 30, '2018/07/15', 0);
COMMIT;
