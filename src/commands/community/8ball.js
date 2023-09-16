const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("A classic 8ball game.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question for the 8ball.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { user, options } = interaction;

    const question = options.getString("question");
    const choice = [
      "🎱| It is certian.",
      "🎱| It is decidedly so.",
      "🎱| Without a doubt.",
      "🎱| Yes definitely.",
      "🎱| You may rely on it.",
      "🎱| As I see it, yes.",
      "🎱| Most likely.",
      "🎱| Outlook good.",
      "🎱| Yes.",
      "🎱| Signs point to yes.",
      "🎱| Reply hazy, try again.",
      "🎱| Ask again later.",
      "🎱| Better not tell you now.",
      "🎱| Cannot predict now.",
      "🎱| Concentrate and ask again.",
      "🎱| Don't count on it.",
      "🎱| My reply is no.",
      "🎱| My sources say no.",
      "🎱| Outlook not so good.",
      "🎱| Very doubtful.",
    ];
    const ball = Math.floor(Math.random() * choice.length);

    const qEmbed = new EmbedBuilder()
      .setColor("Purple")
      .setTitle(`🎱| ${user.username}'s 8ball game.`)
      .addFields({ name: "Question", value: `${question}`, inline: true });

    const ansEmbed = new EmbedBuilder()
      .setColor("Gold")
      .setTitle(`🎱| ${user.username}'s 8ball game.`)
      .addFields([
        {
          name: "Question",
          value: `${question}`,
          inline: true,
        },
        {
          name: "Answer",
          value: `${choice[ball]}`,
          inline: true,
        },
      ]);

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("8ball")
        .setLabel("Roll the ball")
        .setEmoji("🎱")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      embeds: [qEmbed],
      components: [button],
    });

    client.on("interactionCreate", async (i) => {
      if (!i.isButton()) return;

      if (i.customId === "8ball") {
        i.update({
          embeds: [ansEmbed],
          components: []
        })
      }
    })
  },
};
