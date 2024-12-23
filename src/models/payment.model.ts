import { model, Schema } from "mongoose";

const paymentSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    amount: {
        type: Number, required: true
    },
    time: {
        type: Date, default: Date.now()
    }
})

export default model('Payment', paymentSchema)