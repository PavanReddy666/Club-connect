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
public class ClubResponse {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String logoUrl;
    private String status;
    private String coordinatorName;
    private String coordinatorEmail;
    private Long coordinatorId;
    private LocalDateTime createdAt;
}
