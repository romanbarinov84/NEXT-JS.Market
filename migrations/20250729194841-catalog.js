// eslint-disable-next-line @typescript-eslint/no-require-imports
const catalog = require("./catalogDataBase.json"); // относительный путь

module.exports = {
  async up(db, ) {
    await db.collection("catalog").insertMany(catalog);
  },

  async down(db, ) {
    // Откат: удалить добавленные статьи (если есть поле _id в JSON, можно удалить по ним)
    await db.collection("catalog").deleteMany({});
  }
};
