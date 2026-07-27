package com.clubmanagement.service;

import com.clubmanagement.dto.*;
import com.clubmanagement.entity.Club;
import com.clubmanagement.entity.User;
import com.clubmanagement.entity.enums.ClubStatus;
import com.clubmanagement.repository.ClubRepository;
import com.clubmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    public List<ClubResponse> getAllApprovedClubs() {
        return clubRepository.findByStatus(ClubStatus.APPROVED)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ClubResponse> getAllClubs() {
        return clubRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ClubResponse getClubById(Long id) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        return toResponse(club);
    }

    public ClubResponse createClub(ClubRequest request, String coordinatorEmail) {
        User coordinator = userRepository.findByEmail(coordinatorEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Club club = Club.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .logoUrl(request.getLogoUrl())
                .coordinator(coordinator)
                .status(ClubStatus.PENDING)
                .build();

        return toResponse(clubRepository.save(club));
    }

    public ClubResponse updateClub(Long id, ClubRequest request, String email) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        club.setName(request.getName());
        club.setDescription(request.getDescription());
        club.setCategory(request.getCategory());
        club.setLogoUrl(request.getLogoUrl());

        return toResponse(clubRepository.save(club));
    }

    public ClubResponse updateClubStatus(Long id, String status) {
        Club club = clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        club.setStatus(ClubStatus.valueOf(status.toUpperCase()));
        return toResponse(clubRepository.save(club));
    }

    public void deleteClub(Long id) {
        clubRepository.deleteById(id);
    }

    public List<ClubResponse> getClubsByCoordinator(String email) {
        User coordinator = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return clubRepository.findByCoordinator(coordinator)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ClubResponse toResponse(Club club) {
        return ClubResponse.builder()
                .id(club.getId())
                .name(club.getName())
                .description(club.getDescription())
                .category(club.getCategory())
                .logoUrl(club.getLogoUrl())
                .status(club.getStatus().name())
                .coordinatorName(club.getCoordinator() != null ? club.getCoordinator().getName() : null)
                .coordinatorEmail(club.getCoordinator() != null ? club.getCoordinator().getEmail() : null)
                .coordinatorId(club.getCoordinator() != null ? club.getCoordinator().getId() : null)
                .createdAt(club.getCreatedAt())
                .build();
    }
}
