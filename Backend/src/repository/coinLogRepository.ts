import { CoinModel } from '../models/coin.js';
import { CoinLogModel, CoinLogUpdate } from '../models/coinLogModel.js';
import { getActiveCoins } from './coinRepository.js';

export async function insertCoinLogDetails(coinUpdates: CoinLogUpdate[], now: number): Promise<void> {
    try {
        const coinUpdatesWithTimestamp = coinUpdates.map(coin => ({
            ...coin,
            timestamp: now
        }));
        await CoinLogModel.insertMany(coinUpdatesWithTimestamp, { ordered: false });
        console.log('Coin data inserted successfully.');
    } catch (error) {
        console.error('Error inserting coin details:', error);
    }
    }

export async function getMostRecentCoinLog(coins: string[]){
    try {
        return await CoinLogModel.aggregate([
            { $match: { code: { $in: coins } } },
            { $sort: { timestamp: -1 } },
            { $group: { _id: "$code", doc: { $first: "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$doc" } },
            { $sort: { code : 1 } }
        ]);
    } catch (error) {
        console.error('Error fetching initial data:', error);
    }
}