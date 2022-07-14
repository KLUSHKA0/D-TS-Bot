import { Message, PermissionResolvable } from "discord.js";
import Bot from '../client';


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

export function commandHandler(client: Bot): void {

}

export function commandUpdates(client: Bot): void {

}

export interface Group {
    name: string;
    displayName: string;
}

export function createGroups(client: Bot, groups: Group[]): void {
    
}

