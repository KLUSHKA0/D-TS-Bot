import {Command} from "../../core";

export const command: Command = {
    name: 'logs',
    group: 'admin',
    permissions: ['ADMINISTRATOR'],
    run: (client, msg, args) => {
        let guild = client.guild.get(msg.guildId);
        if (guild.logs)
            msg.channel.send({ content: 'Логи выключены'});
        else
            msg.channel.send({ content: 'Логи включены'});

        guild.logs = !guild.logs;
    }

}