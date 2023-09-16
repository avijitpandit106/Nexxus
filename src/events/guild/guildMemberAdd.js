const { EmbedBuilder } = require("discord.js");
const welcomeSchema = require("../../models/welcome");

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    welcomeSchema
      .findOne({ Guild: member.guild.id })
      .exec()
      .then((data) => {
        if (!data) return;

        let channel = data.Channel;
        let message = data.Message || " ";
        let role = data.Role;

        const { user, guild } = member;
        const welcomeChannel = member.guild.channels.cache.get(channel);

        const welcomeEmbed = new EmbedBuilder()
          .setTitle("**New Member**")
          .setDescription(message)
          .setThumbnail(user.displayAvatarURL())
          .setColor("Default")
          .addFields([
            {
              name: `User:`,
              value: `${user.username}`,
              inline: true,
            },
            {
              name: "Total member",
              value: `${guild.memberCount}`,
              inline: true,
            },
          ])
          .setTimestamp(Date.now());

        welcomeChannel.send({
          embeds: [welcomeEmbed],
        });

        member.roles.add(role);
      })
      .catch(console.error);
  },
};
