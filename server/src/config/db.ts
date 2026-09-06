import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoDbConnection = process.env.MONGODB_CONNECTION_STRING;

    if (!mongoDbConnection) {
      throw new Error("MONGODB_CONNECTION_STRING is not defined in the environment variables.");
    }

    const connection = await mongoose.connect(mongoDbConnection);
    console.log("═══════════════════════════════════════");
    console.log("🎉 MongoDB Connected Successfully!!!");
    console.log(`📁 Database: ${connection.connection.name}`);
    console.log(`🔗 Host: ${connection.connection.host}`);
    console.log("═══════════════════════════════════════");
  } catch (error) {
    console.error("═══════════════════════════════════════");
    console.error("❌ MongoDB Connection Error:", error);
    console.error("═══════════════════════════════════════");
    console.error("Possible fixes:");
    console.error("1. Make sure MongoDB is running");
    console.error("2. Check your internet connection");
    console.error("3. Verify MONGODB_CONNECTION_STRING in .env file");

    process.exit(1);
  }
};

export default connectDB;