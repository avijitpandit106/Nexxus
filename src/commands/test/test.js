const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("This is a test command."),

  async execute(interaction, client) {
    await interaction.reply({
      content: "Prototype is running correctly.",
    });
  },
};
