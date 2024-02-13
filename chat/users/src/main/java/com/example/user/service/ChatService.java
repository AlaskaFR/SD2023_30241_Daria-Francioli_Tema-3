package com.example.user.service;

import com.example.user.dto.ChatDto;
import com.example.user.model.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import com.example.user.dto.TypingStatus;
import com.example.user.dto.SeenStatus;


import java.util.Objects;

@Service
@AllArgsConstructor
public class ChatService {
    private final SimpMessagingTemplate messagingTemplate;
    private final Long adminId = 2L;

    public void sendMessage(Message message) {
        System.out.println("Message is " + message);
        if (message.getSenderId().equals(adminId)) {
            // Admin sending to a specific user
            System.out.println("Topic is " + "/topic/messages/" + message.getReceiverId().toString() );
            messagingTemplate.convertAndSend("/topic/messages/" + message.getReceiverId().toString(), message);
        } else {
            // User sending to admin
            System.out.println("Topic is " + "/topic/messages/" + message.getSenderId().toString() );

            messagingTemplate.convertAndSend("/topic/messages/"+ message.getSenderId().toString(), message);
        }
    }

    public void sendTypingIndicator(Message message) {
        System.out.println("Message typing " + message);
        if (message.getSenderId().equals(adminId)) {
            // Admin sending to a specific user
            messagingTemplate.convertAndSend("/topic/typing/" + message.getReceiverId().toString(), message);
        } else {
            // User sending to admin
            messagingTemplate.convertAndSend("/topic/typing/"+ message.getSenderId().toString(), message);
        }
    }

    public void sendSeenReceipt(Message message) {
        System.out.println("Messafe seen" + message);
        if (message.getSenderId().equals(adminId)) {
            // Admin sending to a specific user
            messagingTemplate.convertAndSend("/topic/seen/" + message.getReceiverId().toString(), message);
        } else {
            // User sending to admin
            messagingTemplate.convertAndSend("/topic/seen/"+ message.getSenderId().toString(), message);
        }}

}
