const mongoose=require("mongoose")
require('dotenv').config()
  const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');
      } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
      }
}
module.exports=connectDB