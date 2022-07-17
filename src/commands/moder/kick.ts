import {Command} from "../../core";
import {MessageEmbed} from "discord.js";

export const command: Command = {
    name: 'kick',
    group: 'moder',
    permissions: ['KICK_MEMBERS'],

    run: (client, msg, args) => {
        const user = msg.mentions.users.first();
        let reason = []
        if (args.length > 2) {
            for (var i = 2; i < args.length; i++) {
                reason.push(args[i])
            }
        }
        if (user) {

            const member = msg.guild.members.cache.get(user.id);

            if (member) {
                if (member.user.id == msg.author.id) return msg.reply(`Вы не можете кикнуть себя.`);
                member
                    .kick('Optional reason that will display in the audit logs')
                    .then(() => {
                        let embed = new MessageEmbed()
                            .setColor("RED")
                            .setAuthor(msg.author.tag)
                            .addField("Info", `\`${member.user.tag}\` was kicked \`${msg.author.tag}\``, false)
                            .setFooter(msg.author.tag, msg.author.displayAvatarURL())
                            .setTimestamp();
                        if (args.length < 3) {
                            embed.addField("Reason", 'noReason');
                        } else embed.addField("Reason", `\`${reason.join(' ')}\``);
                        msg.channel.send({ embeds: [embed]});
                    })
                    .catch(err => {
                        msg.reply('Произошла ошибка!');
                        console.error(err);
                    });

            } else {
                msg.reply(`Участник не находится в гильдии.`);
            }

        } else {
            msg.reply(`Вы не указали учстника для кика.`);
        }
    }
}