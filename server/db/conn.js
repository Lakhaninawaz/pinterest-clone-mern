const mongoose = require("mongoose");

const conn = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not set");
        }
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✓ Database connected successfully");
        return true;
    } catch (err) {
        console.error("✗ Database connection failed:", err.message);
        throw err;
    }
}

module.exports = conn;