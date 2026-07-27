package com.clubmanagement.service;

import com.clubmanagement.dto.ApplicationRequest;
import com.clubmanagement.dto.ApplicationResponse;
import com.clubmanagement.entity.Application;
import com.clubmanagement.entity.Club;
import com.clubmanagement.entity.User;
import com.clubmanagement.entity.enums.ApplicationStatus;
import com.clubmanagement.repository.ApplicationRepository;
import com.clubmanagement.repository.ClubRepository;
import com.clubmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    public ApplicationResponse apply(Long clubId, ApplicationRequest request, String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));

        applicationRepository.findByStudentAndClub(student, club).ifPresent(a -> {
            throw new RuntimeException("Already applied to this club");
        });

        Application application = Application.builder()
                .student(student)
                .club(club)
                .message(request.getMessage())
                .status(ApplicationStatus.PENDING)
                .build();

        return toResponse(applicationRepository.save(application));
    }

    public List<ApplicationResponse> getStudentApplications(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return applicationRepository.findByStudent(student)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<ApplicationResponse> getCoordinatorApplications(String coordinatorEmail) {
        User coordinator = userRepository.findByEmail(coordinatorEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Club> clubs = clubRepository.findByCoordinator(coordinator);
        return applicationRepository.findByClubIn(clubs)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ApplicationResponse updateApplicationStatus(Long applicationId, String status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(ApplicationStatus.valueOf(status.toUpperCase()));
        return toResponse(applicationRepository.save(application));
    }

    private ApplicationResponse toResponse(Application app) {
        return ApplicationResponse.builder()
                .id(app.getId())
                .studentId(app.getStudent().getId())
                .studentName(app.getStudent().getName())
                .studentEmail(app.getStudent().getEmail())
                .clubId(app.getClub().getId())
                .clubName(app.getClub().getName())
                .message(app.getMessage())
                .status(app.getStatus().name())
                .appliedAt(app.getAppliedAt())
                .updatedAt(app.getUpdatedAt())
                .build();
    }
}
