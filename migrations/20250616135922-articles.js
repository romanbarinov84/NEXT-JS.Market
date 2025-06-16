// eslint-disable-next-line
const articles = require("./articlesDataBase.json");


module.exports = {

  async up(db) {
   await db.collection("articles").insertMany(articles);
  },


 /* async down(db) {
   
}*/
};