// eslint-disable-next-line @typescript-eslint/no-require-imports
const products = require("./dataBase.json"); // относительный путь

module.exports = {
  async up(db, ) {
    await db.collection("products").insertMany(products);
  },

  async down(db, ) {
    // Откат: удалить добавленные статьи (если есть поле _id в JSON, можно удалить по ним)
    await db.collection("products").deleteMany({});
  }
};
