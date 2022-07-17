import {Command} from "../../core";
import {MessageEmbed} from "discord.js";

export const command: Command = {
    name: 'kick',
    group: 'moder',
    permissions: ['KICK_MEMBERS'],

    run: (client, msg, args) => {

        const member = msg.mentions.members.first();

        if (!member) return msg.reply(`Вы не указали учстника для кика.`);
        if (member.user.id == msg.author.id) return msg.reply(`Вы не можете кикнуть себя.`);

        let reason;
        if (args.length > 2)
            reason = args.splice(2).join(" ");
        else reason = "No reason"

        member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setAuthor({name: msg.author.tag})
                    .addField("Info", `\`${member.user.tag}\` was kicked \`${msg.author.tag}\``, false)
                    .setFooter({ text: msg.author.tag, iconURL: msg.author.displayAvatarURL()})
                    .setTimestamp()
                    .addField("Reason", reason);
                msg.channel.send({embeds: [embed]});
            })
            .catch(e => {
                client.logger.error('Kick member', e.toString());
            });
    }
}