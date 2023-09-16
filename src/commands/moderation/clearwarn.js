const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const warningSchema = require("../../models/warns");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearwarn")
    .setDescription("Clear the warning of the member mentioned.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you want to clearn warnings of.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { guild, options, user } = interaction;

    if (!guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
      return interaction.reply({
        content: "I don't have permissions to use this command.",
        ephemeral: true,
      });

    const target = options.getUser("target");

    const embed = new EmbedBuilder();

    await warningSchema
      .findOne({
        GuildID: guild.id,
        UserId: target.id,
        Username: target.username,
      })
      .exec()
      .then((data) => {
        if (data) {
          warningSchema.findOneAndDelete({
            GuildID: guild.id,
            UserId: target.id,
            Username: target.username,
          }).exec();
          embed
            .setColor("Green")
            .setDescription(
              `:white_check_mark: Successfully cleared warnings for ${target}`
            );
          interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply({
            content: `${target.username} has no warnings to be cleared.`,
            ephemeral: true,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
