const wiki = require("wikijs").default();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Search wikipedia for a topic.")
    .addStringOption((option) =>
      option
        .setName("topic")
        .setDescription("Provide a topic to search.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const topic = interaction.options.getString("topic");

    await interaction.deferReply();

    const search = await wiki.search(topic);
    if (!search.results.length)
      return await interaction.editReply({
        content: "Wikipedia doesn't seem to know what are you talking about...",
        ephemeral: true,
      });

    const result = await wiki.page(search.results[0]);

    const summary = await result.summary();
    const url = result.url();
    const image = await result.mainImage();
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`${topic}`)
      .setDescription(`\`\`\`${summary}\`\`\``)
      .setURL(`${url}`)
      .setImage(`${image}`);

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
