import './configs/dotenvConfig.js';
import './configs/mongodbConfig.js';
import http from 'http';
import app from './app.js';
import { setupLiveUpdateWebSocket } from './websockets/liveUpdateWebSocket.js';
const PORT = process.env.PORT || 3000;
// Create an HTTP server and attach the Express app to it
const server = http.createServer(app);
// Setup WebSocket on the HTTP server
setupLiveUpdateWebSocket(server);
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
