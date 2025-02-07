/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.response;

public class LikedPetResponse {
	private PetProfile petProfile;
	private UserProfile userProfile;
	public LikedPetResponse(PetProfile petProfile, UserProfile userProfile) {
		super();
		this.petProfile = petProfile;
		this.userProfile = userProfile;
	}
	public LikedPetResponse() {
		super();
	}
	public PetProfile getPetProfile() {
		return petProfile;
	}
	public void setPetProfile(PetProfile petProfile) {
		this.petProfile = petProfile;
	}
	public UserProfile getUserProfile() {
		return userProfile;
	}
	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}
	@Override
	public String toString() {
		return "LikedPetResponse [petProfile=" + petProfile + ", userProfile=" + userProfile + "]";
	}
	
	
}
