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
@Table(name = "pet_liked")
public class Like {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "liker_id")
	@Nonnull
	private Long likerId;

	@Column(name = "pet_id")
	@Nonnull
	private Long petId;

	public Like() {
		super();
	}

	public Like(Long likerId, Long petId) {
		super();
		this.likerId = likerId;
		this.petId = petId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLikerId() {
		return likerId;
	}

	public void setLikerId(Long likerId) {
		this.likerId = likerId;
	}

	public Long getPetId() {
		return petId;
	}

	public void setPetId(Long petId) {
		this.petId = petId;
	}

	@Override
	public String toString() {
		return "Like [id=" + id + ", likerId=" + likerId + ", petId=" + petId + "]";
	}
	
}
