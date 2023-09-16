require("dotenv").config();
const { openAIkey } = process.env;
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: openAIkey,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatgpt")
    .setDescription("Ask chatgpt a question.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Enter the question you want to ask.")
        .setRequired(true)
    )
    .setDMPermission(false),
  async execute(interaction, client) {
    await interaction.deferReply();

    const { options } = interaction;

    const question = options.getString("question");

    try {
      const res = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 2048,
        temperature: 0.5,
        prompt: question,
      });

      const embed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``);

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      return await interaction.editReply({
        content: `Request failed status code **${error.response.status}**`,
        ephemeral: true,
      });
    }
  },
};
