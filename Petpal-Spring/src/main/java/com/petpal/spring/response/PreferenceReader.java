package com.petpal.spring.response;

public class PreferenceReader {
	
	private Long id;
	private String type;
	private String breed;
	private String age;
	private String gender;
	private boolean neutered;
	private Long userId;
	public PreferenceReader() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PreferenceReader(Long id, String type, String breed, String age, String gender, boolean neutered,
			Long userId) {
		super();
		this.id = id;
		this.type = type;
		this.breed = breed;
		this.age = age;
		this.gender = gender;
		this.neutered = neutered;
		this.userId = userId;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getBreed() {
		return breed;
	}
	public void setBreed(String breed) {
		this.breed = breed;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
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
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		return "PreferenceReader [id=" + id + ", type=" + type + ", breed=" + breed + ", age=" + age + ", gender="
				+ gender + ", neutered=" + neutered + ", userId=" + userId + "]";
	}
	
}
