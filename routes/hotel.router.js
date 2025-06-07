import express from "express";
import Hotel from "../models/hotel.model.js";


const router = express.Router();

router.route("/").get(async (req, res) => {
    try {
        const hotelsData = await Hotel.find({});
        hotelsData ? res.status(200).json(hotelsData) : res.status(404).json({ message: "No hotels found" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels from the db", error: error.message });
    }
});

export default router;