// eslint-disable-next-line
const users = require("./usersDataBase.json")

module.exports = {
 
  async up(db) {
  await db.collection("users").insertMany(users);
  },

 
  /*async down(db) {
    
  }*/
};
