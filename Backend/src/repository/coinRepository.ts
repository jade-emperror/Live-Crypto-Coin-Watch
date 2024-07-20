import mongoose from 'mongoose';
import { CoinModel, ICoinModel } from '../models/coin.js';
import { defaultCryptos } from '../constants/coins.js';


export async function getActiveCoins() {
    try {
        const activeCoins = await CoinModel.find({ view: true }).select('symbol -_id').lean();
        return activeCoins.map(coin => coin.symbol);
    } catch (error) {
        console.error('Error fetching active codes:', error);
        throw error;
    }    
};

export async function insertDefaultCoins(){
    try {
        await CoinModel.insertMany(defaultCryptos, { ordered: false });
    } catch (error) {
        // Do not log duplicate error
        if ( !(error instanceof mongoose.mongo.MongoBulkWriteError  && error.code === 11000) ){
            console.error('Error inserting default cryptocurrencies:', error);
        } 
    }
};

export async function getCoinBySymbol(symbol:string) {
    return CoinModel.findOne({ symbol: symbol });
}

export async function deactivateCoin(symbol: string) : Promise<void> {
    await CoinModel.findOneAndUpdate(
        { symbol: symbol },
        { view: false })
}

export async function toggleOrInsertCoin(symbol: string): Promise<void> {
    await CoinModel.findOneAndUpdate(
        { symbol: symbol },
        { view: true },  
        {
            upsert: true,    
            runValidators: true
        });
}