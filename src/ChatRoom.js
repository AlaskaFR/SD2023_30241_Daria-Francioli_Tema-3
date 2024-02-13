import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import './ChatRoom.css';

const ChatRoom = ({ user, selectedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState({});
  const stompClient = useRef(null);

  useEffect(() => {
    const sock = new SockJS('http://localhost:8084/ws');
    stompClient.current = Stomp.over(sock);
  
    stompClient.current.connect({}, () => {
      console.log('Connected'); // Confirm connection in console
      console.log(user.id);
      const topicId = user.role === 1 ? selectedUserId : user.id;
      console.log("Selected Id is " + topicId)
      // Now subscribe inside the callback to ensure connection is established
      const messagesPath = `/topic/messages/${topicId}`;
      stompClient.current.subscribe(messagesPath, onMessageReceived);
      stompClient.current.subscribe(`/topic/typing/${topicId}`, onTypingReceived);
      stompClient.current.subscribe(`/topic/seen/${topicId}`, onSeenReceived);
    }, onError);
  
    return () => {
    
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect();
        console.log('Disconnected');
      }
    };
  }, []); // Consider dependencies based on your app's needs
  


  // Handlers for WebSocket messages
  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log("Received message:", message); // Log for debugging
  
    // Automatically send seen receipt if the message is for this user
    if (message.receiverId === user.id) {
      sendSeenReceipt(message.id);
    }
  };
  

  const onTypingReceived = (payload) => {
    const { senderId, typing } = JSON.parse(payload.body);
    setTypingUsers(prev => ({ ...prev, [senderId]: typing }));
  };
    
  const onSeenReceived = (payload) => {
    const { messageId, senderId } = JSON.parse(payload.body);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId && msg.senderId === senderId ? { ...msg, seen: true } : msg
      )
    );
  };
    
  const sendMessage = () => {
    console.log("INput message is " + inputMessage)
    if (inputMessage.trim()) {
      const chatMessage = {
        senderId: user.id,
        receiverId: selectedUserId || user.id,
        message: inputMessage,
        timestamp: new Date().toISOString(),
        id: Date.now(), // Consider using a more robust method for ID generation
      };
      stompClient.current.send('/app/sendMessage', {}, JSON.stringify(chatMessage));
      setInputMessage('');
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    sendTypingIndicator(user.id, e.target.value.trim().length > 0);
  };

  const sendTypingIndicator = (senderId, isTyping) => {
    if (stompClient.current && stompClient.current.connected) {
     
          const chatMessage = {
            senderId: user.id,
            receiverId: selectedUserId || user.id,
            timestamp: new Date().toISOString(),
            typing: isTyping,
            id: Date.now(), // Consider using a more robust method for ID generation
          }
          stompClient.current.send('/app/isTyping', {}, JSON.stringify(chatMessage));
      // stompClient.current.send('/app/typing', {}, JSON.stringify({ senderId, isTyping }));
    }
  };

  const sendSeenReceipt = (messageId) => {
    if (stompClient.current && stompClient.current.connected) {
     
      const chatMessage = {
        senderId: user.id,
        receiverId: selectedUserId || user.id,
        timestamp: new Date().toISOString(),
        seen: true,
        id: Date.now(), // Consider using a more robust method for ID generation
      }
      stompClient.current.send('/app/seen', {}, JSON.stringify(chatMessage));
  }};

  const onError = (err) => {
    console.error('Connection error:', err);
  };

    
  const handleInputBlur = () => {
    sendTypingIndicator(user.id, false);
  };


  const MessageBubble = ({ msg }) => {
    const isCurrentUser = msg.senderId === user.id;
    return (
      <div className={`message-bubble ${isCurrentUser ? 'current-user' : ''}`}>
        <strong>{isCurrentUser ? 'Me' : `User ${msg.senderId}`}</strong>
        <p>{msg.message}</p>
        {msg.seen && <span className="seen">(Seen)</span>}
      </div>
    );
  };
  
    

  return (
    <div className="chat-room">
      <h2>Chat Room</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
        {Object.keys(typingUsers).filter(userId => typingUsers[userId] && userId !== user.id.toString()).map(userId => (
          <div key={userId} className="typing-indicator">
            User {userId} is typing...
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};


export default ChatRoom;