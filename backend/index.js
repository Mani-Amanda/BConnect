import express, { request, response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import userRoute from './routes/userRoutes.js';
import businessRoute from './routes/businessRoutes.js';

const app=express();
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        mehod:['GET','POST','PUT','DELETE'],
        allowHeaders:['Content-Type'],
    })
);

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('Welcome to BConnect')
});

app.use('/',userRoute);
app.use('/business',businessRoute);


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT,()=>{
            console.log('App is listening to port:' +PORT);
        });
    })
    .catch((error)=>{
        console.log(error);
    });