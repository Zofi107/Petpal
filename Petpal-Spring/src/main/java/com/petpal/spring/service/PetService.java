/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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
import com.petpal.spring.entity.Personality;
import com.petpal.spring.entity.Pet;
import com.petpal.spring.entity.Picture;

import com.petpal.spring.repo.LikeRepository;
import com.petpal.spring.repo.PersonalityRepository;
import com.petpal.spring.repo.PetRepository;
import com.petpal.spring.repo.PictureRepository;

import com.petpal.spring.request.PetCreateRequest;
import com.petpal.spring.request.PetUpdateRequest;

import com.petpal.spring.request.UserAPIReader;
import com.petpal.spring.response.LikedPetResponse;
import com.petpal.spring.response.PetProfile;
import com.petpal.spring.response.PreferenceReader;
import com.petpal.spring.response.UserProfile;

@Service
public class PetService {

	@Autowired
	private PetRepository petsRepository;
	@Autowired
	private PersonalityRepository personalityRepository;
	@Autowired
	private PictureRepository pictureRepository;
	@Autowired
	private LikeRepository likeRepo;

	private String userUrl = "http://969100-petpal-userservice-env.eba-dgjhss32.us-east-2.elasticbeanstalk.com/";

	private String prefUrl = "http://969100-petpal-preferenceservice-env-1.eba-p4mprkyy.us-east-2.elasticbeanstalk.com/";

	/**
	 * Read all existing according to the users preferences
	 * 
	 * @param user id
	 * @return list of Pet and UserProfile for Home.js
	 * @throws JsonProcessingException
	 * @throws JsonMappingException
	 */

	public List<LikedPetResponse> getFilteredPets(Long userId) throws JsonMappingException, JsonProcessingException {

		List<Pet> allPets = (List<Pet>) petsRepository.findAll();

		List<Pet> allPetsFiltered = new ArrayList<>();

		PreferenceReader preference = readPref(userId);

		allPets.forEach(p -> {

			if (preference != null) {

				// checking if the user already liked the pet or not
				if (!likeExists(userId, p.getId())) {

					// matching the user preference with the pet
					if (matchPreference(p, preference))
						allPetsFiltered.add(p);
				}
			} else {

				allPetsFiltered.add(p);
			}
		});

		List<LikedPetResponse> allPetProfiles = new ArrayList<>();

		allPetsFiltered.forEach(pet -> {

			UserAPIReader user;

			try {

				user = readUser(pet);

				allPetProfiles.add(createResponse(pet, user));

			} catch (JsonMappingException e) {

				e.printStackTrace();

			} catch (JsonProcessingException e) {

				e.printStackTrace();

			}

		});

		return allPetProfiles;
	}

	/**
	 * Read all Pets without filtering
	 * 
	 * @return Profiles of all Pets in the DB
	 */

	public List<LikedPetResponse> getAllPets(Long userId) {

		List<Pet> allPets = (List<Pet>) petsRepository.findAll();

		List<LikedPetResponse> allPetProfiles = new ArrayList<>();

		allPets.forEach(p -> {

			// checking if the user already liked the pet or not
			if (!likeExists(userId, p.getId())) {

				UserAPIReader usr;

				try {

					usr = readUser(p);

					allPetProfiles.add(createResponse(p, usr));

				} catch (JsonMappingException e) {

					e.printStackTrace();

				} catch (JsonProcessingException e) {

					e.printStackTrace();

				}

			}

		});

		return allPetProfiles;

	}

	/**
	 * Read all pet profile of a user
	 * 
	 * @param userId
	 * @return all Profiles of Pets of a user
	 */

	public List<PetProfile> getAllPetsOfAUser(Long userId) throws NoSuchElementException {

		List<PetProfile> allPetsOfAUser = new ArrayList<>();

		List<Pet> allPets = petsRepository.findByOwnerId(userId);

		allPets.forEach(pet -> {

			PetProfile petProfile = new PetProfile();
			petProfile.setaPet(pet);
			petProfile.setPicture(pictureRepository.findByPetId(pet.getId()));
			petProfile.setTraits(personalityRepository.findByPetId(pet.getId()));

			allPetsOfAUser.add(petProfile);

		});

		return allPetsOfAUser;
	}

	/**
	 * Read pet profile of a pet using pet id
	 * 
	 * @param petId
	 * @return PetProfile of a Pet
	 */

	public PetProfile getPetById(Long petId) throws NoSuchElementException {

		Pet thePet = petsRepository.findById(petId).orElse(null);

		List<Personality> traits = personalityRepository.findByPetId(petId);

		Picture picture = pictureRepository.findByPetId(petId);

		PetProfile profile = new PetProfile();
		profile.setaPet(thePet);
		profile.setTraits(traits);
		profile.setPicture(picture);

		return profile;

	}

	/**
	 * Create a Pet, its pictures and personality traits using One To Many
	 * Relationship
	 * 
	 * @param petInputDTO
	 * @return
	 */

	public Pet createPet(PetCreateRequest pC) {

		Pet pet = new Pet(pC);

		Pet savedPet = petsRepository.save(pet);

		Long savedPetId = savedPet.getId();

		pC.getTraits().forEach(str -> {

			personalityRepository.save(new Personality(savedPetId, str));

		});

		Picture pic = new Picture();

		// pic.setImage_data(pictureService.uploadPictureToS3(pet.getId(),
		// petInputDTO.getImage_data()));

		pic.setImage_data(pC.getImage_data());
		pic.setPetId(savedPetId);

		pictureRepository.save(pic);

		return savedPet;

	}

	/**
	 * Update a Pet, its profile attributes, pictures and personality traits
	 * 
	 * @param PetUpdateRequest
	 * @return
	 */

	public Pet updatePet(PetUpdateRequest pU, Long petId) throws NoSuchElementException {

		Pet p = petsRepository.findById(petId).get();

		p.setName(pU.getName());
		p.setAge(pU.getAge());
		p.setDescription(pU.getDescription());
		p.setNeutered(pU.isNeutered());
		p.setUp_to_date(pU.isUp_to_date());

		Pet updatedPet = petsRepository.save(p);

		return updatedPet;

	}

	/**
	 * Delete a Pet and its associated entities
	 * 
	 * @param petId
	 * @return String
	 */

	public String deletePet(Long petId) throws NoSuchElementException {

		personalityRepository.deleteAllByPetId(petId);

		pictureRepository.deleteByPetId(petId);

		petsRepository.deleteById(petId);

		likeRepo.deleteAllByPetId(petId);

		return "Pet has been removed successfully";

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
		profile.setTraits(personalityRepository.findByPetId(pet.getId()));
		profile.setPicture(pictureRepository.findByPetId(pet.getId()));

		return new LikedPetResponse(profile, upf);

	}

	public boolean matchPreference(Pet pet, PreferenceReader preference) {

		String type = preference.getType().toLowerCase();
		String breed = preference.getBreed().toLowerCase();
		String age = preference.getAge();
		String gender = preference.getGender().toLowerCase();
		boolean isNeutered = preference.isNeutered();

		if ((pet.getSpecies().toLowerCase().equals(type) || (type.equals("all types")))
				&& ((pet.getBreed().toLowerCase().equals(breed)) || (breed.equals("all breeds")))
				&& (pet.getNeutered() == isNeutered)
				&& ((pet.getGender().toLowerCase().equals(gender)) || (gender.equals("all genders")))) {

			if (age.startsWith("Baby") && pet.getAge() <= 2)
				return true;
			else if (age.startsWith("Adult") && (pet.getAge() > 2 && pet.getAge() <= 7))
				return true;
			else if (age.startsWith("Senior") && (pet.getAge() > 7))
				return true;
			else
				return true;

		}

		return false;

	}

	public boolean likeExists(Long likerId, Long petId) {

		Optional<Like> like = likeRepo.findByLikerIdAndPetId(likerId, petId);

		if (like.isPresent())
			return true;

		return false;

	}

	// method to read user using RestTemplate from User MS
	public UserAPIReader readUser(Pet p) throws JsonProcessingException, JsonMappingException {

		RestTemplate restTemplate = new RestTemplate();

		String resourceUrl = userUrl + "api/UserService/getUserById/" + p.getOwner_id();

		ResponseEntity<String> response = restTemplate.getForEntity(resourceUrl, String.class);

		HttpStatusCode statusCode = response.getStatusCode();

		String productsJson = response.getBody();

		System.out.println("Status: " + statusCode);

		ObjectMapper oM = new ObjectMapper();

		UserAPIReader usr = oM.readValue(productsJson, UserAPIReader.class);

		return usr;
	}

	// method to read user using RestTemplate from Preference MS
	public PreferenceReader readPref(Long userId) throws JsonProcessingException, JsonMappingException {

		RestTemplate restTemplate = new RestTemplate();

		String resourceUrl = prefUrl + "api/PreferenceService/getPreferenceByUserId/" + userId;

		ResponseEntity<String> response = restTemplate.getForEntity(resourceUrl, String.class);

		HttpStatusCode statusCode = response.getStatusCode();

		String productsJson = response.getBody();

		System.out.println("Status: " + statusCode);

		ObjectMapper oM = new ObjectMapper();

		PreferenceReader pref = oM.readValue(productsJson, PreferenceReader.class);

		return pref;
	}

}
