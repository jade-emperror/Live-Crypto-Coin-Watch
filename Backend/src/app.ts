import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { deactivateCoin, getCoinBySymbol, toggleOrInsertCoin } from './repository/coinRepository.js';
import { fetchCoinDataFromApi } from './services/ingestEngineService.js';
import { getRecentCoinLog } from './services/coinLogService.js';


dotenv.config();

const app = express();
app.use(cors()); 

// Middleware and routes setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/coin', async (req,res) =>{
    
    const coinLogData = await getRecentCoinLog();
    return res.json(coinLogData)
});

// Update endpoint
app.patch('/coin', async (req,res) =>{
    const { currentSymbol, replaceSymbol } = req.body;

    // Validate request body
    if (!currentSymbol || !replaceSymbol) {
        return res.status(400).json({ error: 'Both currentSymbol and replaceSymbol are required.' });
    }

    await deactivateCoin(currentSymbol)
    await toggleOrInsertCoin(replaceSymbol)
    
    const coinLogData = await fetchCoinDataFromApi([replaceSymbol]);
    return res.json(coinLogData)
});

export default app;
