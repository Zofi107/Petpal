/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.controller;

import com.petpal.spring.entity.Like;
import com.petpal.spring.response.LikedPetResponse;
//import com.petpal.spring.entity.Pet;
import com.petpal.spring.service.LikeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000",
			"http://969101-capstone-petpal.s3-website.us-east-2.amazonaws.com",
		        "http://969100-petpal-userservice-env.eba-dgjhss32.us-east-2.elasticbeanstalk.com",
		        "*"})
@RestController
@RequestMapping("/likes")
public class LikeController {
	
	@Autowired
	private LikeService likesService;

	/**
	 * Read
	 * 
	 * @param userId
	 * @return
	 */
	@GetMapping(value = "/getLikes/{userId}", produces = "application/json")
	public ResponseEntity<List<LikedPetResponse>> getAllPetsLikedByAUserId(@PathVariable Long userId) {
		
		return ResponseEntity.ok(likesService.getAllPetsLikedByAUser(userId));
		
	}

	/**
	 * Create
	 * 
	 * @param liker_id
	 * @param pet_id
	 * @return
	 */
	@PostMapping(value = "/setLike/liker/{liker_id}/pet/{pet_id}", produces = "application/json")
	public ResponseEntity<Like> setLike(@PathVariable Long liker_id, @PathVariable Long pet_id) {
		
		return ResponseEntity.ok(likesService.createLike(liker_id, pet_id));
		
	}

	/**
	 * Delete
	 * 
	 * @param liker_id
	 * @param pet_id
	 * @return
	 */
	@DeleteMapping(value = "/deleteLike/liker/{liker_id}/pet/{pet_id}")
	public ResponseEntity<String> deleteLike(@PathVariable Long liker_id, @PathVariable Long pet_id) {
		
		return ResponseEntity.ok(likesService.deleteLike(liker_id, pet_id));
		
	}

}
