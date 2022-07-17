import { Command } from "../../core";
import {MessageEmbed} from "discord.js";

export const command: Command = {
    name: 'avatar',
    group: 'member',
    run: (client, msg, args) => {
        const member = msg.mentions.users.first() || msg.author;
        let embed = new MessageEmbed()
            .setTitle(member.tag)
            .setColor('GREY')
            .setImage(member.displayAvatarURL())
            .setTimestamp();

        msg.channel.send({ embeds: [embed] });
    }
}