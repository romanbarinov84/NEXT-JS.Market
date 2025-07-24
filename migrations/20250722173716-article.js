// eslint-disable-next-line @typescript-eslint/no-require-imports
const articles = require("./articlesDataBase.json"); // относительный путь

module.exports = {
  async up(db, ) {
    await db.collection("articles").insertMany(articles);
  },

  async down(db, ) {
    // Откат: удалить добавленные статьи (если есть поле _id в JSON, можно удалить по ним)
    await db.collection("articles").deleteMany({});
  }
};
