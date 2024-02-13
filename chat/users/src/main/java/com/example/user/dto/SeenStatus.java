package com.example.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SeenStatus {
    private String userId;
    private boolean isSeen;
}
