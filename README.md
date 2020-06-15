# Discord.js Examples

Hello and welcome to my discord.js code examples page! If at any time you feel you do not understand the code join my discord for support [here](https://discord.gg/hDb8Exk).

You can also find my youtube channel [here](https://www.youtube.com/channel/UCdC9v6GQzjJGUJZ9VN5zklA) where I will be posting discord.js videos!


# Getting Started

Before getting started I recommend using visual studio code, it's free, and can be found [here](https://code.visualstudio.com/).

1. Open Visual Studio code, create a new folder, and create two files within your folder:
  1. Create an index.js file.
  2. Create a config.js file.

Your folders should look like this:

![examplecode](https://i.imgur.com/Ju2nXc4.png)

2. Next open console by pressing `ctrl + shift + ~` on your keyboard.

3. Now we need to install node.js and discord.js so run the following commands: `npm install discord.js` & `npm install node`.

4. You should now have a package-lock.json file. Moreover, your folder should now look like this:

![folder2](https://i.imgur.com/xpI8g6x.png)

*if for some reason this does not work properly discord.js has a great guide located [here](https://discordjs.guide/preparations/#using-the-command-prompt)*.

# Lets create a basic bot!

I highly recommend typing the code out instead of copying/pasting, as you'll have more of an understanding on what you are doing in the long run.

*note: this is how I create a core for my bots, if you find a better or simpler way online then by all means do it that way.*

### In your config.js copy/paste the following:

```
let config = {
  // BOT INFO
  "token": "Your token here", // Enter the token for the bot application here.
  "activity": "Your Activity Here", // This is the activity for the bot i.e Playing ...
  "prefix": "Your Prefix Here", // Prefix for bot commands.
  "joinleave": "Your Join/Leave Channel", // the id of your join/leave channel. (Ex. 711986227070500884)
  "color": "Your Color Code here", // The HEX Id for your color code (Ex. #0000FF) 
};
module.exports = config;
```
### In your index.js copy/paste the following:

```
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');

client.on('ready', () => {
	console.log('Bot is up and running');
  client.user.setActivity(config.activity, {
    type: 'WATCHING'
  });
});

client.login(config.token);
```

Lets test our bot! 
1. Open console by pressing `ctrl + shift + ~` on your keyboard.
2. Type in `node .`. ( This will start our index file for our bot).

*your console should have logged `Bot is up and running`! If this did not happen please check your console for errors*

# How to create Join/Leave Messages!

1. In your index.js file copy/paste the following code:

### Join Message

```
client.on("guildMemberAdd", function(message) {

  let guild = message.guild;
  let member = message;

  message.guild.channels.resolve(config.joinleave).send(new Discord.MessageEmbed()
  .setDescription(`${member.user} has joined.`)
  .setColor(config.color));
});
```
*When the client sees a guild member has been added it will then run the function for the welcome message.*

### Leave Message

```
client.on("guildMemberRemove", function(message) {
  let guild = message.guild;
  let member = message;

  message.guild.channels.resolve(config.joinleave).send(new Discord.MessageEmbed()
  .setDescription(`${member.user} has left.`)
  .setColor(config.color));
});
```

*When the client sees a guild member has been added it will then run the function for the leave message.*

Test your bot!
1. Open console by pressing `ctrl + shift + ~` on your keyboard.
2. Type in `node .`. ( This will start our index file for our bot).
3. Have a member join and you should see the following:

  ![join/leavemessage](https://i.imgur.com/lzC12IF.png)


# Creating a Command Handler with cooldowns & Arguments

1. Create a folder inside your project called commands.
2. Install fs by opening console (`ctrl + shift + ~`) and typing `npm install fs`.
3. at the top of your inxex copy/paste or type the following:

```
const cooldowns = new Discord.Collection(); // This will be used for our cooldowns
const fs = require('fs'); // this is requiring fs that we just installed

const commandFiles = fs.readdirSync('./commands'); // this is reading the cmd folder

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command); 
};
```
4. At the bottom of your index.js above `client.login(config.token);` paste the following code:

```
client.on('message', async message => {
  if (message.channel.type === 'dm') return; // If the channel was the bots DM's then return.
  if (!message.content.startsWith(config.prefix)) return;
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);
  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`; // If the command required args

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``; // if the command was used wrong.
    }

    return message.channel.send(new Discord.MessageEmbed().setDescription(reply).setColor(config.color));
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

// Create a new date
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 10000000;
    
        return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author}, you must be impatient....please wait ${timeLeft.toFixed(1)} more minutes before reusing the \`${command.name}\` command.`));
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
```
### Creating a help command

1. Navigate to your commands folder.
2. Create a new file called help.js
3. Inside your help.js file copy/paste the following code:
```
module.exports = {
    name: "help",
    args: false,
    async execute(client, message, args) {
    
        const Discord = require("discord.js");
        const fs = require('fs');
        const config = require('../config');
        let name = message.author.username;
        let guild = message.guild;

    // Our Help Message that will be sent
    message.channel.send(new Discord.MessageEmbed()
            .setTitle("Your Title HERE")
            .addFields(
                { name: 'User Commands', 
                value: `
                \`-help\` display a help message`},)
            .setColor(config.color)
            );

    }
};
```
*note: some of our variables are unused right now, but can be used down the road in future tutorials.*

4. Run your bot, you should see the following message when you type (prefix)help.

![how it should look](https://i.imgur.com/JAx2u1V.png)

## Creating a clear / purge command
1. Navigate to your config.js file and add the following:
```
    "adminrole": "YOUR ADMIN ROLE ID HERE", // Server Admin Role.
    "modrole": "YOUR MOD ROLE ID HERE", // Mod Role.
    "logchannel": "YOUR LOG CHANNEL ID", // your log channel
```
*note: you don't have to use a config file here, you can simply replace config.example with "ID HERE"*

2. Navigate to your commands folder.
3. Create a new file called clear.js.
4. Copy Paste the following code:
```
module.exports = {
    name: "clear",
    args: true, // REQUIRE ARGS
    async execute(client, message, args) {
    
        const Discord = require("discord.js");
        const fs = require('fs');
        const config = require('../config');
        let name = message.author.username; // We use this for the embed.
        let guild = message.guild;

        if (message.deletable) {
            message.delete();
        }
	// Check if the user is the owner, admin, or moderator role
        if (message.author.id != config.owner && !message.member.roles.cache.some(role => role.id === config.adminrole || role.id === config.modrole)) return message.channel.send(new Discord.MessageEmbed().setDescription("You do not have permission").setColor("#FF0000"));
 
        let deleteAmount; // creating the deleteAmount var.
	//Cannot be over 100
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        }
	// anything 100 and below
        else {
            deleteAmount = parseInt(args[0]);
        }
	// Bulk Delete our deleteAmount Variable if there is an error return our error message.
        message.channel.bulkDelete(deleteAmount, true).catch(err => {
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`An error orrured.`)
            .setFooter(`cmd initiator ${name}`)
            .setColor(config.color)
            );
            return;
          });
	
        // Log our Message in a logchannel.
        message.guild.channels.resolve(config.logchannel).send(new Discord.MessageEmbed()
            .setDescription(`${name} purged ${args} messages`)
            .setFooter(`Channel: ${message.channel.name}`)
            .setColor(config.color)
            );
    }
};
```

More to come soon 6/15/2020 HP
