/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="personality")
public class Personality {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="pet_id")
	@Nonnull
	private Long petId;
	@Nonnull
	private String trait;
	
	public Personality(Long petId, String trait) {
		super();
		this.petId = petId;
		this.trait = trait;
	}
	
	public Personality() {
		super();
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPetId() {
		return petId;
	}
	public void setPetId(Long petId) {
		this.petId = petId;
	}
	public String getTrait() {
		return trait;
	}
	public void setPersonalityTraits(String trait) {
		this.trait = trait;
	}
	@Override
	public String toString() {
		return "Personality [id=" + id + ", petId=" + petId + ", personalityTraits=" + trait + "]";
	}
	
	
}
