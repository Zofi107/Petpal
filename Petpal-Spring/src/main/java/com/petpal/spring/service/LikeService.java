/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.petpal.spring.entity.Like;
import com.petpal.spring.entity.Pet;
import com.petpal.spring.repo.LikeRepository;
import com.petpal.spring.repo.PersonalityRepository;
import com.petpal.spring.repo.PetRepository;
import com.petpal.spring.repo.PictureRepository;
import com.petpal.spring.request.UserAPIReader;
import com.petpal.spring.response.LikedPetResponse;
import com.petpal.spring.response.PetProfile;
import com.petpal.spring.response.UserProfile;

@Service
public class LikeService {

	@Autowired
	private LikeRepository likesRepository;
	@Autowired
	private PetRepository petsRepository;
	@Autowired
	private PictureRepository pictureRepo;
	@Autowired
	private PersonalityRepository personalityRepo;
	
	private String userUrl = "http://969100-petpal-userservice-env.eba-dgjhss32.us-east-2.elasticbeanstalk.com/";


	/**
	 * Read all Pet and User profile liked by the user
	 * 
	 * @param user Id
	 * @return
	 */

	public List<LikedPetResponse> getAllPetsLikedByAUser(Long userId) {

		/*
		 * getting all likes of a user from the pet_liked table
		 */
		List<Like> allLikesByAUser = likesRepository.findByLikerId(userId);

		List<LikedPetResponse> allLikedPetsOfUser = new ArrayList<>();

		allLikesByAUser.forEach(like -> {

			UserAPIReader user;

			try {

				Long petId = like.getPetId();

				Pet pet = petsRepository.findById(petId).get();

				user = readUser(pet);

				allLikedPetsOfUser.add(createResponse(pet,user));

			} catch (JsonMappingException e) {

				e.printStackTrace();

			} catch (JsonProcessingException e) {

				e.printStackTrace();

			}

		});

		return allLikedPetsOfUser;

	}

	/**
	 * Create a Like - A pet liked by a user
	 * 
	 * @param liker_id
	 * @param pet_id
	 * @return
	 */

	public Like createLike(Long liker_id, Long pet_id) {

		Optional<Like> userLike = likesRepository.findByLikerIdAndPetId(liker_id, pet_id);

		if (!userLike.isPresent()) {

			Like like = new Like();
			like.setLikerId(liker_id);
			like.setPetId(pet_id);

			Like savedLike = likesRepository.save(like);

			return savedLike;
		}

		return null; 
	}

	/**
	 * Delete a Like of a user
	 * 
	 * @param liker_id
	 * @param pet_id
	 * @return
	 */

	public String deleteLike(Long liker_id, Long pet_id) {

		Like like = likesRepository.findByLikerIdAndPetId(liker_id, pet_id).orElseThrow();

		likesRepository.deleteById(like.getId());

		return "Like has been removed successfully";
	}
	
	public LikedPetResponse createResponse(Pet pet, UserAPIReader user) {
		
		UserProfile upf = new UserProfile();
		upf.setId(user.getId());
		upf.setEmail(user.getEmail());
		upf.setFirst_name(user.getFirst_name());
		upf.setLast_name(user.getLast_name());
		upf.setLocation(user.getLocation());
		upf.setRole(user.getRole());

		PetProfile profile = new PetProfile();
		profile.setaPet(pet);
		profile.setTraits(personalityRepo.findByPetId(pet.getId()));
		profile.setPicture(pictureRepo.findByPetId(pet.getId()));
		
		return new LikedPetResponse(profile, upf);
		
	}
	
	public UserAPIReader readUser(Pet pet) throws JsonProcessingException, JsonMappingException {

		RestTemplate restTemplate = new RestTemplate();

		String resourceUrl = userUrl + "api/UserService/getUserById/" + pet.getOwner_id();

		ResponseEntity<String> response = restTemplate.getForEntity(resourceUrl, String.class);

		HttpStatusCode statusCode = response.getStatusCode();

		String productsJson = response.getBody();

		System.out.println("Status: " + statusCode);

		ObjectMapper oM = new ObjectMapper();

		UserAPIReader usr = oM.readValue(productsJson, UserAPIReader.class);

		return usr;
	}
}
