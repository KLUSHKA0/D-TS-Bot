import {Command} from "../../core";

export const command: Command = {
    name: 'slowmode',
    group: 'admin',
    permissions: ['ADMINISTRATOR'],
    run: (client, msg, args) => {
        if (!args[0]) return msg.channel.send({ content: `Вы не указали время медленного режима.`});
        if (!Number.isInteger(Number(args[0]))) return msg.channel.send({ content: `Не правильный синтаксис переменной`});
        if (msg.channel.type != 'GUILD_TEXT') return msg.channel.send({ content: `Тип канала не является \`GUILD_TEXT\``});

        msg.channel.setRateLimitPerUser(Number(args[0]), `No Reason`);
    }
}