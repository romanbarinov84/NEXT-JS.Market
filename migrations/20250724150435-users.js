// eslint-disable-next-line @typescript-eslint/no-require-imports
const users = require("./users.json"); // относительный путь

module.exports = {
  async up(db, ) {
    await db.collection("users").insertMany(users);
  },

  async down(db, ) {
    // Откат: удалить добавленные статьи (если есть поле _id в JSON, можно удалить по ним)
    await db.collection("users").deleteMany({});
  }
};
