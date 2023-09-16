const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a member mentioned.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member you want to kick.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Provide a reason for the kick.")
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("member");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided";
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
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
      .setTitle("Kicked from a Server")
      .setDescription(
        `You have been kicked from ${interaction.guild.name}.\nReason: ${reason}`
      )
      .setTimestamp(Date.now());

    await member.send({
      embeds: [embed],
    });

    await member.kick(reason).catch(console.error);

    await interaction.reply({
      content: `Kicked ${user.username} successfully!`,
      ephemeral: true,
    });
  },
};
