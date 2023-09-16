const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User ID to unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the unban.")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const userID = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return await interaction.reply({
        content: "You don't have permission to use this command.",
        ephemeral: true,
      });

    if (!reason) reason = "No reason provided";

    await interaction.guild.bans.fetch().then(async (bans) => {
      if (bans.size == 0)
        return await interaction.reply({
          content: "There are no banned members in the server.",
          ephemeral: true,
        });
      let bannedID = bans.find((ban) => ban.user.id == userID);

      if (!bannedID)
        return await interaction.reply({
          content: "The specified user is not banned in the server.",
          ephemeral: true,
        });

      await interaction.guild.bans.remove(userID, reason).catch(console.error);
    });

    await interaction.reply({
      content: `<@${userID} has been unbanned>`,
      ephemeral: true,
    });
  },
};
