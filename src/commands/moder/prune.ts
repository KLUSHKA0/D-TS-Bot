import { Message, MessageEmbed } from "discord.js"
import Bot from "../../client"
import {Command, stringF } from "../../core"


export const command: Command = {
    name: 'prune',
    group: 'moder',
    permissions: ['MANAGE_MESSAGES'],
    run: async (client: Bot, msg: Message, args: string[], langs: any) => {
        var count: number = Number(args[0])
        var embed = new MessageEmbed().setColor("RED");

        if (isNaN(count)) { embed.setDescription(stringF(langs['nan_number'])); return msg.channel.send({ embeds: [embed] }) };
        if (count > 100) { embed.setDescription(stringF(langs['number_large'])); return msg.channel.send({ embeds: [embed] }) };
        if (count < 1) { embed.setDescription(stringF(langs['number_litle'])); return msg.channel.send({ embeds: [embed] }) };

        if (msg.channel.type == 'DM') return;
        await msg.channel.bulkDelete(++count)
            .then(messages => {
                embed.setColor("GREEN");
                embed.setDescription(stringF(langs['message_delete'], (messages.size - 1).toString(), (--count).toString()));
                return msg.channel.send({ embeds: [embed] });
            })
            .then(d => setTimeout(() => d.delete(), 5000))
            .catch(() => console.log("not delete message"));
    }
}