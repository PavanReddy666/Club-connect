package com.clubmanagement.repository;

import com.clubmanagement.entity.Application;
import com.clubmanagement.entity.Club;
import com.clubmanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudent(User student);
    List<Application> findByClub(Club club);
    List<Application> findByClubIn(List<Club> clubs);
    Optional<Application> findByStudentAndClub(User student, Club club);
    long countByStatus(com.clubmanagement.entity.enums.ApplicationStatus status);
}
