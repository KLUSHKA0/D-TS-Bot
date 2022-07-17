import {Message} from "discord.js";
import Bot from "../../client";
import {Command, commandUpdates} from "../../core";


export const command: Command = {
    name: 'updcommands',
    aliases: ['updcmd'],
    group: 'owner',
    ownerOnly: true,

    run: async (client, msg, args, langs) => {

        client.commands.clear();
        client.aliases.clear();
        await commandUpdates(client);

        msg.channel.send({content: 'Commands updated successfully.'}).then(m => {
            setTimeout(() => {
                m.delete();
                msg.delete()
            }, 10000)
        })
        client.logger.info("Commands updated.")


    }
}