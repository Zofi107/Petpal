/**
 * @author Aninda Ahsan (969098)
 */

package com.petpal.spring.request;

import jakarta.annotation.Nonnull;

public class PetUpdateRequest {
	
	@Nonnull
	private String name;
	@Nonnull
	private int age;
	@Nonnull
	private boolean neutered;
	@Nonnull
	private boolean up_to_date;
	@Nonnull
	private String description;
	
	public PetUpdateRequest(String name, int age, boolean neutered, boolean up_to_date, String description) {
		super();
		this.name = name;
		this.age = age;
		this.neutered = neutered;
		this.up_to_date = up_to_date;
		this.description = description;
	}
	
	public PetUpdateRequest() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public boolean isNeutered() {
		return neutered;
	}

	public void setNeutered(boolean neutered) {
		this.neutered = neutered;
	}

	public boolean isUp_to_date() {
		return up_to_date;
	}

	public void setUp_to_date(boolean up_to_date) {
		this.up_to_date = up_to_date;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "PetUpdateRequest [name=" + name + ", age=" + age + ", neutered=" + neutered + ", up_to_date="
				+ up_to_date + ", description=" + description + "]";
	}

}
