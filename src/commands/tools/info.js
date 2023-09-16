const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription(
      "Displays info about a user mentioned or the Server."
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("user")
        .setDescription("Displays info about the user mentioned.")
        .addUserOption((option) =>
          option
            .setName("member")
            .setDescription("The member whose info is to be displayed.")
            .setRequired(false)
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("server")
        .setDescription("Displays info about the server.")
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "user") {
      let member = interaction.options.getUser("member");
      if (!member) member = interaction.user;
      const serverMember = await interaction.guild.members.fetch(member.id);

      const embeduser = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTitle(`${serverMember}'s **INFO**`)
        .setColor("Random")
        .setThumbnail(member.displayAvatarURL())
        .addFields([
          {
            name: "Username",
            value: `${member.username}`,
            inline: false,
          },
          {
            name: "UserID",
            value: `${member.id}`,
            inline: false,
          },
          {
            name: "Server Joined at",
            value: `<t:${Math.floor(
              serverMember.joinedAt.getTime() / 1000
            )}:R>`,
            inline: false,
          },
          {
            name: "Account Created at",
            value: `<t:${Math.floor(member.createdAt.getTime() / 1000)}:R>`,
            inline: false,
          },
        ])
        .setTimestamp(Date.now());
      await interaction.reply({
        embeds: [embeduser],
      });
    } else if (interaction.options.getSubcommand() === "server") {
      const guild = interaction.guild;
      const owner = guild.ownerId;

      const embedserver = new EmbedBuilder()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setTitle("**SERVER INFO**")
        .setColor("Random")
        .setThumbnail(guild.iconURL())
        .addFields([
          {
            name: "Server Name",
            value: `${guild.name}`,
            inline: false,
          },
          {
            name: "Server id",
            value: `${guild.id}`,
            inline: false,
          },
          {
            name: "Server owner",
            value: `<@${owner}>`,
          },
          {
            name: "Memeber count",
            value: `${guild.memberCount}`,
            inline: false,
          },
        ])
        .setTimestamp(Date.now());

      await interaction.reply({
        embeds: [embedserver],
      });
    }
  },
};
