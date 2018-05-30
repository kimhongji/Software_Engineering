select * from package where tour_id in
		(select tour_id from tour where city_id in
			(select city_id from city where city_name = "부산")); 
			
