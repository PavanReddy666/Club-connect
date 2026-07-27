package com.clubmanagement.repository;

import com.clubmanagement.entity.Club;
import com.clubmanagement.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByClub(Club club);
    List<Event> findAllByOrderByDateAsc();
}
