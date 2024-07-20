import { Document, Model, Schema, model } from 'mongoose';

// Define the Model interface
interface ICoinModel extends Document {
    symbol: string;
    view: boolean;
}

// Define the schema for CryptoModel
const coinModelSchema = new Schema<ICoinModel>({
    symbol: { type: String, required: true, unique: true },
    view: { type: Boolean, required: true }
});

// Create the model
const CoinModel: Model<ICoinModel> = model<ICoinModel>('CoinModel', coinModelSchema);

export { CoinModel, ICoinModel };
