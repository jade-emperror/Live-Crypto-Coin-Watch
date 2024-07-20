// dummyClient.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Adjust the URL if needed

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('initCoinLogUpdate', (data) => {
    console.log('Initial coin log data:', data);
});

socket.on('liveCoinLogUpdate', (data) => {
    console.log('Live coin log update:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});
