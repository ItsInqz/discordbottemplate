const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextInputBuilder,
    ModalBuilder,
    TextInputStyle,
    InteractionType,
} = require("discord.js");
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        const client = interaction.client;
        async function handleInteraction() {
            if (!interaction.inGuild()) return;
            if (interaction.type === InteractionType.ApplicationCommand) {
                const slashcmd = client.slashcommands.get(
                    interaction.commandName
                );

                if (!slashcmd) interaction.reply("Not a valid slash command");
                await slashcmd.run({ client, interaction });
            } else if (interaction.type === InteractionType.ModalSubmit) {
                if (interaction.customId === "accountlist") {
                    await interaction.deferReply()
                    await interaction.deleteReply()
                    const username = interaction.fields.getTextInputValue("username")
                    const description = interaction.fields.getTextInputValue("description")
                    const channelid = interaction.fields.getTextInputValue("channelid")
                    const channel = client.channels.cache.get(channelid)
                    
                    const embed = new EmbedBuilder()
                    .setTitle(`Account Listing: ${username}`)
                    .setDescription(description)
                    .setColor("#c577f2")
                    .setFooter({text: `.gg/mcservices`})
                    
                    await channel.send({embeds: [embed]})
                    return
                }
            }
        }
        handleInteraction();
    },
};
