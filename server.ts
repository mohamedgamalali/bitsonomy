import mongoose from "mongoose";
import app from "./app";
import { config } from "dotenv";
config();
import { Connect } from "./utils/database";
const PORT = process.env.PORT || 3000;

Connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to database', error);
});