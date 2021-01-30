const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./data/config.json');

const prefix = "!";

var channel;

function welcome(member, channel) {
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
}

client.on('ready', () => {
  console.log('I am ready!');
});

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  if (command === "welcome") {
    member = message.author;
    // Send the message to a designated channel on a server:
    channel = message.channel;
    channel.send(`This is now the welcome channel`);
  }                        
});


// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
    console.log( member.displayName + " joined");
    channel.send(`${member} est dans la place!`);
});

// Create an event listener for new guild members
client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
    console.log( member.displayName + " left");
    channel.send(`Bye, ${member}!`);
});

client.login(config.BOT_TOKEN);