package com.petpal.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PetPalSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetPalSpringApplication.class, args);

		
		System.out.println("SpringBoot Tomcat server running");
	}

}
