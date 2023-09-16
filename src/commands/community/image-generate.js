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
    .setName("image-generate")
    .setDescription("Generate an Image.")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Describe your image that you want to generate.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    await interaction.deferReply();

    const { options } = interaction;

    const prompt = options.getString("prompt");

    try {
      const response = await openai.createImage({
        prompt: `${prompt}`,
        n: 1,
        size: "1024x1024",
      });
      const image = response.data.data[0].url;

      const embed = new EmbedBuilder()
        .setColor("DarkBlue")
        .setTitle("Here's your generated image.")
        .setImage(image)
        .setTimestamp();

      await interaction.editReply({
        embeds: [embed],
      });
    } catch (error) {
      if (error.response.status == 400)
        return await interaction.editReply({
          content: "I cannot generate that image - status code: **400**",
          ephemeral: true,
        });

        console.log("Request failed");
    }
  },
};
