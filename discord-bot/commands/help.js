module.exports = {
    name: "help",
    args: false,
    async execute(client, message, args) {
    
        const Discord = require("discord.js");
        const fs = require('fs');
        const config = require('../config');
        let name = message.author.username;
        let guild = message.guild;

    
    message.channel.send(new Discord.MessageEmbed()
            .setTitle("Command Help")
            .addFields(
                { name: 'User Commands', 
                value: `
                \`-help\` display a help message`},)
            .setColor(config.color)
            );

    }
};