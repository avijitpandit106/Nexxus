module.exports = {
    data: {
        name: `support-link`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://discord.gg/4bAXjUrJY9`
        });
    }
}