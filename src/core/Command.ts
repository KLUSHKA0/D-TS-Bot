import { Message, PermissionResolvable } from "discord.js";
import Bot from '../client';
import path from 'path';
import { readdirSync } from 'fs';


interface Run {
    (client: Bot, msg: Message, args: string[], langs: any)
}

export interface Command {

    name: string;
    group: string;
    description?: string;
    usage?: string;
    aliases?: string[];
    permissions?: PermissionResolvable;
    ownerOnly?: boolean

    run: Run;

}

export async function commandHandler(client: Bot): Promise<void> {
    client.logger.info("Load commands...");
    const CommandPath = path.join(__dirname, "..", "commands");
    await readdirSync(CommandPath).forEach((dir) => {
        const commands = readdirSync(`${CommandPath}/${dir}`).filter((file) => file.endsWith('.ts'));
        for (const file of commands) {

            let command: Command = require(`${CommandPath}/${dir}/${file}`).command;
            if (command) {
                if (!client.groups.get(command.group))
                    client.logger.error('No group', `Group \`${command.group}\` in command \`${command.name}\` is not in the list of groups.`)
                else {
                    client.commands.set(command.name, command);
                    if (client.config.debug) client.logger.debug(`add \`${command.name}\` command`);
                    if (command.aliases) {
                        if (command!!.aliases.length > 0) {
                            command!!.aliases.forEach((alias) => {
                                if (client.config.debug) client.logger.debug(`added \`${alias}\` alias for \`${command.name}\` command`);
                                client.aliases.set(alias, command);
                            });
                        }
                    } else { if (client.config.debug) client.logger.debug(`no aliases for command ${command.name}`) }
                }
            } else client.logger.error('No command', `Unable to load command from file \`${file}\` at path ${path.join(CommandPath, dir, file)}`);
        }
    });
    client.logger.info(`The commands are loaded.`);
}

export function commandUpdates(client: Bot): void {

}

export interface Group {
    name: string;
    displayName: string;
}

export async function createGroups(client: Bot, groups: Group[]): Promise<void> {
    client.logger.info("Load groups...");
    await groups.forEach(group => {
        if (client.config.debug) client.logger.debug(`add \`${group.name}\` command`);
        client.groups.set(group.name, group);
    });
    client.logger.info(`The groups are loaded.`);
}

