package com.petpal.spring.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.petpal.spring.entity.Picture;

import jakarta.transaction.Transactional;

@Repository
public interface PictureRepository extends CrudRepository<Picture, Long> {
	
	Picture findByPetId(Long pid);
	
	@Transactional
	void deleteByPetId(Long petId);
	
}
