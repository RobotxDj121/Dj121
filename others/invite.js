const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

  


module.exports = {
  name: "invite",
  aliases: ["inv"],
  cooldown: 8,
  description: "**all commands**",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setDescription(`

 [Click here](link bot) **add bot .**
`)

  
   .setColor("YELLOW");
   message.react("")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
