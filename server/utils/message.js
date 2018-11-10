var generateMessage =(from,text)=>{
  return {
    from:from,
    text:text,
    createdat:new Date().getTime()
  };
};
module.exports ={generateMessage:generateMessage};
