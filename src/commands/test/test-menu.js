const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test-menu")
    .setDescription("This is a test select menu command."),

  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("test")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new StringSelectMenuOptionBuilder(
          {
            label: "test-1",
            value: "test#1",
          },
          new StringSelectMenuOptionBuilder({
            label: "test-2",
            value: "test#2",
          })
        )
      );

    const row = new ActionRowBuilder().addComponents(menu);

    await interaction.reply({
      components: [row],
    });
  },
};
