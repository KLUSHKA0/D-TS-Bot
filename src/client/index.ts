import {Client, Collection, Intents} from "discord.js";
import {access, constants, writeFile} from 'fs';
import {
    Account,
    Command,
    commandHandler,
    createGroups,
    Event,
    eventHandler,
    Group,
    Guild,
    path_config,
    path_db,
    path_env
} from "../core";
import {Logger} from "../core/Logger";
import {Config} from "../interfaces";
import ConfigJson from '../config.json';
import {Database} from "../db/Database";

require('dotenv').config()


class Bot extends Client {

    constructor() {
        super({
            intents: [
                Intents.FLAGS.DIRECT_MESSAGES,
                Intents.FLAGS.DIRECT_MESSAGE_TYPING,
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_BANS,
                Intents.FLAGS.GUILD_INTEGRATIONS,
                Intents.FLAGS.GUILD_INVITES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_PRESENCES,
                Intents.FLAGS.GUILD_VOICE_STATES
            ]
        });
    }

    events: Collection<string, Event> = new Collection();
    commands: Collection<string, Command> = new Collection();
    aliases: Collection<string, Command> = new Collection();
    groups: Collection<string, Group> = new Collection();

    guild: Collection<string, Guild> = new Collection();


    config: Config = ConfigJson;
    logger: Logger = new Logger();
    db: Database = new Database();


    public init(): void {

        // Init .env
        access(path_env.path, constants.F_OK, async (err) => {
            if (err) {
                writeFile(path_env.path, path_env.text, (err) => {
                    if (err) {
                        this.logger.error(err.name, err.message)
                        console.log(err);
                    } else {
                        this.logger.debug("File `.env` created");
                    }
                });
            }
        });

        // Init config.json
        access(path_config.path, constants.F_OK, (err) => {
            if (err) {
                writeFile(path_config.path, path_config.text, (err) => {
                    if (err) {
                        this.logger.error(err.name, err.message)
                    } else {
                        this.logger.debug("File `config.json` created");
                    }
                });
            }
        });

        // Init db.sqlite
        access(path_db.path, constants.F_OK, (err) => {
            if (err) {
                writeFile(path_db.path, path_db.text, (err) => {
                    if (err) {
                        this.logger.error(err.name, err.message)
                    } else {
                        this.logger.debug("File `db.sqlite` created");
                    }
                });
            }
        });

        this.start();

    }


    private async start(): Promise<void> {

        await createGroups(this, [
            {name: 'member', displayName: 'Member commands'},
            {name: 'moder', displayName: 'Moderator commands'},
            {name: 'admin', displayName: 'Admin commands'},
            {name: 'owner', displayName: 'Owner bot commands'}
        ]);

        await eventHandler(this);
        await commandHandler(this);

        await this.db.openDB(this);
        await this.db.loadGuilds(this);
        await this.db.loadUsers(this);
        await this.db.loadMuteRoles(this);

        await this.login(process.env.TOKEN);
    }

}

export default Bot;
