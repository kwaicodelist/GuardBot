const Discord = require('discord.js');
const math = require('math-expression-evaluator')
const stripIndents = require('common-tags').stripIndents
const db = require('quick.db');
exports.run = async(client, message, args) => {
    var soru = args.join(' ');
    if(!soru) return message.reply('Bir işlem belirtin. `&hesapla <işlem>`')
    else {
        try {
        let cevap = math.eval(soru)
        const embed = new Discord.MessageEmbed()
        .setColor("#FFB900")
        .setAuthor("Bot Hesaplama Sistemi", client.user.avatarURL())
        .setFooter(message.author.username+' tarafından istendi.', message.author.avatarURL() || message.author.defaultAvatarURL)
        .addField('Soru', soru)
        .addField('Cevap', cevap)
        message.channel.send(embed)
        } catch(err) {
          return message.channel.send('Hatalı **işlem.**')
        }
    }
                                                        
};  
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["hesapla"],
  permLevel: 0 
};
exports.help = {
  name: 'hesapla', 
  description: 'Belirtilen işlemi yapar.',
  usage: 'hesapla <işlem>'
};
