const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['CHANNEL', 'MESSAGE']
});
const config = require('./config');
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const fs = require('fs');

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
};

client.on('ready', () => {
	console.log('Bot is up and running');
  client.user.setActivity(config.activity, {
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

client.on('message', async message => {
  if (message.channel.type === 'dm') return;
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(new Discord.MessageEmbed().setDescription(reply).setColor(config.color));
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      
      return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author}, you must be impatient....wait ${Math.round(timeLeft /60)} more Minutes before \`${command.name}\` command.`));
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(config.token);
