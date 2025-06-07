// Import necessary modules
import Hotel from "../models/hotel.model.js";
import hotels from "../data/hotels.js";

import router from "./hotel.router.js";

router.route("/").post( async (req, res) => {
    try {
        await Hotel.deleteMany({}); // Clear existing data before inserting new data
        // Insert the new data into the database
        const hotelsInDb = await Hotel.insertMany(hotels.data)
        res.json(hotelsInDb);
    } catch (error) {
        console.log('Cannot add data to db',error.message);
        res.sendStatus(500).json({ message: "Error adding data to database" });
    }
});

export default router;