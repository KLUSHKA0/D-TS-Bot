import Bot from "../client";
import { Event } from "../core";


export const event: Event = {
    name: 'ready',
    run: (client: Bot) => {
        client.logger.info(`${client.user.username} started.`)
    }
}