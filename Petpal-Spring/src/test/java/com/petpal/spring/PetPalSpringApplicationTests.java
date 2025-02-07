package com.petpal.spring;


import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.petpal.spring.entity.Preference;


@SpringBootTest
class PetPalSpringApplicationTests {
	
	@Autowired
	privat PreferenceRepo preferenceRepo; 
	
	@Test
	void contextLoads() {

	}
	@Test
	public void testPref() {
		Preference p = preferenceRepo.findByUid(170L);
		System.out.println(p.getBreed());
	}

}
