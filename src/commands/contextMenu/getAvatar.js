const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("getAvatar")
    .setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`<@${interaction.targetUser.id}>'s Avatar`)
        .setImage(`${interaction.targetUser.displayAvatarURL()}`)
        await interaction.reply({ embeds: [embed] })
    }
};
