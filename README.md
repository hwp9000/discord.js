# Discord.js Guide

Hello and welcome to my discord.js code examples page! If at any time you feel you do not understand the code join my discord for support [here](https://discord.gg/hDb8Exk).

You can also find my youtube channel [here](https://www.youtube.com/channel/UCdC9v6GQzjJGUJZ9VN5zklA) where I will be posting discord.js videos!


# Getting Started

Before getting started I recommend using visual studio code, it's free, and can be found [here](https://code.visualstudio.com/).
1. Create a discord bot [here](https://discord.com/developers/applications).

Click New Application

![stepone](https://i.imgur.com/BxmknCh.png)

Set a name for your bot/application.

![steptwo](https://i.imgur.com/XFiJch9.png)

Click Bot.

![stepthree](https://i.imgur.com/ZlUrxj9.png)

Press Add Bot

![stepfour](https://i.imgur.com/k3nxJn8.png)

Copy your Token for your bot.

![stepfive](https://i.imgur.com/68A2Qyr.png)

2. Create a new folder and open it in Visual Studio Code.Once opened, create two files within your folder: `index.js` & `config.js`.

Your folders should look like this:

![examplecode](https://i.imgur.com/Ju2nXc4.png)

2. Next open console by pressing `ctrl + shift + ~` on your keyboard.

3. Now we need to install node.js and discord.js so run the following commands: `npm install discord.js` & `npm install node`.

4. Your folder should now look like this:

![folder2](https://i.imgur.com/xpI8g6x.png)

*if for some reason this does not work properly discord.js has a great guide located [here](https://discordjs.guide/preparations/#using-the-command-prompt)*.

# Lets create a basic bot!

I highly recommend typing the code out instead of copying/pasting, as you'll have more of an understanding on what you are doing in the long run.

*note: this is how I create a core for my bots, if you find a better or simpler way online then by all means do it that way.*

### Creating your config.js

Before we get our bot up and running we need to do a couple things:

1. Let's first begin by creating a variable called config in your config.js:

```
let config = {};
```
2. Now we need to grab our bot token:

```
let config ={
  "token": "YOUR TOKEN HERE", // Enter your bot token here!
};
```
3. Now we are going to set up our config for join/leave messages, an activity, a prefix, a color for our [embeds](https://discord.js.org/#/docs/main/stable/class/MessageEmbed), and then we will export them use outside our file.
```
let config = {
  "token": "Your token here", // Enter the token for the bot application here.
  "activity": "Your Activity Here", // This is the activity for the bot (Ex. Watching <activity>)
  "prefix": "Your Prefix Here", // Prefix for bot commands. (Ex. -help, -ping)
  "joinleave": "Your Join/Leave Channel", // the id of your join/leave channel. (Ex. 711986227070500884)
  "color": "Your Color Code here", // The HEX Id for your color code (Ex. #0000FF) 
};
module.exports = config;
```
### Setting up your index.js

1. We need to set up some constant variables for our bot to work! At the top of your index.js file create the following constants:

```
const Discord = require('discord.js'); // Here we create a constant for Discord to require discord.js
const client = new Discord.Client(); // Here we have client set to a new Discord Client.
const config =  require('./config'); // Here we state that config is refering to our config file so if we use config.token it's refering to the config file, with the value we gave token.
```
2. Next we are going to have the console log (Bot is up and running) when the client is ready, set our bot's activity, and login our client!
```
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');

client.on('ready', () => {
	console.log('Bot is up and running');
  client.user.setActivity(config.activity, {
    type: 'WATCHING' // Note this can be any of the following: WATCHING , LISTENING, PLAYING, STREAMING.
  });
});
// Log in the client using our token!
client.login(config.token); // NOTE: if you are not using our config this can be replaced with "YOUR TOKEN"
```

### Lets test our bot! 
1. Open console by pressing `ctrl + shift + ~` on your keyboard.
2. Type in `node .`. ( This will start our index file for our bot).

![picturelog](https://i.imgur.com/fRNXnbm.png)

*your console should have logged `Bot is up and running`! If this did not happen please check your console for errors*

# How to create Join/Leave Messages!

1. In your index.js file we need to create two client.on events, one being `"guildMemberAdd"` and the other `"guildMemberRemove"`.

### Join Message

```
// When a member joins then trigger our message event.
client.on("guildMemberAdd", function(message) {

  let guild = message.guild;
  let member = message;
// Now we are going to resolve the channel ID for our join/leave channel, and then send a new discord message embed with our description being @member has joined, and the color being our hex color we assigned in our config!
  message.guild.channels.resolve(config.joinleave).send(new Discord.MessageEmbed()
  .setDescription(`${member.user} has joined.`) // member.user will be an @ ping to the user!
  .setColor(config.color)); // Note: config.color can be replaced with "YOUR HEX COLOR HERE"
});
```
*When the client sees a guild member has been added it will then run the function for the welcome message.*

### Leave Message
1. Here we do the same exact code as above, but change `"guildMemberAdd"` to `"guildMemberRemove"` and change the description message.
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

New and more clean guide on command handler coming soon!

### Creating a help command

1. Navigate to your commands folder.
2. Create a new file called help.js
3. Inside your help.js file add the following code:
```
module.exports = {
    name: "help", // The name of our command, in this case -help
    args: false, // if the command requires arguments, this can be true or false.
    //Additionall we could have a cooldown here by having typing "cooldown: 0," and replacing 0 with a number of milliseconds for the cooldown.
    async execute(client, message, args) {
    
        const Discord = require("discord.js");
        const fs = require('fs'); // not used in this help command, but can be in the future.
        const config = require('../config');
        let name = message.author.username; // not used in this help command, but can be used for mentionin a user when they type help... (Ex. `${name}, here is a list of commands.`)
        let guild = message.guild;

    // Our Help Message that will be sent
    message.channel.send(new Discord.MessageEmbed()
            .setTitle("Your Title HERE")
            // Add Mutliple Fields Documentaion can be found here for embeds https://discordjs.guide/popular-topics/embeds.html
            // Example field { name: 'Your Field name', value: 'Your value here'},
            .addFields(
		// Here we set the fields name to User Commands, and then the value to -help display a help message.
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
  // If we can delete the message, then delete it.
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
