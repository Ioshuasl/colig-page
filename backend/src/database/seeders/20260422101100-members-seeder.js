export async function up(queryInterface) {
  const now = new Date();

  await queryInterface.bulkInsert("members", [
    {
      name: "Dr. Joao Silva",
      role: "Presidente",
      description: "Professor e pesquisador com foco em gestao academica.",
      image: "https://picsum.photos/seed/joao/400/400",
      createdAt: now,
      updatedAt: now,
    },
    {
      name: "Ana Souza",
      role: "Vice-Presidente",
      description: "Responsavel por apoio institucional e eventos academicos.",
      image: "https://picsum.photos/seed/ana/400/400",
      createdAt: now,
      updatedAt: now,
    },
    {
      name: "Carlos Mendes",
      role: "Diretor Cientifico",
      description: "Coordenacao de projetos cientificos e producao tecnica.",
      image: "https://picsum.photos/seed/carlos/400/400",
      createdAt: now,
      updatedAt: now,
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete(
    "members",
    {
      name: {
        [Sequelize.Op.in]: ["Dr. Joao Silva", "Ana Souza", "Carlos Mendes"],
      },
    },
    {}
  );
}
