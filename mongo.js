import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url  = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.s0tuw8w.mongodb.net/doc_house_server`;
;

async function connectWithDB() {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,  
        useUnifiedTopology: true, 
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
}
  export default connectWithDB