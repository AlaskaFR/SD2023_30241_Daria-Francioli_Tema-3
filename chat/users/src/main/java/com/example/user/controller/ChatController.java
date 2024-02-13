package com.example.user.controller;

import com.example.user.model.Message;
import com.example.user.service.ChatService;
import com.example.user.dto.ChatDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/sendMessage")
    public void sendMessage(Message message) {
        chatService.sendMessage(message);
    }

    @MessageMapping("/isTyping")
    public void sendTyping(@Payload Message message) {
        chatService.sendTypingIndicator(message);
    }

    @MessageMapping("/seen")
    public void sendSeen(@Payload Message message) {
        chatService.sendSeenReceipt(message);
    }
}
