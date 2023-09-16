const { EmbedBuilder } = require("discord.js");
const reportSchema = require("../../models/report");

module.exports = {
  data: {
    name: "report",
  },
  async execute(interaction, client) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === "report") {
      const contact = interaction.fields.getTextInputValue("contact");
      const issue = interaction.fields.getTextInputValue("issue");
      const description = interaction.fields.getTextInputValue("description");

      const { user, guild } = interaction;

      const embed = new EmbedBuilder()
        .setColor("Fuchsia")
        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
        .setTitle("New Report")
        .addFields(
          {
            name: "Form of contact",
            value: `${contact}`,
            inline: false,
          },
          {
            name: "Issue",
            value: `${issue}`,
            inline: false,
          },
          {
            name: "Description of the issue",
            value: `${description}`,
            inline: false,
          }
        )
        .setFooter({ text: `Reporting member id: ${user.id}` })
        .setTimestamp();

      reportSchema
        .findOne({ Guild: guild.id })
        .exec()
        .then((data) => {
          if (!data) return;

          if (data) {
            const channelID = data.Channel;

            const channel = guild.channels.cache.get(channelID);

            channel
              .send({
                embeds: [embed],
              })
              .catch((err) => {
                console.error(err);
                interaction.reply({
                  content: "Something went wrong...",
                  ephemeral: true,
                });
              });

            interaction.reply({
              content: ":white_check_mark: Your report has been sent.",
              ephemeral: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          interaction.reply({
            content: "Something went wrong...",
            ephemeral: true,
          });
        });
    }
  },
};
