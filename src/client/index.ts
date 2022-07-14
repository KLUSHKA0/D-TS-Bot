import { Client, Intents } from "discord.js";
import { access, constants, writeFile } from 'fs';
import { path_config, path_db, path_env } from "../core/Constants";
import { Logger } from "../core/Logger";

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


    logger: Logger = new Logger();


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
                })
            }
        })

        // Init db.sqlite
        access(path_db.path, constants.F_OK, (err) => {
            if (err) {
                writeFile(path_db.path, path_db.text, (err) => {
                    if (err) {
                        this.logger.error(err.name, err.message)
                    } else {
                        this.logger.debug("File `db.sqlite` created");
                    }
                })
            }
        })


        this.start()

    }


    private start(): void {

    }

}

export default Bot;
