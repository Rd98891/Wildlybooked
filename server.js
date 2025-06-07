import express from 'express';
import mongoose from 'mongoose';
import hotelRouter from "./routes/hotel.router.js";
import hotelDataImportRouter from "./routes/hoteldataimport.router.js";
import { connectDB } from './config/dbconfig.js';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectDB(); // Connect to MongoDB

app.get("/", (req, res) => {
    res.send("Chalo ye kaam kr rha hai");
});

app.use("/api/hotelsdataimport", hotelDataImportRouter); // Import local hotel data into the MongoDB database.

app.use("/api/hotels", hotelRouter); // Fetch all hotel data from the MongoDB database.

mongoose.connection.once("open", () => {
    console.log("MongoDB connection established successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
});
mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error.message);
});
