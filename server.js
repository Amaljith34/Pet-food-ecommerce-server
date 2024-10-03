import express from 'express';
import userRouter from './Routes/userSide/userRouter.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import adminRouter from './Routes/adminSide/adminRouter.js';

dotenv.config()
const app = express();

//conection
// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb+srv://jith51541:Ge3V9KpKo9iLZuf7@cluster0.0q0zu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// }

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log("MongoDB connected successful");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

main();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api/user', userRouter);
app.use('/api/admin',adminRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));