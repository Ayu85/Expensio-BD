import { model, Schema } from "mongoose";

// Schema for Daily Spending
const dailySpendingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    date: {
        type: Date, 
        required: true,
        default: Date.now 
    },
    totalAmount: {
        type: Number, 
        required: true,
        min: [0, 'Total amount must be greater than or equal to 0']
    },
    categories: [{
        category: {
            type: String,
            enum: ['food', 'transportation', 'entertainment', 'bills', 'shopping', 'others'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }],
}, { timestamps: true });

export default model('DailySpending', dailySpendingSchema);
