const expect = require('expect');;

const {Users} = require('./users');

describe('users array', ()=>{
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
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
  })

  it('shoudl add new user', ()=>{
    let users = new Users();
    let user = {
      id: '123',
      name: 'test',
      room: 'T'
    };

    let responseUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  })

  it('should remove user with specific id', () => {
    let user = {
      id: '123',
      name: 'Ann',
      room: 'B'
    }
    let removedUser = users.removeUser('123');
    expect(removedUser).toEqual(user);
  })

  it('should return false for uknnown user id ', () => {
    
    let removedUser = users.removeUser('0');
    expect(removedUser).toBeFalsy();
  })

  it('should get user with specific id', ()=>{
    let user = {
      id: '123',
      name: 'Ann',
      room: 'B'
    };

    let getUser = users.getUser('123');
    expect(user).toEqual(getUser);
  })

  it('should return undefined for unnknown id', ()=>{
    let getUknnownUser = users.getUser('8');
    expect(getUknnownUser).toBeFalsy();
  })

  it('should get users name from specific room', () => {
    let usersName = ['Enn'];
    let filteredUsers = users.getUserList('A');
    expect(filteredUsers).toEqual(usersName);
  })

  it('should return empty array for uknnown room', () => {
    let filteredUsers = users.getUserList('Z');
    expect(filteredUsers.length).toBe(0);
  })
})