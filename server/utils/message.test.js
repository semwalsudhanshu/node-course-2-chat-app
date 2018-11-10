var expect =require('expect');
var{generateMessage,generateLocationMessage}=require('./message');
describe('Generate Message',()=>{
  it('should Generate the correct message object',()=>{
      var from ='Sudhanshu';
      var text ="Hello";
      var message =generateMessage(from,text);
      expect(message.from).toBe(from);
      expect(message.text).toBe(text);
      expect(typeof message.createdat).toBe('number');
  });
});

describe('Generate location message',()=>{
  it('should generate coorect location object',()=>{
    var from ='Admin';
    var latitude=95;
    var longitude=75;
    var url ='https://www.google.com/maps/?q=95,75';
    var locationurl=generateLocationMessage(from,latitude,longitude);
    expect(locationurl.from).toBe(from);
    expect(locationurl.url).toBe(url);
    expect(typeof locationurl.createdat).toBe('number');
  });
});
