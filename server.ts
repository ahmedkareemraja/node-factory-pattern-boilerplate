import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./src/routes";
import { getCorsOptions } from "./src/utils/cors.config";

const PORT = process.env.PORT || 8000;

dotenv.config();
const app = express();

app.use(cors(getCorsOptions()));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

routes(app);

mongoose.connect(process.env.DB_CONNECTION_STRING!)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.clear();
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
});



