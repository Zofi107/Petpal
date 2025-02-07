package com.petpal.spring.request;

public class UserAPIReader {
	
	private Long id;
	private String email;
	private String first_name;
	private String last_name;
	private String password;
	private String location;
	private String role;
	
	public UserAPIReader(Long id, String email, String first_name, String last_name, String password, String location,
			String role) {
		
		super();
		this.id = id;
		this.email = email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.password = password;
		this.location = location;
		this.role = role;
		
	}
	public UserAPIReader() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "UserFromMs [id=" + id + ", email=" + email + ", first_name=" + first_name + ", last_name=" + last_name
				+ ", password=" + password + ", location=" + location + ", role=" + role + "]";
	}
}
