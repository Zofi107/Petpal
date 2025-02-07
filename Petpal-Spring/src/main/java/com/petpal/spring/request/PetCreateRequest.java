/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.request;

import java.util.List;

import jakarta.annotation.Nonnull;

public class PetCreateRequest {
	
	@Nonnull
	private Long owner_id;
	@Nonnull
	private String name;
	@Nonnull
	private String species;
	@Nonnull
	private String breed;
	@Nonnull
	private int age;
	@Nonnull
	private String gender;
	@Nonnull
	private boolean neutered;
	@Nonnull
	private boolean up_to_date;
	@Nonnull
	private String description;
	@Nonnull
	private List<String> traits;
	@Nonnull
	private String image_data; //string instead of File
	
	
	
	public PetCreateRequest() {
		super();
	}
	public PetCreateRequest(Long owner_id, String name, String species, String breed, int age, String gender,
			boolean neutered, boolean up_to_date, String description, List<String> traits, String image_data) {
		super();
		this.owner_id = owner_id;
		this.name = name;
		this.species = species;
		this.breed = breed;
		this.age = age;
		this.gender = gender;
		this.neutered = neutered;
		this.up_to_date = up_to_date;
		this.description = description;
		this.traits = traits;
		this.image_data = image_data;
	}
	@Override
	public String toString() {
		return "PetInputDTO [owner_id=" + owner_id + ", name=" + name + ", species=" + species + ", breed=" + breed
				+ ", age=" + age + ", gender=" + gender + ", neutered=" + neutered + ", up_to_date=" + up_to_date
				+ ", description=" + description + ", traits=" + traits;
	}
	public Long getOwner_id() {
		return owner_id;
	}
	public void setOwner_id(Long owner_id) {
		this.owner_id = owner_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSpecies() {
		return species;
	}
	public void setSpecies(String species) {
		this.species = species;
	}
	public String getBreed() {
		return breed;
	}
	public void setBreed(String breed) {
		this.breed = breed;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
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
	public List<String> getTraits() {
		return traits;
	}
	public void setTraits(List<String> traits) {
		this.traits = traits;
	}
	public String getImage_data() {
		return image_data;
	}
	public void setImage_data(String image_data) {
		this.image_data = image_data;
	}
}
