import {Message, MessageEmbed} from 'discord.js';
import Bot from '../../client';
import {Command, stringF} from '../../core';


export const command: Command = {
    name: 'help',
    group: 'member',
    run: (client, msg, args, langs) => {
        const embed = new MessageEmbed();
        embed.setColor("#00FF7F");
        let showAll = args[0] == 'all';
        if (args[0] && !showAll) {

            let command = client.commands.get(args[0]) || client.aliases.get(args[0]);
            if (command) {
                let desc = [];
                desc.push(`**${stringF(langs['group'])}:** ${command.group}`);
                if (command.aliases) desc.push(`**${stringF(langs['aliases'])}:** ${command.aliases.join(', ')}`);
                if (command.description) desc.push(`**${stringF(langs['description'])}:** ${command.description}`);
                if (command.usage) desc.push(`**${stringF(langs['usage'])}:** ${command.usage}`);
                embed.setAuthor({name: `${command.name}`})
                    .setDescription(
                        desc.join('\n')
                    );
            }
        } else {
            embed.setAuthor({name: showAll ? stringF(langs['title_all']) : stringF(langs['title'], msg.guild.name || 'this DM')/*`Available commands in ${msg.guild || 'this DM'}`*/});

            client.groups.map(grp => {
                let cmd = client.commands
                    .filter(c => c.group == grp.name
                        && (showAll || (c.permissions ? msg.member.permissions.has(c.permissions) : true))
                        && (!c.ownerOnly || msg.member.id == client.config.ownerID))
                    .map(n => `\`${n.name}\``);
                if (cmd.length > 0)
                    embed.addField(grp.displayName, cmd.join(' '));
            })

        }
        msg.channel.send({embeds: [embed]});
    }
}