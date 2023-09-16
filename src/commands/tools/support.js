const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Provide support links.'),
    async execute(interaction, client) {
        const discord = new ButtonBuilder()
            .setCustomId('support-link')
            .setLabel('Support Server')
            .setStyle(ButtonStyle.Primary)

        const github = new ButtonBuilder()
            .setCustomId('repo-link')
            .setLabel('Github Repo')
            .setStyle(ButtonStyle.Secondary)

        const row = new ActionRowBuilder()
            .addComponents(discord, github);

        await interaction.reply({
            components: [row]
        });
    }
}