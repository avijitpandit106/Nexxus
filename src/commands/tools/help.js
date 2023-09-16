const {
  SlashCommandBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows list of all commands."),
  async execute(interaction, client) {
    const utility = new ButtonBuilder()
      .setCustomId("utility")
      .setLabel("Utility Commands")
      .setStyle(ButtonStyle.Primary);

    const moderation = new ButtonBuilder()
      .setCustomId("moderation")
      .setLabel("Moderation Commands")
      .setStyle(ButtonStyle.Danger);

    const misc = new ButtonBuilder()
      .setCustomId("misc")
      .setLabel("Miscellanous Commands")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(utility, moderation, misc);

    await interaction.reply({
      content:
        "Choose the appropriate button for the help of specfic command category.",
      components: [row],
    });
  },
};
