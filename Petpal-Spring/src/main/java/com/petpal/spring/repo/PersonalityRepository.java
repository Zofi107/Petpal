/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.petpal.spring.entity.Personality;

import jakarta.transaction.Transactional;

@Repository
public interface PersonalityRepository extends CrudRepository<Personality, Long> {

	List<Personality> findByPetId(Long petId);
	@Transactional
	void deleteAllByPetId(Long petId);

}
