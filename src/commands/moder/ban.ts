import {MessageEmbed} from "discord.js";
import {Command} from "../../core";

export const command: Command = {
    name: 'ban',
    group: 'moder',
    permissions: ['BAN_MEMBERS'],

    run: (client, msg, args) => {
        const member = msg.mentions.members.first();
        if (!member) return msg.reply(`Вы не указали участника для бана.`);
        if (member.user.id == msg.author.id) return msg.reply(`Вы не можете забанить себя.`);

        let reason;
        if (args.length > 2)
            reason = args.splice(2).join(" ");
        else reason = "No reason"

        member
            .ban({
                reason: reason.join(" "),
            })
            .then(() => {
                let embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor({name: msg.author.tag})
                    .addField("Info", `\`${member.user.tag}\` was baned \`${msg.author.tag}\``, false)
                    .setFooter({text: msg.author.tag, iconURL: msg.author.displayAvatarURL()})
                    .setTimestamp()
                    .addField("Reason", reason);

                msg.channel.send({embeds: [embed]});
            })
            .catch(e => {
                client.logger.error('Ban member', e.toString());
            });
    }
}