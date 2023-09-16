module.exports = {
  data: {
    name: "test",
  },

  async execute(interaction, client) {
    await interaction.reply({ content: "This is a test select menu." });
  },
};
