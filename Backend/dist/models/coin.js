import { Schema, model } from 'mongoose';
// Define the schema for CryptoModel
const coinModelSchema = new Schema({
    symbol: { type: String, required: true, unique: true },
    view: { type: Boolean, required: true }
});
// Create the model
const CoinModel = model('CoinModel', coinModelSchema);
export { CoinModel };
