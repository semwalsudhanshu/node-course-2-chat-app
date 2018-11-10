const moment =require('moment');
var generateMessage =(from,text)=>{
  return {
    from:from,
    text:text,
    createdat:moment().valueOf()
  };
};


var generateLocationMessage=(from,latitude,longitude)=>
{
  return {
    from:from,
    url:'https://www.google.com/maps/?q='+latitude+','+longitude,
    createdat:moment().valueOf()
  };
};
module.exports ={generateMessage:generateMessage,
                generateLocationMessage:generateLocationMessage};
