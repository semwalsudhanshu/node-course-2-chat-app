var socket=io();

function scrollToBottom () {
  var messages =jQuery('#messages');
  var newMessage =messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight =messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight=newMessage.prev().innerHeight();
  if(scrollTop+clientHeight+newMessageHeight+lastMessageHeight>=scrollHeight)
  {
    messages.scrollTop(scrollHeight);
  }
}
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
   var formattedTime=moment(message.createdat).format('h:mm:a');
    var template =jQuery('#message-template').html();
    var html=Mustache.render(template,{
      text:message.text,
      from:message.from,
      createdat:formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();

  // console.log('New Message recieved. ',message);
  // var li =jQuery('<li></li>');
  // li.text(message.from+' '+formattedTime+':'+message.text);
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function(message){
  var formattedTime=moment(message.createdat).format('h:mm:a');
  var template=jQuery('#location-message-template').html();
  var html=Mustache.render(template,{
    from:message.from,
    url:message.url,
    createdat:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li=jQuery('<li></li>');
  // var a =jQuery('<a target = "_blank">My current location</a>');
  // li.text(message.from+' '+formattedTime+' : ');
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});
// socket.emit('createMessage',{
//   from:'Frank',
//   text:'Hi'
// },function (data){
//   console.log('Got it',data);
// });

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextbox=jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messageTextbox.val()
  },function(){
    messageTextbox.val('');
  });
});
var locationButton =jQuery('#send-location');
locationButton.on('click',function (){
  if(!navigator.geolocation){
    return alert('Geolocation Not Supported By your Browser');
  }

  locationButton.attr('disabled','diasbled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function (){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
