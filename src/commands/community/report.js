const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  Guild,
  ActionRowBuilder,
} = require("discord.js");
const reportSchema = require("../../models/report");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Report a member from the server."),

  async execute(interaction, client) {
    const { guild } = interaction;
    
    reportSchema
      .findOne({ Guild: guild.id })
      .exec()
      .then((data) => {
        if (!data) {
          interaction.reply({
            content: "The report system has not been set-up yet.",
            ephemeral: true,
          });
        } else {
          const modal = new ModalBuilder()
            .setCustomId("report")
            .setTitle("Report Form");

          const contact = new TextInputBuilder()
            .setCustomId("contact")
            .setLabel("Provide us with a form of contact.")
            .setRequired(true)
            .setPlaceholder("Use your desired platform for contact")
            .setStyle(TextInputStyle.Short);

          const issue = new TextInputBuilder()
            .setCustomId("issue")
            .setLabel("What would you like to report?")
            .setRequired(true)
            .setPlaceholder("Member issue, Server issue, others, etc.")
            .setStyle(TextInputStyle.Short);

          const description = new TextInputBuilder()
            .setCustomId("description")
            .setLabel("Describe your issue.")
            .setRequired(true)
            .setPlaceholder("Be as detailed as possible.")
            .setStyle(TextInputStyle.Paragraph);

          const firstRow = new ActionRowBuilder().addComponents(contact);
          const secondRow = new ActionRowBuilder().addComponents(issue);
          const thirdRow = new ActionRowBuilder().addComponents(description);

          modal.addComponents(firstRow, secondRow, thirdRow);

          interaction.showModal(modal);
        }
      });
  },
};
