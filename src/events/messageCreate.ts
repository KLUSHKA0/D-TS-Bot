import {Message, MessageEmbed} from "discord.js";
import Bot from "../client";
import {Account, Command, Event, Guild, stringF} from "../core";


export const event: Event = {
    name: 'messageCreate',
    run: (client: Bot, msg: Message) => {



        if (
            msg.member.user.bot ||
            !msg.guild ||
            msg.system
        ) return;

        if (!client.guild.get(msg.guildId)) client.guild.set(msg.guildId, new Guild(msg.guildId))
        const guild = client.guild.get(msg.guildId)

        if (!guild.getAccount(msg.member.id))
            guild.newAccount(msg.member.id);

        if (!guild.getAccount(msg.member.id).cd)
            guild.getAccount(msg.member.id).sendMessage();

        if (!msg.content.startsWith(client.config.prefix)) return;

        /* Execute Command */
        let embed;
        const args = msg.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if (!cmd) return;
        const command: Command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (!command) return;

        if (client.config.debug) client.logger.debug(`Execute command (${command.name}).`);

        let lang = require(`../langs/${client.guild.get(msg.guildId).getAccount(msg.member.id).lang}.json`);

        if (command.permissions ? msg.member.permissions.has(command.permissions) : (command.ownerOnly && msg.member.id == client.config.ownerID
                || !command.ownerOnly)
            || msg.member.id == client.config.ownerID) {
            if (!msg.guild.members.cache.get(client.user.id).permissions.has(command.permissions)) {
                embed = new MessageEmbed().setColor("DARK_RED").setDescription(stringF(lang['bot_not_perm'], command.name));
                msg.delete().catch(e => client.logger.error("Message delete", e.toString()));
                return msg.channel.send({embeds: [embed]}).then(m => setTimeout(() => m.delete(), 5000));
            }
            (command as Command).run(client, msg, args, lang[command.name]);
        } else {
            embed = new MessageEmbed().setColor("DARK_RED").setDescription(stringF(lang['you_not_perm'], command.name));
            msg.delete().catch(e => client.logger.error("Message delete", e.toString()));
            return msg.channel.send({embeds: [embed]}).then(m => setTimeout(() => m.delete(), 5000));
        }
    }
}