/**
 * @author Aninda Ahsan(969098)
 */

package com.petpal.spring.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.petpal.spring.entity.Like;
import java.util.List;
import java.util.Optional;



@Repository
public interface LikeRepository extends CrudRepository<Like, Long> {
	Optional<Like> findByLikerIdAndPetId(Long likerId, Long petId);
	List<Like> findByLikerId(Long likerId);
	void deleteAllByPetId(Long petId);
	List<Like> findByPetId(Long petId);
}
