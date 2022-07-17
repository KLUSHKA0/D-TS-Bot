import {Command} from "../../core";
import {MessageEmbed} from "discord.js";


export const command: Command = {
    name: 'mute',
    group: 'moder',
    run: async (client, msg, args) => {
        let guild = client.guild.get(msg.guildId);

        if (!guild.muteRole)
            return msg.channel.send({content: 'Роль мута не установлена, используйте команду `setmuterole`'});

        let reason;
        if (args.length > 2)
            reason = args.splice(2).join(" ");
        else reason = "No reason"

        const member = msg.mentions.members.first();
        if (member) {
            if (args.length < 2) return msg.reply('Вы не указали время мутa')
            if (member.user.id == msg.author.id) return msg.reply(`Вы не можете замутить себя.`);
            if (member.roles.cache.get(guild.muteRole.rid)) return msg.reply(`Этот участник уже в муте`);


            let role = msg.guild.roles.cache.get(guild.muteRole.rid);

            await member.roles.add(role);

            let embed = new MessageEmbed()
                .setColor("GREEN")
                .addField("Info", `\`${member.user.tag}\` was muted \`${msg.author.tag}\``, false)
                .setFooter({text: msg.author.tag, iconURL: msg.author.displayAvatarURL()})
                .setTimestamp()
                .addField("Reason", reason);
            msg.channel.send({embeds: [embed]});
        } else await msg.reply(`Вы не указали участника для мута.`);
    }
}