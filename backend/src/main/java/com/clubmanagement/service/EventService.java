package com.clubmanagement.service;

import com.clubmanagement.dto.EventRequest;
import com.clubmanagement.dto.EventResponse;
import com.clubmanagement.entity.Club;
import com.clubmanagement.entity.Event;
import com.clubmanagement.repository.ClubRepository;
import com.clubmanagement.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final ClubRepository clubRepository;

    public List<EventResponse> getAllEvents() {
        return eventRepository.findAllByOrderByDateAsc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<EventResponse> getEventsByClub(Long clubId) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        return eventRepository.findByClub(club)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public EventResponse createEvent(Long clubId, EventRequest request) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .date(request.getDate())
                .venue(request.getVenue())
                .club(club)
                .build();

        return toResponse(eventRepository.save(event));
    }

    public EventResponse updateEvent(Long eventId, EventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setVenue(request.getVenue());

        return toResponse(eventRepository.save(event));
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }

    private EventResponse toResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .date(event.getDate())
                .venue(event.getVenue())
                .clubId(event.getClub().getId())
                .clubName(event.getClub().getName())
                .createdAt(event.getCreatedAt())
                .build();
    }
}
