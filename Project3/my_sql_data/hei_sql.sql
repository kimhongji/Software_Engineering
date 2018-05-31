/*  부산이도시에 해당하는 것만 
select * from package where tour_id in
		(select tour_id from tour where city_id in
			(select city_id from city where city_name = "부산" )); 
			*/

/*국내 인것만 			
select * from package where tour_id in
		(select tour_id from tour where country_id in
			(select country_id from country where country_category = "대한민국" )); 
			
*/
/*
select country_category from country where country_id in
	(select country_id from tour where tour_id = '2');
	*/
	
select * from package where tour_id in (select tour_id from tour where country_id in 
(select country_id from country where country_category in 
(select country_category from country where country_id in
(select country_id from tour where tour_id = '9') ))) order by package_cost;