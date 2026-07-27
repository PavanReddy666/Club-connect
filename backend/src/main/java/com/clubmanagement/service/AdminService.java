package com.clubmanagement.service;

import com.clubmanagement.dto.UserResponse;
import com.clubmanagement.entity.User;
import com.clubmanagement.entity.enums.Role;
import com.clubmanagement.repository.ApplicationRepository;
import com.clubmanagement.repository.ClubRepository;
import com.clubmanagement.repository.UserRepository;
import com.clubmanagement.entity.enums.ApplicationStatus;
import com.clubmanagement.entity.enums.ClubStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ClubRepository clubRepository;
    private final ApplicationRepository applicationRepository;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public UserResponse changeUserRole(Long userId, String role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(Role.valueOf(role.toUpperCase()));
        return toResponse(userRepository.save(user));
    }

    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalClubs", clubRepository.count());
        stats.put("approvedClubs", (long) clubRepository.findByStatus(ClubStatus.APPROVED).size());
        stats.put("pendingClubs", (long) clubRepository.findByStatus(ClubStatus.PENDING).size());
        stats.put("totalApplications", applicationRepository.count());
        stats.put("pendingApplications", applicationRepository.countByStatus(ApplicationStatus.PENDING));
        stats.put("approvedApplications", applicationRepository.countByStatus(ApplicationStatus.APPROVED));
        return stats;
    }

    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
