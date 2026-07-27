package com.clubmanagement.repository;

import com.clubmanagement.entity.Club;
import com.clubmanagement.entity.User;
import com.clubmanagement.entity.enums.ClubStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    List<Club> findByStatus(ClubStatus status);
    List<Club> findByCoordinator(User coordinator);
}
