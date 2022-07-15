import {Command} from "../../core";


export const command: Command = {
    name: 'user',
    group: 'member',

    run: (client, msg, args, langs) => {
        msg.channel.send(`Your info: ${client.guild.get(msg.guild.id).getAccount(msg.member.id).toString()}`)
    }
}