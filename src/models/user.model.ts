import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String, lowercase: true, required: true
    },
    password: {
        type: String, required: true
    },
    fullname: {
        type: String, required: true
    },
    income: {
        type: Number, required: true, default: 0
    },
    upi: {
        type: String, required: true
    },

})

export default model('User', userSchema)