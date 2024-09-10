import express from "express";
import { PORT , mongoDURL } from "./config/config.js";
import mongoose  from "mongoose";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express();

app.use(express.json())
app.use(cors())



// Connecting Database
mongoose .connect(mongoDURL).then(() => {
    console.log(`App Conneted to Database`);
}).catch((error) => {
    console.log(error);
})

app.listen(PORT , () => {
    console.log(`App is listening to port: ${PORT}`);
});

// Starting Route
app.get('/' , (request, response) => {
    console.log(request);
    return response.status(234).send(`Welcome to MERN STACK`)
});

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);