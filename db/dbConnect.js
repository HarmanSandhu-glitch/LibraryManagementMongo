import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB successfully connected...");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error; // Re-throw to handle it in the server startup
  }
};

export default dbConnect;
