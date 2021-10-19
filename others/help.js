const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

  


module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 8,
  description: "**all commands**",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setThumbnail(`https://media.discordapp.net/attachments/814049411008954389/899786175286476830/image0.jpg`)
    .setTitle(`**Dream bot**`)
    .setDescription(`

**User Commands**
invite ,support ,about ,ping ,setprefix ,uptime.
**Music Commands**
play,skip,skipto,stop,volume,nowplaying,Eshuffle,search ,resume.
remove ,queue ,filter ,loop ,lyrics ,radio.
**Links**
[Support](https://discord.gg/dXAyytz2vy) - [Invite](https://discord.com/api/oauth2/authorize?client_id=802927533070352425&permissions=536870387537&scope=bot)
`)

   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("YELLOW");
   message.react("✅")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
