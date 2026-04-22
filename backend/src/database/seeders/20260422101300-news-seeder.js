export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert("news", [
    {
      title: "Abertura de Editais para Ligas",
      date: "2026-04-01",
      summary:
        "Confira as datas e requisitos para participar das ligas academicas neste semestre.",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Nova parceria com o Hospital Municipal",
      date: "2026-03-15",
      summary:
        "Alunos terao mais oportunidades de estagio pratico a partir do proximo mes.",
      createdAt: now,
      updatedAt: now,
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete(
    "news",
    {
      title: {
        [Sequelize.Op.in]: [
          "Abertura de Editais para Ligas",
          "Nova parceria com o Hospital Municipal",
        ],
      },
    },
    {}
  );
}
