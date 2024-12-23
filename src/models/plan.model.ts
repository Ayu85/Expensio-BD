import { model, Schema } from "mongoose";

const planSchema = new Schema({
    name: {
        type: String, required: true
    },
    about: {
        type: String, default: 'Description for this plan'
    },
    coordnator: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    budget: {
        type: Number, required: true
    },
    members: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],
    paymentreceived: {
        type: Number, default: 0
    },
    paymentdoneby: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],

})

export default model('Plan', planSchema)