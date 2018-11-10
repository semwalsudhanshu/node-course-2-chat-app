var generateMessage =(from,text)=>{
  return {
    from:from,
    text:text,
    createdat:new Date().getTime()
  };
};


var generateLocationMessage=(from,latitude,longitude)=>
{
  return {
    from:from,
    url:'https://www.google.com/maps/?q='+latitude+','+longitude,
    createdat:new Date().getTime()
  };
};
module.exports ={generateMessage:generateMessage,
                generateLocationMessage:generateLocationMessage};
