import {Event, Guild} from "../core";
import djs from "discord.js";


export const event: Event = {
    name: 'guildCreate',

    run: (client, guild: djs.Guild) => {
        if (!client.guild.get(guild.id))
            client.guild.set(guild.id, new Guild(guild.id))

    }
}