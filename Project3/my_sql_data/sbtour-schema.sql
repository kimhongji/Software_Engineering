CREATE SCHEMA sbtour;
use sbtour; 

CREATE TABLE country (
  country_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  country_name VARCHAR(45) NOT NULL,
  PRIMARY KEY  (country_id),
  KEY idx_country_name (country_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE city (
  city_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  city_name VARCHAR(45) NOT NULL,
  PRIMARY KEY  (city_id),
  KEY idx_city_name (city_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

CREATE TABLE seller (
  seller_id VARCHAR(45) NOT NULL,
  seller_name VARCHAR(45) NOT NULL,
  seller_phone SMALLINT UNSIGNED NOT NULL,
  seller_email SMALLINT UNSIGNED NOT NULL,
  seller_account SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (seller_id),
  KEY idx_seller_name (seller_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE package (
  package_id VARCHAR(45) NOT NULL,
  seller_id VARCHAR(45) NOT NULL,
  tour_id SMALLINT UNSIGNED NOT NULL,
  package_name VARCHAR(45) NOT NULL,
  package_explanation VARCHAR(150) NOT NULL,
  package_img VARCHAR(45) NOT NULL,
  package_term VARCHAR(45) NOT NULL,
  package_validity SMALLINT UNSIGNED NOT NULL,
  package_cost SMALLINT UNSIGNED NOT NULL,
  package_closed VARCHAR(45) NOT NULL,
  PRIMARY KEY  (package_id),
  KEY idx_package_name (package_name),
  CONSTRAINT `fk_seller_id` FOREIGN KEY (seller_id) REFERENCES seller (seller_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tour_id` FOREIGN KEY (tour_id) REFERENCES tour (tour_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table customer(
	customer_id VARCHAR(45) NOT NULL,
    customer_name VARCHAR(50) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    customer_email VARCHAR(30) NOT NULL,
    customer_account SMALLINT UNSIGNED NOT NULL,
    primary key(customer_id),
    KEY idx_customer_name (customer_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table reservation(
	reserve_id  SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    reserve_date VARCHAR(50) NOT NULL,
    reserve_start VARCHAR(30) NOT NULL,
    reserve_arrive VARCHAR(30) NOT NULL,
    reserve_people SMALLINT UNSIGNED NOT NULL,
    reserve_price SMALLINT UNSIGNED NOT NULL,
    reserve_status SMALLINT UNSIGNED NOT NULL,
    customer_id  VARCHAR(50) NOT NULL,
    package_id VARCHAR(50) NOT NULL,
    pay_id SMALLINT UNSIGNED NOT NULL,
    primary key(reserve_id),
    KEY idx_reserve_id (reserve_id),
    CONSTRAINT `fk_package_id` FOREIGN KEY (package_id) REFERENCES package (package_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_pay_id` FOREIGN KEY (pay_id) REFERENCES payment (pay_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_customer_id` FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table payment(
	pay_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    pay_option varchar(50) not null,
    pay_status varchar(50) not null,
    primary key(pay_id),
    reserve_id  SMALLINT UNSIGNED NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

set foreign_key_checks=0;

