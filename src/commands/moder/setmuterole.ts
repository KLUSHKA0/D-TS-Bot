import {Command} from "../../core";
import {muteRole} from "../../core/Guild";


export const command: Command = {
    name: 'setmuterole',
    group: 'moder',

    run: (client, msg, args, langs) => {
        const role = msg.mentions.roles.first()

        if (!role) return msg.channel.send('Вы не указали роль для мута');

        client.guild.get(msg.guildId).setMuteRole({
            gid: msg.guildId,
            rid: role.id,
            rname: role.name,
            rcolor: role.hexColor
        });
    }
}