import {Command, dateFormat} from "../../core";
import {MessageEmbed} from "discord.js";

export const command: Command = {
    name: 'server',
    group: 'member',
    run: (client, msg, args) => {
        let guild = msg.guild;
        let allMember = guild.members.cache.map(f => f.user.bot);
        let bot = 0;
        for (let i = 0; i < allMember.length; i++) {
            if (allMember[i] == true) {
                bot++;
            }
        }
        let ch = allMember.length - bot;
        let embed = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor({name: guild.name})
            .addField(`Овнер`, `<@${guild.ownerId}>`, false)
            .addField(`Участники`, `Все - ${guild.memberCount}\nУчастники - ${ch}\nБоты - ${bot}`, false)
            .addField(`Роли`, guild.roles.cache.map(r => r).length.toString(), true)
            .addField(`Каналы`, guild.channels.cache.map(f => f).length.toString(), true)
            .addField(`AFK канал`, `${guild.afkChannel}`, true)
            .addField(`Создан`, dateFormat(guild.createdAt), false)
            .setThumbnail(guild.iconURL())
            .setFooter("ID: " + guild.id)
        msg.channel.send({embeds: [embed]});
    }
}