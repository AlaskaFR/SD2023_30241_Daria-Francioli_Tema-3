// WebSocketProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const connectWebSocket = () => {
            const serverUrl = 'http://localhost:8084/ws';
            const socket = new SockJS(serverUrl);
            const client = Stomp.over(socket);
            client.connect({}, frame => {
                setStompClient(client);
            });
            return () => {
                client.disconnect();
            };
        };

        connectWebSocket();
    }, []);

    const sendMessage = (destination, message) => {
        if (stompClient && stompClient.connected) {
            stompClient.send(destination, {}, JSON.stringify(message));
        }
    };

    const value = { sendMessage, stompClient };

    return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
};
