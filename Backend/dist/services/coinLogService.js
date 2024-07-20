import { getActiveCoins } from "../repository/coinRepository.js";
import { getMostRecentCoinLog } from "../repository/coinLogRepository.js";
export async function getRecentCoinLog() {
    const coinsToView = await getActiveCoins();
    return getMostRecentCoinLog(coinsToView);
}
