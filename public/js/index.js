var socket=io();
socket.on('connect',function () {
  console.log('Connected to server');
  // socket.emit('CreateEmail',{
  //   to:'sarika@example.com',
  //   text:'hey'
  // });

});
socket.on('disconnect',function () {
  console.log('Disconnected to server');
});
// socket.on('newEmail',function (email) {
//   console.log('New Email',email);
// });
socket.on('newMessage',function (message){
  console.log('New Message recieved. ',message);
});
