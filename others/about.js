const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

  


module.exports = {
  name: "about",
  aliases: ["abo"],
  cooldown: 8,
  description: "**all commands**",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setDescription(`

 **Ths bot create by Fsociety link server ** [LINK SERVER](https://discord.gg/9QJh3n7rqz) ** JOIN SERVER **
`)

  
   .setColor("YELLOW");
   message.react("✅")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
