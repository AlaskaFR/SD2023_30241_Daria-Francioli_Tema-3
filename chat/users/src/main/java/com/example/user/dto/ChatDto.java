package com.example.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class ChatDto {
    private String userId;
    private Integer role;
    private String text;
}
