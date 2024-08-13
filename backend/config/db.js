import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ratheramir102101:Amir12345@cluster1.uw2v7sc.mongodb.net/react').then(()=>console.log("DB Connected") );
}