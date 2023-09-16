const { Wordle } = require("discord-gamecord");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wordle")
    .setDescription("Start the wordle game in the discord server."),
  async execute(interaction, client) {
    const game = new Wordle({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: "wordle",
        color: "#5865F2",

      },
      customWord: null,
      timeoutTime: 60000,
      winMessage: "You won! The word was **{word}**",
      loseMessage: "You lost! The word was **{word}**",
      playerOnyMessage: "Only {player} can use this buttons",
    });

    game.startGame();

    game.on("gameOver", (result) => {
       return;
    });
  },  
};
