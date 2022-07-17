import { Message, MessageEmbed } from "discord.js";
import Bot from "../../client";
import {Command, stringF} from "../../core";



export const command: Command = {
    name: 'lang',
    group: 'member',

    run: (client: Bot, msg: Message, args: string[], langs: any) => {
        let lang = {
            "ru": "ru",
            "en": "en"
        }
        let embed = new MessageEmbed()
            .setColor("AQUA")
        if (args.length == 0) {
            embed.setDescription(stringF(langs['info']));
        } else {
            if (lang[args[0]]) {
                client.guild.get(msg.guildId).getAccount(msg.member.id).lang = args[0];
                embed.setDescription(stringF(langs['success_update'], args[0]));
            } else embed.setDescription(`${stringF(langs['no_lang'])}\n${stringF(langs['info'])}`);
        }
        msg.channel.send({ embeds: [embed] });
    }
}