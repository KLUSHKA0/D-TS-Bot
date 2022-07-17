import {MessageEmbed} from "discord.js";
import {Command} from "../../core";

export const command: Command = {
    name: 'ban',
    group: 'moder',
    permissions: ['BAN_MEMBERS'],

    run: (client, msg, args) => {
        if (!msg.guild) return; //Если команда вызвана не в гильдии возврат
        const user = msg.mentions.users.first();
        if (user) {
            const member = msg.guild.members.cache.get(user.id);
            if (member) {
                if (member.user.id == msg.author.id) return msg.reply(`Вы не можете забанить себя.`);
                var reason = [];
                if (args.length >= 3) {
                    for (var i = 2; i < args.length; i++) {
                        reason.push(args[i]);
                    }
                } else {
                    reason.push(" ");
                }
                member
                    .ban({
                        reason: reason.join(" "),
                    })
                    .then(() => {
                        let embed = new MessageEmbed()
                            .setColor("GREEN")
                            .setAuthor({ name: msg.author.tag})
                            .addField("Info", `\`${member.user.tag}\` was baned \`${msg.author.tag}\``, false)
                            .setFooter({text: msg.author.tag, iconURL: msg.author.displayAvatarURL()})
                            .setTimestamp();
                        if (args.length < 2) {
                            embed.addField("Reason", 'noReason');
                        } else { embed.addField("Reason", `\`${reason.join(' ')}\``); }
                        msg.channel.send({ embeds: [embed]});
                    })
                    .catch(err => {
                        console.error(err);
                    });
            } else {
                msg.reply(`Участник не находится в гильдии.`);
            }
        } else {
            msg.reply(`Вы не указали участника для бана.`);
        }
    }
}