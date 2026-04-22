import bcrypt from "bcrypt";

export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert("users", [
    {
      name: "Administrador Colig",
      username: "admin",
      email: "admin@colig.com",
      password: bcrypt.hashSync("admin", 10),
      createdAt: now,
      updatedAt: now,
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete(
    "users",
    {
      email: {
        [Sequelize.Op.in]: ["admin@colig.com"],
      },
    },
    {}
  );
}
