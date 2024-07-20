import axios from 'axios';
import '../configs/mongodbConfig.js';
import { CoinLogUpdate } from '../models/coinLogModel.js';
import { COIN_FETCH_API, LIVE_COIN_WATCH_API_KEY } from '../constants/api.js';
import {insertCoinLogDetails} from '../repository/coinLogRepository.js'

type BatchResult = {
    batch1: string[];
    batch2: string[];
};

export async function fetchCoinDataFromApi(codes: string[]): Promise<CoinLogUpdate[]> {
    try {
        const response = await axios.post(`${COIN_FETCH_API}`, 
        {
            codes: codes,
        }, 
        {
            headers: {
            'Content-Type': 'application/json',
            'x-api-key': LIVE_COIN_WATCH_API_KEY,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching coin data from API:', error);
        throw error;
    }
}

export async function ingestCoinBatch(batch: string[], now: number) {
        try {
            const coinUpdates = await fetchCoinDataFromApi(batch);
            await insertCoinLogDetails(coinUpdates, now);
            console.log(`Successfully processed batch for ${now}: ${batch}`);
        } catch (error) {
            console.error(`Error processing batch for ${now}: ${batch} `, error);
        }
    };

export async function prepareTwoBatches(codes: string[]) : Promise<BatchResult> {
    const midIndex = Math.ceil(codes.length / 2);
    return {
        batch1 : codes.slice(0, midIndex),
        batch2 : codes.slice(midIndex)
    }
}