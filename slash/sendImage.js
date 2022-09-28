const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, ModalBuilder, TextInputStyle, InteractionType, SlashCommandBuilder, SelectMenuBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendimage")
        .setDescription("sends an image as an embed")
        .addAttachmentOption((option) => 
            option
                .setName("image")    
                .setDescription("Image you would like to attach.")
                .setRequired(true)
        ),

    run: async ({ client, interaction }) => {  
        await interaction.deferReply()
        await interaction.deleteReply()
        const attachment = interaction.options.getAttachment("image")

        const embed = new EmbedBuilder()
            .setImage(attachment.attachment)
            .setColor("#c577f2")

        return await interaction.channel.send({embeds: [embed]});
    },
};