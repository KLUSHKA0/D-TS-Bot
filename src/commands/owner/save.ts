import {Message} from "discord.js";
import Bot from "../../client";
import {Command} from "../../core";


export const command: Command = {
    name: 'save',
    group: 'owner',
    ownerOnly: true,

    run: (client: Bot, msg: Message, args: string[]) => {
        client.db.saveGuilds(client);
        client.db.saveUsers(client);
        client.db.saveMuteRoles(client);
        msg.channel.send({content: `Saved.`}).then(m => setTimeout(() => {
            m.delete();
            msg.delete();
        }, 10000))
    }
}