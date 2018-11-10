var expect =require('expect');
var{generateMessage}=require('./message');
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
