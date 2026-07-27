package com.clubmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EventRequest {
    @NotBlank
    private String title;

    private String description;

    private LocalDate date;

    private String venue;
}
