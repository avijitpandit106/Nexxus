const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Setup the automod system in the server.")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator,
      PermissionFlagsBits.ManageGuild
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("flagged-words")
        .setDescription("Block profanity, sexual content and slurs.")
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("spam-messages")
        .setDescription("Block message suspected of spam.")
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("mention-spam")
        .setDescription(
          "Block messages containing a certain amount of mentions."
        )
        .addIntegerOption((option) =>
          option
            .setName("number")
            .setDescription(
              "The number of mention required to block the message."
            )
            .setRequired(true)
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("keywords")
        .setDescription("Block a certain keyword in the server.")
        .addStringOption((option) =>
          option
            .setName("word")
            .setDescription("The word you want to block.")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    const { user, guild, options } = interaction;
    const subCommand = options.getSubcommand();
    if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageGuild))
      return interaction.reply({
        content: "I don't have permissions to use this command",
        ephemeral: true,
      });

    switch (subCommand) {
      case "flagged-words":
        await interaction.reply({ content: "loading your automod rule..." });

        const rule = await guild.autoModerationRules
          .create({
            name: `Block profanity, sexual words and slurs by ${client.user.username}`,
            creatorId: `${user.id}`,
            enabled: true,
            eventType: 1,
            triggerType: 4,
            triggerMetadata: {
              presets: [1, 2, 3],
            },
            actions: [
              {
                type: 1,
                metadata: {
                  channel: interaction.channel,
                  durationSeconds: 10,
                  customMessage: `This message contain violation of an automoderation rule and was blocked by ${client.user.username}`,
                },
              },
            ],
          })
          .catch(async (err) => {
            setTimeout(async () => {
              console.error(err);
              await interaction.editReply({ content: `${err}` });
            });
          }, 2000);

        setTimeout(async () => {
          if (!rule) return;

          const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setDescription("Your automod rule has been created.");

          await interaction.editReply({ content: "", embeds: [embed] });
        }, 3000);
        break;

      case "spam-messages":
        await interaction.reply({ content: "loading your automod rule..." });

        const rule2 = await guild.autoModerationRules
          .create({
            name: `Block message suspected of spam by ${client.user.username}`,
            creatorId: `${user.id}`,
            enabled: true,
            eventType: 1,
            triggerType: 3,
            /* triggerMetadata: {
              presets: [1, 2, 3],
            }, */
            actions: [
              {
                type: 1,
                metadata: {
                  channel: interaction.channel,
                  durationSeconds: 10,
                  customMessage: `This message contain violation of an automoderation rule and was blocked by ${client.user.username}`,
                },
              },
            ],
          })
          .catch(async (err) => {
            setTimeout(async () => {
              console.error(err);
              await interaction.editReply({ content: `${err}` });
            });
          }, 2000);

        setTimeout(async () => {
          if (!rule2) return;

          const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setDescription("Your automod rule has been created.");

          await interaction.editReply({ content: "", embeds: [embed] });
        }, 3000);
        break;

      case "mention-spam":
        await interaction.reply({ content: "loading your automod rule..." });

        const number = options.getInteger("number");
        const rule3 = await guild.autoModerationRules
          .create({
            name: `Block messages containing a certain amount of mentions by ${client.user.username}`,
            creatorId: `${user.id}`,
            enabled: true,
            eventType: 1,
            triggerType: 5,
            triggerMetadata: {
              mentionTotalLimit: number,
            },
            actions: [
              {
                type: 1,
                metadata: {
                  channel: interaction.channel,
                  durationSeconds: 10,
                  customMessage: `This message contain violation of an automoderation rule and was blocked by ${client.user.username}`,
                },
              },
            ],
          })
          .catch(async (err) => {
            setTimeout(async () => {
              console.error(err);
              await interaction.editReply({ content: `${err}` });
            });
          }, 2000);

        setTimeout(async () => {
          if (!rule3) return;

          const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setDescription("Your automod rule has been created.");

          await interaction.editReply({ content: "", embeds: [embed] });
        }, 3000);
        break;

      case "keywords":
        await interaction.reply({ content: "loading your automod rule..." });

        const word = options.getString("word");
        const rule4 = await guild.autoModerationRules
          .create({
            name: `Block a certain keyword in the server by ${client.user.username}`,
            creatorId: `${user.id}`,
            enabled: true,
            eventType: 1,
            triggerType: 1,
            triggerMetadata: {
              keywordFilter: [`${word}`],
            },
            actions: [
              {
                type: 1,
                metadata: {
                  channel: interaction.channel,
                  durationSeconds: 10,
                  customMessage: `This message contain violation of an automoderation rule and was blocked by ${client.user.username}`,
                },
              },
            ],
          })
          .catch(async (err) => {
            setTimeout(async () => {
              console.error(err);
              await interaction.editReply({ content: `${err}` });
            });
          }, 2000);

        setTimeout(async () => {
          if (!rule4) return;

          const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setDescription("Your automod rule has been created.");

          await interaction.editReply({ content: "", embeds: [embed] });
        }, 3000);
        break;
    }
  },
};
