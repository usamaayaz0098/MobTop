const users = [];

function userJoin( id , mt , mf ){
  const user = { id  , mt , mf };
  users.push(user);
  return user;
}

function getCurrentUser(id){
  return users.find(user => user.id === id);
}

module.exports = {
  userJoin,
  getCurrentUser
};
