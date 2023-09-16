const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Clears the amount of messages entered.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to delete.")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const amount = interaction.options.getInteger("amount");
    const channel = interaction.channel;

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    )
      return await interaction.reply({
        content: "You don't have permission to use this command. ",
        ephemeral: true,
      });
    if (!amount)
      return await interaction.reply({
        content: "Please specify the amount of messages you want to delete.",
        ephemeral: true,
      });
    if (amount > 100 || amount < 1)
      return await interaction.reply({
        content: "Please select a number between 1 and 100",
        ephemeral: true,
      });

    await interaction.channel.bulkDelete(amount).catch(console.error);

    await interaction.reply({
      content: `${amount} messages deleted.`,
      ephemeral: true,
    });
  },
};
