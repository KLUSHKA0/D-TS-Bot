import {Command} from "../../core";


export const command: Command = {
    name: 'unmute',
    group: 'moder',

    run: (client, msg, args, langs) => {
        let member = msg.mentions.members.first();
        let guild = client.guild.get(msg.guildId);

        if (!member) return msg.channel.send({ content: 'Вы не указали участника для рамута'});
        if (!guild.muteRole) return msg.channel.send({ content: 'Роль мута не установлена, невозможно убрать мут, используйте `setmuterole`'});
        if (!member.roles.cache.get(guild.muteRole.rid)) return msg.channel.send({ content: 'Участник не замучен'});

        member.roles.remove(guild.muteRole.rid).catch(e => client.logger.error("Удаление мута", e.toString()));

        msg.channel.send({ content: `${member.user.tag} размучен`});

    }
}