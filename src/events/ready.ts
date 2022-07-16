import Bot from "../client";
import { Event } from "../core";


export const event: Event = {
    name: 'ready',
    run: (client: Bot) => {
        client.logger.info(`${client.user.username} started.`)


        setInterval(() => {
            client.db.saveGuilds(client);
            client.db.saveUsers(client);
        }, 1000 * 60 * 60);
    }
}