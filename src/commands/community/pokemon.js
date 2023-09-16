const { GuessThePokemon } = require("discord-gamecord");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Guess the pokemon game for discord server."),
  async execute(interaction, client) {
    const Game = new GuessThePokemon({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: "Who's That Pokemon",
        color: "#5865F2",
      },
      timeoutTime: 60000,
      winMessage: "You guessed it right! It was a {pokemon}.",
      loseMessage: "Better luck next time! It was a {pokemon}.",
      errMessage: "Unable to fetch pokemon data! Please try again.",
      playerOnlyMessage: "Only {player} can use these buttons.",
    });

    Game.startGame();

    Game.on("gameOver", result => {
        return;
    })
  },
};
