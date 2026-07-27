package com.clubmanagement.controller;

import com.clubmanagement.dto.*;
import com.clubmanagement.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("/api/events")
    public ResponseEntity<List<EventResponse>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/api/clubs/{clubId}/events")
    public ResponseEntity<List<EventResponse>> getEventsByClub(@PathVariable Long clubId) {
        return ResponseEntity.ok(eventService.getEventsByClub(clubId));
    }

    @PostMapping("/api/clubs/{clubId}/events")
    @PreAuthorize("hasRole('COORDINATOR')")
    public ResponseEntity<EventResponse> createEvent(
            @PathVariable Long clubId,
            @Valid @RequestBody EventRequest request) {
        return ResponseEntity.ok(eventService.createEvent(clubId, request));
    }

    @PutMapping("/api/events/{eventId}")
    @PreAuthorize("hasRole('COORDINATOR')")
    public ResponseEntity<EventResponse> updateEvent(
            @PathVariable Long eventId,
            @Valid @RequestBody EventRequest request) {
        return ResponseEntity.ok(eventService.updateEvent(eventId, request));
    }

    @DeleteMapping("/api/events/{eventId}")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }
}
