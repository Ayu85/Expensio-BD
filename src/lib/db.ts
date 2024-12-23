import mongoose from "mongoose"

const connectDb = async () => {
    const URI = process.env.MONGO_URI
    if (!URI) {
        console.log('Please Check .env for mongo uri');
        return
    } else
        try {
            const inst = await mongoose.connect(URI)
            console.log(`Mongo DB connected HOST:${inst.connection.host} , DB:${inst.connection.name}`);

        } catch {
            console.log('Mongo DB connection failed....');

        }
}

export default connectDb