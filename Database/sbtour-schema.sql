CREATE SCHEMA sbtour;
use sbtour; 

CREATE TABLE contury (
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
  CONSTRAINT `fk_country_id` FOREIGN KEY (country_id) REFERENCES contury (country_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_city_id` FOREIGN KEY (city_id) REFERENCES city (city_id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE seller (
  seller_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  seller_name VARCHAR(45) NOT NULL,
  seller_phone SMALLINT UNSIGNED NOT NULL,
  seller_email SMALLINT UNSIGNED NOT NULL,
  seller_account SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (seller_id),
  KEY idx_seller_name (seller_name)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE package (
  package_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  seller_id SMALLINT UNSIGNED NOT NULL,
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