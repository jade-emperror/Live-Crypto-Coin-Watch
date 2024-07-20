import { Server } from 'socket.io';
import { getLiveUpdateOrigins, getLiveUpdateAllowedMethods } from '../helpers/websockets/liveUpdateWebSocketHelper.js';
import { getRecentCoinLog } from '../services/coinLogService.js';
import { SERVER_TICK } from '../constants/config.js';
export function setupLiveUpdateWebSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: getLiveUpdateOrigins(),
            methods: getLiveUpdateAllowedMethods()
        }
    });
    io.on('connection', async (socket) => {
        // emit most recent data
        socket.emit('initCoinLogUpdate', await getRecentCoinLog());
        // emit data whenever a insert happens
        const intervalId = setInterval(async () => {
            const coinData = await getRecentCoinLog();
            console.log(coinData);
            socket.emit('liveCoinLogUpdate', coinData);
        }, SERVER_TICK);
        socket.on('disconnect', () => {
            console.log('Client disconnected liveCoinLogUpdate');
            clearInterval(intervalId);
        });
    });
    return io;
}
