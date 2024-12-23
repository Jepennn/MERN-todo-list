import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); //load env variables from which is API keys and other secrets

//async function to connect to the database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };
