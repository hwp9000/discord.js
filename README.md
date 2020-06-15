# Discord.js Examples

Hello and welcome to my discord.js code examples page! If at any time you feel you do not understand the code join my discord for support [here](https://discord.gg/hDb8Exk).

You can also find my youtube channel ![here](https://www.youtube.com/channel/UCdC9v6GQzjJGUJZ9VN5zklA) where i Will be posting discord.js videos!


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


More to come Soon! HP#9000
