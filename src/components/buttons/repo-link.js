module.exports = {
    data: {
        name: `repo-link`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://github.com/avijitpandit106/Prototype`
        });
    }
} 