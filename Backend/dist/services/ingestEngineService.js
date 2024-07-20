import axios from 'axios';
import '../configs/mongodbConfig.js';
import { COIN_FETCH_API, LIVE_COIN_WATCH_API_KEY } from '../constants/api.js';
import { insertCoinLogDetails } from '../repository/coinLogRepository.js';
export async function fetchCoinDataFromApi(codes) {
    try {
        const response = await axios.post(`${COIN_FETCH_API}`, {
            codes: codes,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': LIVE_COIN_WATCH_API_KEY,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching coin data from API:', error);
        throw error;
    }
}
export async function ingestCoinBatch(batch, now) {
    try {
        const coinUpdates = await fetchCoinDataFromApi(batch);
        await insertCoinLogDetails(coinUpdates, now);
        console.log(`Successfully processed batch for ${now}: ${batch}`);
    }
    catch (error) {
        console.error(`Error processing batch for ${now}: ${batch} `, error);
    }
}
;
export async function prepareTwoBatches(codes) {
    const midIndex = Math.ceil(codes.length / 2);
    return {
        batch1: codes.slice(0, midIndex),
        batch2: codes.slice(midIndex)
    };
}
