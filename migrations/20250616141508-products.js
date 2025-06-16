// eslint-disable-next-line
const products = require("./productsDataBase.json")

module.exports = {

  async up(db) {
  await db.collection("products").insertMany(products);
  },

 
 /* async down(db) {
  
  }*/
};
