const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
} = require("discord.js");
const ticketSetup = require("../../models/ticketSetup");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket-setup")
    .setDescription("Create a ticket message in the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((option) =>
      option
        .setName("ticket")
        .setDescription("Set the parent ticket channel.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName("category")
        .setDescription("Set the parent category for the ticket.")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildCategory)
    )
    .addRoleOption((option) =>
      option
        .setName("handler")
        .setDescription("Select the handler role for the ticket.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Set the display message for the ticket.")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const { guild, options } = interaction;
    try {
      const ticket = options.getChannel("ticket");
      const category = options.getChannel("category");

      const handler = options.getRole("handler");
      let description = options.getString("description");

      if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels))
        return interaction.reply({
          content: "I don't have permissions for creating a ticket.",
          ephemeral: true,
        });

      if (
        !interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)
      )
        return interaction.reply({
          content: "You don't have permissions for creating a ticket.",
          ephemeral: true,
        });

      if (!description) description = "Open a ticket in the discord Server";

      const ticketID = Math.floor(Math.random() * 10000);

      await ticketSetup.findOneAndUpdate(
        { Guild: guild.id },
        {
          Channel: ticket.id,
          Parent: category.id,
          Handler: handler.id,
          TicketID: ticketID,
        },
        {
          new: true,
          upsert: true,
        }
      );

      const embed = new EmbedBuilder()
        .setColor("Navy")
        .setDescription(description);

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("button")
          .setLabel("Create Ticket")
          .setEmoji("📩")
          .setStyle(ButtonStyle.Primary)
      );

      await ticket
        .send({
          embeds: [embed],
          components: [button],
        })
        .catch((err) => {
          console.error(err);
          const errEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Couldn't send ticket. Something went wrong...");

          return interaction.reply({
            embeds: [errEmbed],
            ephemeral: true,
          });
        });

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setDescription("Ticket has been created."),
        ],
        ephemeral: true,
      });

      client.on("interactionCreate", async (interaction) => {
        if (!interaction.isButton()) return;
        if (!interaction.customId === "button") return;

        await interaction.deferReply({ ephemeral: true });

        try {
          const data = await ticketSetup.findOne({
            Guild: interaction.guildId,
          });

          const channel = await interaction.guild?.channels.create({
            name: `${interaction.user.username}-Ticket:${interaction.id}`,
            type: ChannelType.GuildText,
            parent: data.Parent,
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone,
                deny: ["ViewChannel"],
              },
              {
                id: interaction.user.id,
                allow: ["ViewChannel", "SendMessages", "AttachFiles"],
              },
              {
                id: handler.id,
                allow: ["ViewChannel", "SendMessages", "AttachFiles"],
              },
            ],
          });

          await interaction.followUp({
            content: `Ticket created: ${channel.toString()}`,
          });

          await channel.send({
            content: `Welcome to your ticket ${interaction.user.toString()}. When you are finished have an admin delete the channel.`,
          });
        } catch (e) {
          await interaction.editReply({
            content: "Failed to create a ticket.",
          });

          console.error(e);
        }
      });
    } catch (err) {
      console.error(err);
      const errEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription("Something went wrong. Try again later...");

      return interaction.reply({
        embeds: [errEmbed],
        ephemeral: true,
      });
    }
  },
};
