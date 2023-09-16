const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const welcomeSchema = require("../../models/welcome");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-welcome")
    .setDescription("Setup a welcome channel with a custom welcome message.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription(
          "Choose a channel where you want to Show the welcome message."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message you want to show in the embed")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role you want to give to the user.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const welcomeChannel = interaction.options.getChannel("channel");
    const welcomeMessage = interaction.options.getString("message");
    const roleId = interaction.options.getRole("role");

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.Administrator
      )
    ) {
      interaction.reply({
        content: "I don't have permission to use this command.",
        ephemeral: true,
      });
    }

    welcomeSchema
      .findOne({ Guild: interaction.guild.id })
      .exec()
      .then((data) => {
        if (!data) {
          const newWelcome = welcomeSchema.create({
            Guild: interaction.guild.id,
            Channel: welcomeChannel.id,
            Message: welcomeMessage,
            Role: roleId.id,
          });
        }
        interaction.reply({
          content: "Succesfully Created a Welcome message.",
          ephemeral: true,
        });
      });
  },
};
