const expect=require('expect');
const {Users}=require('./users.js');
describe('Users',()=>{
  var users;
  beforeEach(()=>{
    users=new Users();
    users.users=[{
      id:'1',
      Name:'Sudhanshu',
      Room:'Node course'
    },{
      id:'2',
      Name:'Himanshu',
      Room:'React course'
    },{
      id:'3',
      Name:'Sarika',
      Room:'Node course'
    }];
  });
  it('should add a new user',()=>{
    var users= new Users();
    var user={
      id:'123',
      Name:'Sudhanshu',
      Room:'Office'
    };
    var resUser =users.addUser(user.id,user.Name,user.Room);
    expect(users.users).toEqual([user]);
  });
  it('should remove a user',()=>{
    var userId='1';
    var user=users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);

  });
  it('should not remove user',()=>{
    var userId='156';
    var user=users.removeUser(userId);
    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);

  });
  it('should find user',()=>{
    var userId='1';
    var user=users.getUser(userId);
    expect(user.id).toBe(userId);

  });
  it('should not find user',()=>{
    var userId='256';
    var user=users.getUser(userId);
    expect(user).toBe(undefined);

  });
  it('should return names for node course',()=>{
    var userList=users.getUserList('Node course');
    expect(userList).toEqual(['Sudhanshu','Sarika']);
  });
  it('should return names for React course',()=>{
    var userList=users.getUserList('React course');
    expect(userList).toEqual(['Himanshu']);
  });
});
