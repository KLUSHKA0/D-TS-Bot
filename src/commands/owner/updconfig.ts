import { Message } from "discord.js";
import Bot from "../../client";
import path from 'path';
import {Command} from "../../core";


export const command: Command = {
    name: 'updconfig',
    aliases: ['updcfg'],
    group: 'owner',
    ownerOnly: true,

    run: async (client, msg, args) => {
        const json_path = path.join(__dirname, '..', '..', "config.json");
        delete require.cache[json_path];
        client.config = require(json_path);
        msg.channel.send({ content: 'Config updated successfully.'}).then(m => {setTimeout(() => { m.delete(); msg.delete()}, 10000)})
        client.logger.info("Config update");
    }
}