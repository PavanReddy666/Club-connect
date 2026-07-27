package com.clubmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private Long clubId;
    private String clubName;
    private String message;
    private String status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
}
