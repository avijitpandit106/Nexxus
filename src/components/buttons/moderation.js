const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `moderation`,
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(`ALL MODERATION COMMANDS!`)
      .setDescription(
        `Join the support server at [K1LLUA-FAM](https://discord.gg/4bAXjUrJY9). Also access the [Github Repository](https://github.com/avijitpandit106/Prototype).`
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("Random")
      .addFields([
        {
          name: "kick",
          value: "Kicks a user from the server.",
          inline: false,
        },
        {
          name: "ban",
          value: "Bans a user from the server.",
          inline: false,
        },
        {
          name: "unban",
          value: "Unbans a user from the server.",
          inline: false,
        },
        {
          name: "timeout",
          value: "Mutes a member mentioned.",
          inline: false,
        },
        {
          name: "purge",
          value: "Clears the amount of messages entered.",
          inline: false,
        },
        {
          name: "ticket-setup",
          value: "Create a ticket message in the server.",
          inline: false,
        },
        {
          name: "transcript",
          value: "Transcript the specified channel.",
          inline: false,
        },
        {
          name: "lock",
          value: "Locks a channel provided.",
          inline: false,
        },
        {
          name: "unlock",
          value: "Unlocks a channel provided.",
          inline: false,
        },
        {
          name: "warn",
          value: "Warns a member mentioned.",
          inline: false
        },
        {
          name: 'clearwarn',
          value: "Clears  warnings from the user.",
          inline: false
        },
        {
          name: 'report-setup',
          value: "Setup a report system in the server.",
          inline: false
        },
        {
          name: 'report-disable',
          value: "Disables a report system in the server.",
          inline: false
        },
        {
          name: 'automod',
          value: "Create automod rules for the server.",
          inline: false
        },
      ])
      .setFooter({
        text: "All of the commands require special permissions to be able to use in the server.",
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
