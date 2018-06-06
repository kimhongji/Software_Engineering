use sbtour;

select * from package where tour_id in
		(select tour_id from tour where city_id in
			(select city_id from city where city_name = "부산" )); 
	

select * from city;

select * from country;

select * from package;

select * from seller;

select * from customer;

select * from package where tour_id in
		(select tour_id from tour where country_id in
			(select country_id from city where country_category = "대한민국" ));