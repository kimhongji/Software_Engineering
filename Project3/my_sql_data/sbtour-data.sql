SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

USE sbtour;

SET AUTOCOMMIT=0;
INSERT INTO city (city_id, city_name)
VALUES (001,'부산'),
 (002,'인천'),
 (003,'대구'),
 (004,'대전'),
 (005,'광주'),
 (006,'수원'),
 (007,'울산'),
 (008,'고양'),
 (009,'용인'),
 (010,'여수'),
 (011,'강릉'),
 (012,'정선');
COMMIT;


SET AUTOCOMMIT=0;
INSERT INTO  country (country_id, country_name)
VALUES (01,'대한민국'),
 (02,'중국'),
 (03,'미국'),
 (04,'캐나다'),
 (05,'영국'),
 (06,'프랑스'),
 (07,'독일'),
 (08,'이탈리아'),
 (09,'러시아'),
 (10,'필리핀'),
 (11,'대만'),
 (12,'베트남');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO tour(tour_id, country_id, city_id)
VALUES (002, 01, 001),
(003, 01, 002),
(004, 01, 003),
(005, 01, 004),
(006, 01, 005),
(007, 01, 006),
(008, 01, 007),
(009, 01, 008),
(010, 01, 009);
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO customer(customer_id, customer_name, customer_phone, customer_email, customer_account )
VALUES ('001', '난소비자1', '010-1234-1234','sell1@gmmail.com', '국민 110-111-000000'),
('002', '난소비자2', '010-1234-5678','sell2@gmmail.com', '국민 110-222-000000');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO seller(seller_id, seller_name, seller_phone, seller_email, seller_account )
VALUES ('001', '난판매자1', '010-1234-1234','sell1@gmmail.com', '국민 110-111-000000'),
('002', '난판매자2', '010-1234-5678','sell2@gmmail.com', '국민 110-222-000000');
COMMIT;

SET AUTOCOMMIT=0;
INSERT INTO package(package_id, seller_id, tour_id, package_name, package_explanation, package_img, package_start, package_arrive, package_term, package_validity, package_cost, package_closed)
VALUES ('부산여행', '001', 002,'부산놀이','다함께 부산을','busan.jpg','2018-05-17', '2018-05-23', '2박3일', 3,30,'2018-05-17');
COMMIT;