const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks a channel provided.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to lock.")
        .addChannelTypes(
          ChannelType.GuildText,
          ChannelType.GuildForum,
          ChannelType.PrivateThread,
          ChannelType.PublicThread,
          ChannelType.GuildCategory
        )
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { guild, options } = interaction;

    if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels))
      return interaction.reply({
        content: "I don't have permissions to use this command.",
        ephemeral: true,
      });

    const channel = options.getChannel("channel");

    channel.permissionOverwrites.create(guild.id, { SendMessages: false });

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`:white_check_mark: ${channel} was successfully locked.`)
      .setTimestamp(Date.now());

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
