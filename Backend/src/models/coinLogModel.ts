import { Document, Model, Schema, model } from 'mongoose';

// Define the Delta interface
interface Delta {
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
}

// Define the CoinUpdate interface
interface CoinLogUpdate {
    code: string;
    rate: number;
    volume: number;
    cap: number;
    delta: Delta;
    timestamp: number;
}

// Extend Document with CoinUpdate
interface CoinDocument extends Document, CoinLogUpdate {}

// Define the schema for Delta
const deltaSchema = new Schema<Delta>({
    hour: { type: Number, required: true },
    day: { type: Number, required: true },
    week: { type: Number, required: true },
    month: { type: Number, required: true },
    quarter: { type: Number, required: true },
    year: { type: Number, required: true },
});

// Define the schema for CoinDocument
const coinSchema = new Schema<CoinDocument>({
    code: { type: String, required: true },
    rate: { type: Number, required: true },
    volume: { type: Number, required: true },
    cap: { type: Number, required: true },
    delta: { type: deltaSchema, required: true },
    timestamp: { type: Number, required: true }
});

// Create the model with the name 'CoinLog'
const CoinLogModel: Model<CoinDocument> = model<CoinDocument>('CoinLog', coinSchema);

// Export the model and interface
export { CoinLogModel, CoinLogUpdate };
