const Discord = require('discord.js')

exports.run = (client, message, params) => {
  
  const embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle("AngelBot Ping Sistemi")
  .setDescription(`[Davet Et](https://angelbotweb.glitch.me/davet)`)
  .addField("API Gecikmesi:", `**${client.ws.ping}** ms!`)
  .addField("Mesaj Gecikmesi:", `**${message.createdTimestamp - message.createdTimestamp}**`)
  .setFooter(`AngelBot | Ping Sistemi`)
  message.channel.send(embed)
  }
exports.conf = {
  enable: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "ping",
  description: "botun pingini gösterir.",
  usage: "ping"
}