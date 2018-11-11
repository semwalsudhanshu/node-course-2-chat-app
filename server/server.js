const path =require('path');
const http =require('http');
const express=require('express');
const socketIO=require('socket.io');
const {Users}=require('./utils/users.js');
const {generateMessage,generateLocationMessage}=require('./utils/message.js');
const {isRealString} =require('./utils/validation.js');
const publicPath =path.join(__dirname,'../public');
const port= process.env.PORT||3000;
//console.log(__dirname + '/../public');
console.log(publicPath);

var app =express();
var server =http.createServer(app);
var io =socketIO(server);
var users =new Users();
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New user connected');
  // socket.emit('newEmail',{
  //   from:'Sudhanshu@example.com',
  //   text:'hello',
  //   createdat:123
  // });


   socket.on('join',(params,callback)=>{
     if(!isRealString(params.Name) || !isRealString(params.Room))
            {
              return callback('Name and Room name are required');
            }
            socket.join(params.Room);
            users.removeUser(socket.id);
            users.addUser(socket.id,params.Name,params.Room);
            io.to(params.Room).emit('updateUserList',users.getUserList(params.Room));
            //socket.leave(params.Room);


            socket.emit('newMessage',generateMessage('Admin','Welcome to the the chat app'));
            socket.broadcast.to(params.Room).emit('newMessage',generateMessage('Admin', params.Name+' has joined'));

            callback();

   });
  // socket.on('CreateEmail',(newEmail)=>{
  //   console.log('createEmail',newEmail);
  // });
  socket.on('createMessage',(newMessage,callback)=>{
    console.log('New Message Recieved from the client to server',newMessage);
    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
    callback();
    // socket.broadcast.emit('newMessage',{
    //   from:newMessage.from,
    //   text:newMessage.text,
    //   createdat:new Date().getTime()
    // });
  });
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));

  });

  socket.on('disconnect',()=>{
    var user=users.removeUser(socket.id);
    if(user)
    {
      io.to(user.Room).emit('updateUserList',users.getUserList(user.Room));
      io.to(user.Room).emit('newMessage',generateMessage('Admin',user.Name+' has left the chat'));
    }
    console.log('Server Disconnected');
  });
});

server.listen(port,()=>{
  console.log('server is up on port 3000');
});
