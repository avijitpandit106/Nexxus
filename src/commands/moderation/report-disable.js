const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const reportSchema = require("../../models/report");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report-disable")
    .setDescription("Disables the report system for the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction, client) {
    const { guild } = interaction;

    if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageGuild))
      return interaction.reply({
        content: "I don't have permissions to use this command.",
        ephemeral: true,
      });

    const embed = new EmbedBuilder();

    reportSchema
      .deleteMany({ Guild: guild.id })
      .exec()
      .then((data) => {
        embed
          .setColor("Blue")
          .setDescription("Successfully deleted report system.");

        interaction.reply({
          embeds: [embed],
        });
      })
      .catch((err) => {
        console.error(err);
        return interaction.reply({
          content: "Something went wrong. Try again later...",
          ephemeral: true,
        });
      });
  },
};
