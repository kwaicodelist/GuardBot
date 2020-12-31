const Discord = require("discord.js")
module.exports.run= async(client, message, args) => {

let kullanıcı = message.mentions.members.first();
let sebep = args.slice(1).join(" ")

if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Bu Komutu Kullanamazsın!")

if (!kullanıcı) return message.channel.send("Bir Kullanıcı Etiketlemelisin!")
if (!sebep) {
sebep = "Sebep Belirtilmedi!"
}
let dcs = new Discord.MessageEmbed()
.setColor("AQUA")
.setDescription("Atılan Kullanıcı: <@" + kullanıcı.id + ">\n\n Atan Yetkili: <@" + message.author.id + ">\n\nAtılma Sebebi: " + sebep + "")
.setFooter(client.user.username,client.user.avatarURL())
.setTimestamp()
message.delete()
message.channel.send(dcs)
kullanıcı.kick(sebep)

}
module.exports.conf = {
aliases: []
}

module.exports.help = {
name: "kick"
} 
