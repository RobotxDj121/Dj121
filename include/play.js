////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const ytdl = require("discord-ytdl-core");
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed, splitMessage, escapeMarkdown,MessageAttachment } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const createBar = require("string-progressbar");
const lyricsFinder = require("lyrics-finder");
const {
  approveemoji,
  denyemoji,
  BOTNAME,
} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  async play(song, message, client, filters) {
    //VERY MESSY CODE WILL BE CLEANED SOON!
    const { PRUNING, SOUNDCLOUD_CLIENT_ID } = require("../config.json");

    const queue = message.client.queue.get(message.guild.id);
    
    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      const endembed = new MessageEmbed().setColor("YELLOW")
        .setAuthor(`Music Queue ended.`, "https://images-ext-2.discordapp.net/external/gWZPXQIW-bVhPG0swcckYqf3QbsfREsQkHWqXlxsalk/https/media.discordapp.net/attachments/814049411008954389/899786175286476830/image0.jpg")
      return queue.textChannel.send(endembed).catch(console.error);
    }

    let stream = null;
    let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";
    let isnotayoutube=false;        
    let seekTime = 0;
    let oldSeekTime = queue.realseek;
    let encoderArgstoset;
    if (filters === "remove") {
        queue.filters = ['-af','dynaudnorm=f=200'];
        encoderArgstoset = queue.filters;
        try{
          seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000 + oldSeekTime;
        } catch{
          seekTime = 0;
        } 
          queue.realseek = seekTime;
    } else if (filters)
    {
      try{
        seekTime = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000 + oldSeekTime;
      } catch{
        seekTime = 0;
      } 
        queue.realseek = seekTime;
        queue.filters.push(filters)
        encoderArgstoset = ['-af', queue.filters]
    }
 

    try {
      if (song.url.includes("youtube.com")) {
         stream = ytdl(song.url, {
          filter: "audioonly",
          opusEncoded: true,
          encoderArgs: encoderArgstoset,
          bitrate: 320,
          seek: seekTime, 
          quality: "highestaudio",
          liveBuffer: 40000,
          highWaterMark: 1 << 25, 
  
      });
      } else if (song.url.includes(".mp3") || song.url.includes("baseradiode")) {
        stream = song.url;
        isnotayoutube = true;
      }
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      console.error(error);
      return attentionembed(message, `Error: ${error.message ? error.message : error}`);
    }

    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));   
    
    if(isnotayoutube){
      console.log("TEST")
      const dispatcher = queue.connection
      .play(stream)
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();

        if (queue.loop) {
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
    })
    .on("error", (err) => {
      console.error(err);
      queue.songs.shift();
      module.exports.play(queue.songs[0], message);
    });
  dispatcher.setVolumeLogarithmic(queue.volume / 100);
    }else{
      const dispatcher = queue.connection
      .play(stream, { type: streamType })
      .on("finish", () => {
        if (collector && !collector.ended) collector.stop();
  
        if (queue.loop) {
          let lastSong = queue.songs.shift();
          queue.songs.push(lastSong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", (err) => {
        console.error(err);
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      });
    dispatcher.setVolumeLogarithmic(queue.volume / 100);
    }
    
  let thumb;
    if (song.thumbnail === undefined) thumb = "https://images-ext-2.discordapp.net/external/gWZPXQIW-bVhPG0swcckYqf3QbsfREsQkHWqXlxsalk/https/media.discordapp.net/attachments/814049411008954389/899786175286476830/image0.jpg";
    else thumb = song.thumbnail.url;

  try {
      let embed = new MessageEmbed()
      .setTitle(""+song.title)
       .setURL(song.url)
      .setColor("YELLOW")
      .setImage(thumb)
      .setThumbnail(`https://images-ext-2.discordapp.net/external/gWZPXQIW-bVhPG0swcckYqf3QbsfREsQkHWqXlxsalk/https/media.discordapp.net/attachments/814049411008954389/899786175286476830/image0.jpg`)
      .addField("Requested by:", `\`${message.author.username}#${message.author.discriminator}\``, true)
       .addField("Length:", `\`${song.duration} Minutes\``, true)
       .addField("Volume:", `\`100\``, true)
  ////    .setAuthor(`Started playing: ${song.title}`,'https://images-ext-2.discordapp.net/external/gWZPXQIW-bVhPG0swcckYqf3QbsfREsQkHWqXlxsalk/https/media.discordapp.net/attachments/814049411008954389/899786175286476830/image0.jpg')
      var playingMessage = await queue.textChannel.send(embed);
  //    var playingMessage = await queue.textChannel.send(`${song.url}`);
    
      
    } catch (error) {
      console.error(error);
    }

 
