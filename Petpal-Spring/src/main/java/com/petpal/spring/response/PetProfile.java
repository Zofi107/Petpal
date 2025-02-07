/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.response;

import java.util.List;

import com.petpal.spring.entity.Personality;
import com.petpal.spring.entity.Pet;
import com.petpal.spring.entity.Picture;

public class PetProfile {

	private Pet aPet;
	private List<Personality> traits;
	private Picture picture;
	
	public PetProfile() {
		
		super();
		
	}

	public PetProfile(Pet aPet, List<Personality> traits, Picture picture) {
		
		super();
		this.aPet = aPet;
		this.traits = traits;
		this.picture = picture;
		
	}

	public Pet getaPet() {
		return aPet;
	}

	public void setaPet(Pet aPet) {
		this.aPet = aPet;
	}

	public List<Personality> getTraits() {
		return traits;
	}

	public void setTraits(List<Personality> traits) {
		this.traits = traits;
	}

	public Picture getPicture() {
		return picture;
	}

	public void setPicture(Picture picture) {
		this.picture = picture;
	}

	@Override
	public String toString() {
		return "PetProfile [aPet=" + aPet + ", traits=" + traits + ", picture=" + picture + "]";
	}

}
