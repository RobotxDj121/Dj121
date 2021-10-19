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
    .setThumbnail(`https://images-ext-1.discordapp.net/external/4z_YXY0agtILa9_QJQ_yVMVJWn7aVGqXIGleNhwfddM/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/791171444238319618/fa5c61a82be7374394bbc68fad91ed23.png `)
    .setTitle(`**Help Dj Music**`)
    .setDescription(`

**User Commands**
invite ,support ,about ,ping ,prefix ,uptime.
**Music Commands**
play,skip,skipto,stop,volume,nowplaying,Eshuffle,search ,resume.
remove ,queue ,filter ,loop ,lyrics ,radio.
**Links**
[Support](https://discord.gg/v9bW8fCc) - [Invite](https://discord.com/api/oauth2/authorize?client_id=791171444238319618&permissions=8&scope=bot)
`)

   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("YELLOW");
   message.react("<:setting:830141142687285298>")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
