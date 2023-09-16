const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Mutes a member mentioned.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member you want to mute.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("Set the duration of the timeout.")
        .setMinValue(1)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Provide a reason for the timeout.")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("member");
    let reason = interaction.options.getString("reason");
    const duration = interaction.options.getInteger("duration");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided";
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return await interaction.reply({
        content: "You don't have permission to use this command. ",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setColor("Random")
      .setTitle("Muted from a Server")
      .setDescription(
        `You have been muted from ${interaction.guild.name}.\nReason: ${reason}\nDuration: ${duration}min`
      )
      .setTimestamp(Date.now());

    await user.send({
      embeds: [embed],
    });

    await member.timeout(duration * 60 * 1000, reason).catch(console.error);

    await interaction.reply({
      content: `Muted ${user.username} successfully!`,
      ephemeral: true,
    });
  },
};
