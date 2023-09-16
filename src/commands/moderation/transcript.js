const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ActionRowBuilder,
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("transcript")
    .setDescription("Transcript the specified channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to transcript")
        .addChannelTypes(
          ChannelType.GuildText,
          ChannelType.PublicThread,
          ChannelType.PrivateThread,
          ChannelType.AnnouncementThread,
          ChannelType.GuildAnnouncement
        )
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("transcript")
        .setDescription("The channel you want the transcript to be sent.")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("limit")
        .setDescription("The ammount of messages you want to transcript.")
        .setMinValue(1)
        .setMaxValue(1000000)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { guild, options } = interaction;

    const channel = options.getChannel("channel");
    const transcript = options.getChannel("transcript");
    const limit = options.getInteger("limit");

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return interaction.reply({
        content: "You don't have the permission to use this command.",
        ephemeral: true,
      });

    if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages))
      return interaction.reply({
        content: "I don't have the permission to create transcripts.",
        ephemeral: true,
      });

    await interaction.reply({
      content: "Your transcript is being loaded. This may take a few minutes.",
      ephemeral: true,
    });

    const file = await createTranscript(channel, {
      limit: limit,
      saveImages: true,
      returnBuffer: false,
      filename: `${channel.name}-transcript.html`,
    });

    let msg = await transcript.send({
      files: [file],
    });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Open")
        .setURL(
          `https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`
        )
        .setStyle(ButtonStyle.Link),

      new ButtonBuilder()
        .setLabel("Download")
        .setURL(`${msg.attachments.first()?.url}`)
        .setStyle(ButtonStyle.Link)
    );

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`Your **transcript** for the ${channel} is ready.`);

    await interaction.editReply({
      embeds: [embed],
      components: [button],
      ephemeral: true,
    });
  },
};
