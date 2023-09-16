const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: `misc`,
  },
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTitle(`ALL MISCELLANOUS/COMMUNITY COMMANDS!`)
      .setDescription(
        `Join the support server at [K1LLUA-FAM](https://discord.gg/4bAXjUrJY9). Also access the [Github Repository](https://github.com/avijitpandit106/Prototype).`
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor("Random")
      .addFields([
        {
          name: "meme",
          value: "Displays random memes from the internet.",
          inline: false,
        },
        {
          name: "warnings",
          value: "Get warning for a user.",
          inline: false,
        },
        {
          name: "wordle",
          value: "A Classic wordle game for the discord server.",
          inline: false,
        },
        {
          name: "tictactoe",
          value: "A Classic tictactoe game for the discord server.",
          inline: false,
        },
        {
          name: "pokemon",
          value: "A Classic Guess the pokemon game for the discord server.",
          inline: false,
        },
        {
          name: "hangman",
          value: "A Classic hangman game for the discord server.",
          inline: false,
        },
        {
          name: "rockpaperscissors",
          value: "A Classic rockpaperscissors game for the discord server.",
          inline: false,
        },
        {
          name: "8ball",
          value: "A Classic 8ball game for the discord server.",
          inline: false,
        },
        {
          name: "chatgpt",
          value: "Ask chatgpt a question.",
          inline: false,
        },
        {
          name: "image-generator",
          value: "Generate a Ai image.",
          inline: false,
        },
        {
          name: "report",
          value: "Report a member in the discord server.",
          inline: false,
        },
        {
          name: "wiki",
          value: "Search wikipedia for a Topic.",
          inline: false,
        },
      ])
      .setFooter({
        text: "All of these commands doesn't require any special permission.",
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
