export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert("events", [
    {
      title: "I Simposio de Cardiologia",
      date: "2026-05-15",
      category: "Simposio",
      status: "upcoming",
      description: "Um evento focado nas inovacoes da cardiologia moderna.",
      image: "https://picsum.photos/seed/cardio/800/400",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Workshop de Sutura",
      date: "2026-04-20",
      category: "Workshop",
      status: "upcoming",
      description: "Pratica intensiva de sutura para academicos.",
      image: "https://picsum.photos/seed/sutura/800/400",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Congresso de Neurologia",
      date: "2025-11-10",
      category: "Congresso",
      status: "past",
      description: "Discussoes sobre os avancos na neurociencia.",
      image: "https://picsum.photos/seed/neuro/800/400",
      createdAt: now,
      updatedAt: now,
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete(
    "events",
    {
      title: {
        [Sequelize.Op.in]: [
          "I Simposio de Cardiologia",
          "Workshop de Sutura",
          "Congresso de Neurologia",
        ],
      },
    },
    {}
  );
}
