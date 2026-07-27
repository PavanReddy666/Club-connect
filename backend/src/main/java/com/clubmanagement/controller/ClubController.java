package com.clubmanagement.controller;

import com.clubmanagement.dto.*;
import com.clubmanagement.service.ClubService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @GetMapping
    public ResponseEntity<List<ClubResponse>> getApprovedClubs() {
        return ResponseEntity.ok(clubService.getAllApprovedClubs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClubResponse> getClub(@PathVariable Long id) {
        return ResponseEntity.ok(clubService.getClubById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('COORDINATOR')")
    public ResponseEntity<ClubResponse> createClub(
            @Valid @RequestBody ClubRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.createClub(request, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<ClubResponse> updateClub(
            @PathVariable Long id,
            @Valid @RequestBody ClubRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.updateClub(id, request, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteClub(@PathVariable Long id) {
        clubService.deleteClub(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('COORDINATOR')")
    public ResponseEntity<List<ClubResponse>> getMyClubs(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(clubService.getClubsByCoordinator(userDetails.getUsername()));
    }
}
