require('dotenv').config();
const express=require('express');
const path = require("path");
const http=require('http');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const socketIo = require('socket.io');
const message=require('./Models/message');
const ocena=require('./Models/ocena');
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.pjgvfkj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
    console.log("Connection connected");
}).catch((e)=>{
    console.log(e);
});
//Routes
const postRouter=require('./Route/post');
const majstorRouter=require('./Route/majstor');
const lokacijaRouter=require('./Route/lokacija');
const kategorijeRouter=require("./Route/kategorije");
const korisnikRouter=require("./Route/korisnik");
const ocenaRouter=require("./Route/ocena");
const messageRouter=require("./Route/message");
//App settings
const app=express();
const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  };
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use("/images/",express.static("images"));
app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(  "Access-Control-Allow-Headers",   "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",  
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"); 
    next();  
});
//Setting routes
app.use("/post",postRouter);
app.use("/majstor",majstorRouter);
app.use("/lokacija",lokacijaRouter);
app.use("/kategorije",kategorijeRouter);
app.use("/korisnik",korisnikRouter);
app.use("/ocena",ocenaRouter);
app.use("/message",messageRouter);
const server=http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:4200", 
      methods: ["GET", "POST"]
    }
  });
io.on('connection',(socket)=>{
    console.log("New client je povezan");
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`Client joined room: ${room}`);
      });
    socket.on('leaveRoom',(room)=>{
        socket.leave(room);
        console.log('Client left room '+room);
    });
    socket.on('sendMessage',async(data)=>{
        const {sadrzaj,korisnik,chat}=data;
        const newMessage=new message({sadrzaj:sadrzaj,korisnik:korisnik,chat:chat,datum:Date.now()});
        await newMessage.save();
        await ocena.findOneAndUpdate({_id:chat},{lastMessage:newMessage._id});
        io.to(chat).emit("newMessage",newMessage);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
});
server.listen(3000);