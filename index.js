//import express
const express = require('express');
const UserRouter=require("./routers/userRouter");
const FurnitureRouter=require("./routers/furnitureRouter");
const utilRouter=require("./routers/util");
const cors = require('cors');



//initialize express
const app = express();
const port = 5000;

// middleware

app.use(cors({
    origin: ['http://localhost:5173']
}));

app.use(express.json());

app.use('/user',UserRouter);
app.use('/furniture',FurnitureRouter);
app.use('/util',utilRouter);
app.use(express.static('./uploads'));

//creating a route (rounting)
app.get('/',(req,res)=> {
    res.send('response from express server');
} );
app.get('/add',(req,res)=> {
    res.send('add response from server');
} );
app.get('/getall',(req,res)=> {
    res.send('getall response from server');
} );
app.get('/update',(req,res)=> {
    res.send('update response from server');
} );
app.get('/delete',(req,res)=> {
    res.send('delete response from server');
} );
//starting express server
app.listen( port, ()=> { console.log('server started');});