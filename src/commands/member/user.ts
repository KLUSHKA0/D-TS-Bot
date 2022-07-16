import { Message, MessageEmbed } from "discord.js";
import Bot from "../../client";
import {Command, dateFormat, voiceTimeFormat, status, stringF} from "../../core";


export const command: Command = {
    name: 'user',
    group: 'member',
    aliases: ['userinfo'],

    run: async (client: Bot, msg: Message, args: string[], langs: any) => {
        let member = msg.mentions.members.first() || msg.member;

        let acc = client.guild.get(msg.guild.id).getAccount(member.user.id);
        let data = [];
        data.push(
            stringF(langs['basic_info']),
            stringF(langs['name'], member.user.username, member.nickname != null ? `(\`${member.nickname}\`)` : ''),
            stringF(langs['status'], !member.presence ? langs['status_info']['offline'] : langs['status_info'][member.presence.status]),
            member.presence && member.presence.activities.filter(act => act.type == 'CUSTOM').length > 0 ?
                stringF(langs['user_status'], member.presence.activities.filter(act => act.type == 'CUSTOM')[0].state) : '',
            stringF(langs['joined_server'], dateFormat(member.joinedAt)),
            stringF(langs['additional_info']),
            member.presence && member.presence.activities.filter(act => act.type == 'PLAYING').length > 0 ?
                stringF(langs['play_in'], member.presence.activities.filter(act => act.type == 'PLAYING').join(', ')): '',
            stringF(langs['level'], acc.level.toString()),
            stringF(langs['xp'], acc.xp.toString()),
            stringF(langs['time_voice_channel'], voiceTimeFormat(acc.voice)),
            stringF(langs['language'], acc.lang)
        );
        let embed = new MessageEmbed()
            .setAuthor({ name: member.user.username })
            .setDescription(data.join(''))
            .setColor("PURPLE")
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `ID: ${member.user.id}` });
        msg.channel.send({ embeds: [embed] });
    }
}