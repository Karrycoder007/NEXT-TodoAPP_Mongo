import mongoose from "mongoose";

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URI)

        mongoose.connection.on("connected", () => {
            console.log("Connected to the DB.")

        })
    } catch (error) {
        console.log("Failed to load DB.", error)

    }

}