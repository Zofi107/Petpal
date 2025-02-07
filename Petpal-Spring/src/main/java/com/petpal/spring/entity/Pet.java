/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.entity;

import com.petpal.spring.request.PetCreateRequest;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="pet")
public class Pet {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="owner_id")
	@Nonnull
	private Long ownerId;
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

	public Pet() {
		super();
	}
	public Pet(Long ownerId, String name, String species, String breed, int age, String gender, boolean neutered,
			boolean up_to_date, String description) {
		
		super();
		this.ownerId = ownerId;
		this.name = name;
		this.species = species;
		this.breed = breed;
		this.age = age;
		this.gender = gender;
		this.neutered = neutered;
		this.up_to_date = up_to_date;
		this.description = description;
		
	}
	public Pet(PetCreateRequest pC) {
		
		this.setOwner_id(pC.getOwner_id());
		this.setName(pC.getName());
		this.setName(pC.getName());
		this.setSpecies(pC.getSpecies());
		this.setBreed(pC.getBreed());
		this.setAge(pC.getAge());
		this.setGender(pC.getGender());
		this.setNeutered(pC.isNeutered());
		this.setUp_to_date(pC.isUp_to_date());
		this.setDescription(pC.getDescription());
		
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOwner_id() {
		return ownerId;
	}

	public void setOwner_id(Long owner_id) {
		this.ownerId = owner_id;
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

	public boolean getNeutered() {
		return neutered;
	}

	public void setNeutered(boolean neutered) {
		this.neutered = neutered;
	}

	public boolean getUp_to_date() {
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
		return "Pet [id=" + id + ", owner_id=" + ownerId + ", name=" + name + ", species=" + species + ", breed="
				+ breed + ", age=" + age + ", gender=" + gender + ", neutered=" + neutered + ", up_to_date="
				+ up_to_date + ", description=" + description + "]";
	}

}