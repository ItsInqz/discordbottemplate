const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, ModalBuilder, TextInputStyle, InteractionType, SlashCommandBuilder, SelectMenuBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("listaccount")
        .setDescription("List an account by sending a detailed embed."),

    run: async ({ client, interaction }) => {  
        const modal = new ModalBuilder()
			.setCustomId('accountlist')
			.setTitle('List an account!')

        const username = new TextInputBuilder()
			.setCustomId('username')
			.setLabel("What's your Minecraft username?")
            .setValue("")
			.setStyle(TextInputStyle.Short)
            .setPlaceholder(`What is the account's username?`)
            .setRequired(true)
            .setMaxLength(24);

        const description = new TextInputBuilder()
            .setCustomId("description")
            .setLabel("Details of account")
            .setValue("")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("Any details you would like this listing to have.")
            .setRequired(true)
            .setMaxLength(3000)

        const channelid = new TextInputBuilder()
			.setCustomId('channelid')
			.setLabel("Channel for embed to be sent in")
            .setValue(interaction.channel.id)
			.setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(24);

		const firstActionRow = new ActionRowBuilder().addComponents(username);
		const secondActionRow = new ActionRowBuilder().addComponents(description);
		const lastActionRow = new ActionRowBuilder().addComponents(channelid);
		modal.addComponents(firstActionRow, secondActionRow, lastActionRow);
		await interaction.showModal(modal);
    },
};