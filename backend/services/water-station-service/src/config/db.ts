import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.DB_URL) {
        console.log("Cannot connect to database: No Database URL provided");
        return;
    }

    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
