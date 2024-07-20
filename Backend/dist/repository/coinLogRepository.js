import { CoinLogModel } from '../models/coinLogModel.js';
export async function insertCoinLogDetails(coinUpdates, now) {
    try {
        const coinUpdatesWithTimestamp = coinUpdates.map(coin => ({
            ...coin,
            timestamp: now
        }));
        await CoinLogModel.insertMany(coinUpdatesWithTimestamp, { ordered: false });
        console.log('Coin data inserted successfully.');
    }
    catch (error) {
        console.error('Error inserting coin details:', error);
    }
}
export async function getMostRecentCoinLog(coins) {
    try {
        return await CoinLogModel.aggregate([
            { $match: { code: { $in: coins } } },
            { $sort: { timestamp: -1 } },
            { $group: { _id: "$code", doc: { $first: "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$doc" } },
            { $sort: { code: 1 } }
        ]);
    }
    catch (error) {
        console.error('Error fetching initial data:', error);
    }
}
