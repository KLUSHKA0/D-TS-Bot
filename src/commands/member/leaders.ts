import { Message, MessageEmbed } from "discord.js";
import Bot from "../../client";
import {Command, stringF} from "../../core";


export const command: Command = {
    name: 'leaders',
    group: 'member',
    aliases: ['ld'],

    run: (client, msg, args, langs) => {
        // client.logger.warn('Not handler this command');
        let embed = new MessageEmbed()
        .setColor("PURPLE")
        .setAuthor({ name: stringF(langs['title'])})
        let page = 0;
        let size = client.guild.get(msg.guildId).userCount();
        let list = [];
        let expAll = client.guild.get(msg.guildId).accounts.map(f => f).sort((a, b) => { return b.xp - a.xp; });
        let number = (10 * page);
        let position;

        if (args[0] != undefined) {
            page = (Number(args[0]) - 1);
        }

        expAll.forEach((acc) => {

            let user = msg.guild.members.cache.get(acc.uid);
            if (user && user.id == msg.author.id) embed.setDescription(`**${stringF(langs['you'])}:** \`(${number + 1})\` **${user.user.username}** \n xp: ${acc.xp}; voice: ${acc.voice}\n`);
            embed.addField(`\`(${number + 1})\` ${user ? user.user.username : acc.uid}`, `xp: ${acc.xp}; voice: ${acc.voice}`, false);
            list.push(`\`(${number + 1})\` -- ${user ? user.user.username : acc.uid} { xp: ${acc.xp}; voice: ${acc.voice} }`);
            number++;
        })
        msg.channel.send({ embeds: [embed] });
    }
}