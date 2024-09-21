


import express from 'express';
import userRouter from './Routes/userSide/userRouter.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




//conection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://jith51541:Ge3V9KpKo9iLZuf7@cluster0.0q0zu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
