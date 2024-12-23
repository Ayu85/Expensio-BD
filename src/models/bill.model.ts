import { model, Schema } from "mongoose";

const billSchema = new Schema({
    category: {
        type: String, enum: ['water', 'electricity', 'recharge', 'subscriptions', 'wifi', 'credit card','others']
    },
    name: {
        type: String, required: true
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type: String, enum: ['due', 'paid'], default: 'due'
    },
    duedate: {
        type: Date,
        validate: {
            validator: function (v: any) {
                return v >= new Date(); // Ensure due date is today or in the future
            },
            message: 'Due date must be in the future!'
        }
    }
    ,
    amount: {
        type: Number, required: true
    }
}, { timestamps: true })

export default model('Bill', billSchema)