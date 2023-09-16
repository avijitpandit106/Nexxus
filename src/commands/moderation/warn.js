const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const warningSchema = require("../../models/warns");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warns a member mentioned.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you want to warn.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the warning.")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    const { guild, options, user } = interaction;

    if (!guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
      return interaction.reply({
        content: "I don't have permissions to use this command.",
        ephemeral: true,
      });

    const target = options.getUser("target");
    let reason = options.getString("reason");

    if (!reason) reason = "No reason Provided";

    await warningSchema
      .findOne({
        GuildID: guild.id,
        UserId: target.id,
        Username: target.username,
      })
      .exec()
      .then((data) => {
        if (!data) {
          data = new warningSchema({
            GuildID: guild.id,
            UserId: target.id,
            Username: target.username,
            Content: [
              {
                ExecuterId: user.id,
                ExecuterUsername: user.username,
                Reason: reason,
              },
            ],
          });
        } else {
          const warnContent = {
            ExecuterId: user.id,
            ExecuterUsername: user.username,
            Reason: reason,
          };
          data.Content.push(warnContent);
        }
        data.save();
      })
      .catch((err) => {
        console.error(err);
      });

    const dmEmbed = new EmbedBuilder()
      .setColor("DarkRed")
      .setDescription(
        `:white_check_mark: You have been warned in ${interaction.guild.name}\nReason: ${reason}`
      );

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(
        `:white_check_mark: ${target} has been warned | ${reason}`
      );

    await target
      .send({
        embeds: [dmEmbed],
      })
      .catch((err) => {
        console.error(err);
        console.log("User's DM's are off.");
        return interaction.reply({
          content: "User's DM's are off.",
          ephemeral: true,
        });
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
