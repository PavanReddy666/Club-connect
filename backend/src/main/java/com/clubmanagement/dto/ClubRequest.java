package com.clubmanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ClubRequest {
    @NotBlank
    private String name;

    private String description;

    private String category;

    private String logoUrl;
}
