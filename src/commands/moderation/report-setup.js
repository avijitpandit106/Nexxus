const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const reportSchema = require("../../models/report");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report-setup")
    .setDescription("Sets up a report system for the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want the report to be sent in.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { guild, options } = interaction;

    if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageGuild))
      return interaction.reply({
        content: "I don't have permissions to use this command.",
        ephemeral: true,
      });

    const channel = options.getChannel("channel");
    const embed = new EmbedBuilder();

    reportSchema
      .findOne({ Guild: guild.id })
      .exec()
      .then((data) => {
        if (!data) {
          reportSchema.create({
            Guild: guild.id,
            Channel: channel.id,
          });

          embed
            .setColor("Green")
            .setDescription(
              `:white_check_mark: Successfully created report system. All reports will be sent in ${channel}`
            );

          interaction.reply({
            embeds: [embed],
          });
        } else if (data) {
          const repChannel = client.channels.cache.get(data.Channel);
          embed
            .setColor("Green")
            .setDescription(
              `Your report system has already been set to ${repChannel}`
            );
          interaction.reply({
            embeds: [embed],
          });
        }
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
