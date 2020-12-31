
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const ayarlar = require("./ayarlar.json");
require("./util/eventLoader")(client);
const db = require("quick.db");
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`...`);
  console.error("---");

  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

let prefix = ayarlar.prefix;





console.log("Ben Şuan Aktifim...");
console.log("-------------------");
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek. Benim babam ömerdir.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) return message.author.send("**Beni Sunucuda Deneyin**");
  let permlvl = 0;
  if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
  if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};






////////////////////////
client.on('message', msg => {

if (!msg.content.startsWith(prefix)) {
    return;
  }

  });




client.login(ayarlar.token);

//===================| Tag Alana Rol |===================\\

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    let tag = " "; //tagınız
    let sunucu = " "; //sunucu ID
    let kanal = " " //log kanal id
    let rol = " "; // rol ID
    if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.has(rol)) {
      client.channels.cache.get(kanal).send(`${newUser} ${tag} tagını aldığı için <@&${rol}> rolünü kazandı!`)
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
    } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.has(rol)) {
      client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
      client.channels.cache.get(kanal).send(`${newUser} ${tag} tagını çıkardığı için <@&${rol}> rolünü kaybetti!`)
    }

  }
})




//===================| AntiSpam |===================\\

const dctrat = require('dctr-antispam.js'); 
 
client.on('ready', () => {
   dctrat(client, {
        uyarılimiti: 4, // Uyarı limiti.
        susturmalimiti: 6, // Susturma limiti.
        aralık: 1500, // Mesaj yazma aralığı. ms olarak ayarlayınız
        uyarımesajı: "Spam yapmayı keser misin? Yoksa susturulacaksın!!", // Uyarı mesajı
        susturmamesajı: "Çok faaazla mesaj!! Susturuldun.", // Susturulma mesajı
        maksspam_uyarı: 3,// Kullanıcılar aynı iletiyi spam gönderirken, X üyesi 8'den fazla ileti gönderdiğinde kullanıcılar uyarı alır.
        maksspam_susturma: 4, // Kullanıcılar aynı iletiyi spam gönderirken, X üyesi 10'den fazla ileti gönderdiğinde kullanıcılar susturulur.
        adminrol: ["KURUCU"], // Bu rollere sahip kullanıcılar engellenmez
        adminkullanıcı: ["HeaveN#3162"], // Bu kullanıcılar engellenmez
        susturmarolü: "Susturuldu", // Kullanıcı spam yaparsa otomatik olarak susturulur eğer rol açılmaza otomatik olarak açılır.
        susturmasüresi: 900000, // Susturma süresi bir kullanıcı spam yaptığı için susturulursa verilecek ceza süresi (15dk) ms olarak ayarlayınız.
        logkanalı: "antispam-log" // Susturulmaların ve kaldırılmalarının atılacağı log kanalı (açılmazsa otomatik bu isimde açılır.)
      });
  });
 
client.on('message', msg => {
  client.emit('checkMessage', msg); 
})



//===================| DmLog |===================\\

client.on("message", msg => {
  var dm = client.channels.cache.get("KANAL İD");
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.MessageEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("RANDOM")
      .setThumbnail(`${msg.author.avatarURL()}`)
      .addField("Gönderen", msg.author.tag)
      .addField("Gönderen ID", msg.author.id)
      .addField("Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});







//===================| EtiketPrefix |===================\\



client.on('message', async msg => {
  let prefix = await db.fetch(`prefix.${msg.guild.id}`)
  if(msg.content == `<@!botunİD>`) return msg.channel.send(`> ** Prefix : \`${prefix}\``);
});
