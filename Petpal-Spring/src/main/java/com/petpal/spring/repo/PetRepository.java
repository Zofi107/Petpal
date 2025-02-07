/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.petpal.spring.entity.Pet;


@Repository
public interface PetRepository extends CrudRepository<Pet, Long> {
	
	List<Pet> findByOwnerId(Long OwnerId);
	
	void deleteAllByOwnerId(Long owner_id);

}
