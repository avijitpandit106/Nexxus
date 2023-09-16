const { Hangman } = require("discord-gamecord");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hangman")
    .setDescription("A classic hangman game for the discord server."),
  async execute(interaction, client) {
    const Game = new Hangman({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: "Hangman",
        color: "#5865F2",
      },
      hangman: {
        hat: "🎩",
        head: "😟",
        shirt: "👕",
        pants: "🩳",
        boots: "👞👞",
      },
      customWord: null,
      timeoutTime: 60000,
      winMessage: "You won! The word was **{word}**.",
      loseMessage: "You lost! The word was **{word}**.",
      playerOnlyMessage: "Only {player} can use these buttons.",
    });

    Game.startGame();

    Game.on("gameOver", (result) => {
      return;
    });
  },
};
