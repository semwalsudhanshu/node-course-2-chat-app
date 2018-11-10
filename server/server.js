const path =require('path');
const http =require('http');
const express=require('express');
const socketIO=require('socket.io');
const {generateMessage}=require('./utils/message.js');

const publicPath =path.join(__dirname,'../public');
const port= process.env.PORT||3000;
//console.log(__dirname + '/../public');
console.log(publicPath);

var app =express();
var server =http.createServer(app);
var io =socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New user connected');
  // socket.emit('newEmail',{
  //   from:'Sudhanshu@example.com',
  //   text:'hello',
  //   createdat:123
  // });

   socket.emit('newMessage',generateMessage('Admin','Welcome to the the chat app'));
   socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));
  // socket.on('CreateEmail',(newEmail)=>{
  //   console.log('createEmail',newEmail);
  // });
  socket.on('createMessage',(newMessage)=>{
    console.log('New Message Recieved from the client to server',newMessage);
    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
    // socket.broadcast.emit('newMessage',{
    //   from:newMessage.from,
    //   text:newMessage.text,
    //   createdat:new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('Server Disconnected');
  });
});

server.listen(port,()=>{
  console.log('server is up on port 3000');
});
