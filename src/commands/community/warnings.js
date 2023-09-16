const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const warningSchema = require("../../models/warns");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("Get warning for a user.")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member whose warning you want to check.")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { guild, options, user } = interaction;

    const target = options.getUser("member");

    const embed = new EmbedBuilder();
    const noWarns = new EmbedBuilder();

    await warningSchema
      .findOne({
        GuildID: guild.id,
        UserId: target.id,
        Username: target.username,
      })
      .exec()
      .then((data) => {
        if (data) {
          embed.setColor("Blue").setDescription(
            `:white_check_mark: ${target}'s warnings: \n${data.Content.map(
              (w, i) =>
                ` **Warnings**: ${i + 1}
                  **Warning Moderator**: ${w.ExecuterUsername}
                  **Warn reason**: ${w.reason}`
            ).join(`-`)}`
          );
          interaction.reply({ embeds: [embed] });
        } else {
          noWarns
            .setColor("Blue")
            .setDescription(
              `:white_check_mark: ${target.username} has **0** warnings`
            );

          interaction.reply({ embeds: [noWarns] });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
