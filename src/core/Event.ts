import { ClientEvents } from 'discord.js';
import Bot from '../client';
import path from 'path';
import { readdirSync } from 'fs';

interface Run {
    (client: Bot, ...args: any[])
}

export interface Event {
    name: keyof ClientEvents;
    run: Run;
}

export async function eventHandler(client: Bot): Promise<void> {
    client.logger.info("Load events...")
    const eventPath = path.join(__dirname, "..", "events");
    await readdirSync(eventPath).forEach(async (file) => {
        let event: Event = await require(`${eventPath}/${file}`).event;
        if (event) {
            client.events.set(event.name, event);
            client.on(event.name, event.run.bind(null, client));
            if (client.config.debug) client.logger.debug(`added \`${event.name}\` event`);
        } else client.logger.error('No File', `Unable to load event from file \`${file}\` at path ${path.join(eventPath, file)}`);
    });
    client.logger.info("The events are loaded.")
}