const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a member mentioned.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member you want to ban.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Provide a reason for the ban.")
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("member");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason provided";
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
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
      .setTitle("Banned from a Server")
      .setDescription(
        `You have been banned from ${interaction.guild.name}.\nReason: ${reason}`
      )
      .setTimestamp(Date.now());

    await user.send({
      embeds: [embed],
    });

    await member
      .ban({
        deleteMessageSeconds: 60 * 60 * 24 * 7,
        reason: reason,
      })
      .catch(console.error);

    await interaction.reply({
      content: `Banned ${user.username} successfully!`,
      ephemeral: true,
    });
  },
};
