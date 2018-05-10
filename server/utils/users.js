let users = [{
  id: '123',
  name: 'Ann',
  room: 'B'
},{
  id: '456',
  name: 'Bnn',
  room: 'C'
},
{
  id: '789',
  name: 'Cnn',
  room: 'B'
},
{
  id: '741',
  name: 'Dnn',
  room: 'C'
},
{
  id: '852',
  name: 'Enn',
  room: 'A'
}]

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    let ind = this.users.findIndex(user => user.id === id);
    if (ind !== -1) {
      let removedUser = this.users.splice(ind, 1);
      return removedUser[0];
    }
    return false;
  }

  getUser (id) {
    return this.users.find(user => user.id === id);
  }

  getUserList (room) {
    let usersList = this.users.reduce((namesList, currentUser)=>{
      if (currentUser.room === room) {
        namesList.push(currentUser.name)
      }
      return namesList;
    }, []);
    return usersList;
  }
}

module.exports = {
  Users
}