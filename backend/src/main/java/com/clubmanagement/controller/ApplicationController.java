package com.clubmanagement.controller;

import com.clubmanagement.dto.*;
import com.clubmanagement.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/clubs/{clubId}/apply")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApplicationResponse> apply(
            @PathVariable Long clubId,
            @RequestBody ApplicationRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(applicationService.apply(clubId, request, userDetails.getUsername()));
    }

    @GetMapping("/student/applications")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(applicationService.getStudentApplications(userDetails.getUsername()));
    }

    @GetMapping("/coordinator/applications")
    @PreAuthorize("hasRole('COORDINATOR')")
    public ResponseEntity<List<ApplicationResponse>> getCoordinatorApplications(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(applicationService.getCoordinatorApplications(userDetails.getUsername()));
    }

    @PatchMapping("/applications/{id}/status")
    @PreAuthorize("hasRole('COORDINATOR') or hasRole('ADMIN')")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, body.get("status")));
    }
}
