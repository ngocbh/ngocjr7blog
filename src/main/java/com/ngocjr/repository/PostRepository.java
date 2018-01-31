package com.ngocjr.repository;

import com.ngocjr.domain.Post;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Post entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select distinct post from Post post left join fetch post.tags")
    List<Post> findAllWithEagerRelationships();

    @Query("select post from Post post left join fetch post.tags where post.id =:id")
    Post findOneWithEagerRelationships(@Param("id") Long id);

}
