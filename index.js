const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');

client.on('ready', () => {
	console.log('Bot is up and running');
  client.user.setActivity(activity, {
    type: 'WATCHING'
  });
});

client.on("guildMemberAdd", function(message) {

    let guild = message.guild;
    let member = message;
  
    message.guild.channels.resolve(config.joinleave).send(new Discord.MessageEmbed()
    .setDescription(`${member.user} has joined.`)
    .setColor(config.color));
});

  client.on("guildMemberRemove", function(message) {
    let guild = message.guild;
    let member = message;
  
    message.guild.channels.resolve(config.joinleave).send(new Discord.MessageEmbed()
    .setDescription(`${member.user} has left.`)
    .setColor(config.color));
});

client.login(config.token);