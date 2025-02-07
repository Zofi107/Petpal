/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.petpal.spring.entity.Pet;
import com.petpal.spring.request.PetCreateRequest;
import com.petpal.spring.request.PetUpdateRequest;
import com.petpal.spring.response.LikedPetResponse;
import com.petpal.spring.response.PetProfile;
import com.petpal.spring.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@CrossOrigin(origins = { "http://localhost:3000", "http://969101-capstone-petpal.s3-website.us-east-2.amazonaws.com", "*" })
@RestController
@RequestMapping("/pets")
public class PetController {
	
	@Autowired
	private PetService petService;
	
	/*
	 * Pet
	 */
	
	/**
	 * Read all Pets after filtering by preference for a user
	 * @param userId
	 * @return
	 * @throws JsonProcessingException 
	 * @throws JsonMappingException 
	 */
	
	@GetMapping(value = "/getFilteredPets/{userId}", produces = "application/json") 
	public ResponseEntity<List<LikedPetResponse>> getFilteredPets(@PathVariable Long userId) throws JsonMappingException, JsonProcessingException {
		
		return ResponseEntity.ok(petService.getFilteredPets(userId));
		
	}
	
	/**
	 * Read all Pets
	 * @param 
	 * @return profiles of pets and their users
	 */
	
	@GetMapping(value = "/getAllPets/{userId}", produces = "application/json") 
	public ResponseEntity<List<LikedPetResponse>> getAllPets(@PathVariable Long userId) {
		
		return ResponseEntity.ok(petService.getAllPets(userId));
		
	}
	
	/**
	 * Read all Pets of a user
	 * @param userId
	 * @return profiles of all pets of a user
	 */
	
	@GetMapping(value = "/getPetsOfUser/{ownerId}", produces = "application/json") // gets all pets for a user in the profile page
	public ResponseEntity<List<PetProfile>> getAllPetsOfAUser(@PathVariable Long ownerId) {
		
		return ResponseEntity.ok(petService.getAllPetsOfAUser(ownerId));
		
	}
	
	/**
	 * Read the profile of a pet by pet id
	 * @param userId
	 * @return profile of a pet
	 */
	
	@GetMapping(value = "/getPetProfile/{petId}", produces = "application/json") // gets selected Pet Profile for the profile page
	public ResponseEntity<PetProfile> getPetById(@PathVariable Long petId) {
		
		return ResponseEntity.ok(petService.getPetById(petId));
		
	}
	
	/**
	 * Create a Pet along with its attributes
	 * @param petInputDTO
	 * @return the created pet
	 */
	
	@PostMapping(value = "/createPet", produces = "application/json") // creates a pet and a trait record of that pet,returns the pet object, needs the pet profile fields and the array of traits
	public ResponseEntity<Pet> createPet(@RequestBody PetCreateRequest petCreateRequest) {

		return ResponseEntity.ok(petService.createPet(petCreateRequest));

	}
	
	/**
	 * Updating a Pet profile by the pet id
	 * @param pU
	 * @param petId
	 * @return
	 */
	
	@PutMapping(value = "/updatePet/{petId}", produces = "application/json")
	public ResponseEntity<?> updatePet(@PathVariable Long petId,@RequestBody PetUpdateRequest pU) {
		
		return ResponseEntity.ok(petService.updatePet(pU, petId));
		
	}
	
	/**
	 * Delete a Pet and its associated attributes
	 * @param petId
	 * @return
	 */
	
	@DeleteMapping(value = "/deletePet/{petId}")
	public ResponseEntity<String> deletePet(@PathVariable Long petId) {
		
		return ResponseEntity.ok(petService.deletePet(petId));
		
	}
	
}
