import './configs/dotenvConfig.js';
import {ingestCoinBatch, prepareTwoBatches } from './services/ingestEngineService.js';
import { getUnixTimestamp } from './helpers/globalHelper.js'
import { SERVER_TICK } from './constants/config.js';
import { getActiveCoins, insertDefaultCoins } from './repository/coinRepository.js';

console.log('Starting Ingest Engine...');
console.log('pushing default coins to available coins')
insertDefaultCoins();

const ingestCoinUpdates = async () => {
    const now = getUnixTimestamp();
    const codes = await getActiveCoins();
    const batches = await prepareTwoBatches(codes);
    console.log('Processing batches:', batches.batch1, batches.batch2);
    try {
        await Promise.all([
            ingestCoinBatch(batches.batch1, now),
            ingestCoinBatch(batches.batch2, now)
        ]);
        console.log(`All batches processed successfully for ${now}.`);
    } catch (error) {
        console.error('Error processing batches:', error);
    }
};

setInterval(() => {
    ingestCoinUpdates();
}, SERVER_TICK);