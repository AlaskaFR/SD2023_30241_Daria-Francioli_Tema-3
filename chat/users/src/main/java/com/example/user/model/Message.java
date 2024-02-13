package com.example.user.model;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Data
public class Message {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String message;
    private String date;
    private Status status;
    private boolean seen;
    private boolean typing;
}