import { Schema, model } from 'mongoose';
// Define the schema for Delta
const deltaSchema = new Schema({
    hour: { type: Number, required: true },
    day: { type: Number, required: true },
    week: { type: Number, required: true },
    month: { type: Number, required: true },
    quarter: { type: Number, required: true },
    year: { type: Number, required: true },
});
// Define the schema for CoinDocument
const coinSchema = new Schema({
    code: { type: String, required: true },
    rate: { type: Number, required: true },
    volume: { type: Number, required: true },
    cap: { type: Number, required: true },
    delta: { type: deltaSchema, required: true },
    timestamp: { type: Number, required: true }
});
// Create the model with the name 'CoinLog'
const CoinLogModel = model('CoinLog', coinSchema);
// Export the model and interface
export { CoinLogModel };
