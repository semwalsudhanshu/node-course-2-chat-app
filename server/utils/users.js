[{
  id:'',
  Name:'',
  Room:''
}]
//Add user method
//Removing a user
//Fetch a user
// GetUserlist

class Users {
  constructor(){
    this.users=[];
  }
  addUser(id,Name,Room){
    var user ={id,Name,Room};
    this.users.push(user);
    return user;
  }
  removeUser (id){
    var user =this.getUser(id);
    if(user)
    {
      this.users=this.users.filter((user)=>user.id!==id);
    }
    return user;

  }

  getUser(id){
    return this.users.filter((user)=>user.id===id)[0];
  }

  getUserList(Room){
    var users=this.users.filter((user)=>{
      return user.Room===Room;
    });
    var namesArray=users.map((user)=>{
      return user.Name;
    });
    return namesArray;
  }
}

module.exports ={Users:Users};
