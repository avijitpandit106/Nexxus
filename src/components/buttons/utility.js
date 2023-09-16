const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `utility`,
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(`ALL UTITLITY COMMANDS!`)
      .setDescription(
        `Join the support server at [K1LLUA-FAM](https://discord.gg/4bAXjUrJY9). Also access the [Github Repository](https://github.com/avijitpandit106/Prototype).`
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("Random")
      .addFields([
        {
          name: "ping",
          value: "Displays the latency of the client",
          inline: false,
        },
        {
          name: "support",
          value: "Provide support links.",
          inline: false,
        },
        {
          name: "setup-welcome",
          value: "Setup a welcome channel with a custom welcome message.",
          inline: false,
        },
        {
          name: "info",
          value: "Displays info about a user mentioned or the Server.",
          inline: false,
        },
        {
          name: "invite",
          value: "Invite the discord bot to your server.",
          inline: false,
        },
      ])
      .setFooter({
        text: "Some of these commands might require special permissions to use.",
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
