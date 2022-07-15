import {DataTypes, Model, ModelStatic, Sequelize} from 'sequelize';
import Bot from '../client';
import {Account, Guild} from "../core";

export class Database {
    private db: Sequelize;

    private User: ModelStatic<Model<any, any>>;
    private Guild: ModelStatic<Model<any, any>>;
    private MuteRole: ModelStatic<Model<any, any>>;

    async openDB(client: Bot) {
        this.db = new Sequelize({
            dialect: 'sqlite',
            storage: './src/db/db.sqlite',
            define: {
                freezeTableName: true,
                timestamps: false,
            },
            logging: false,
        })
        await this.db.authenticate()
            .then(() => client.logger.info('Open database'))
            .catch((err) => client.logger.error('Database', err));

        this.initTables();
    }

    private initTables() {
        // User table
        this.User = this.db.define(
            'Accounts',
            {
                uid: {
                    type: DataTypes.STRING(18),
                    allowNull: false,
                    primaryKey: false
                },
                gid: {
                    type: DataTypes.STRING(18),
                    allowNull: false,
                    primaryKey: false
                },
                xp: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: false,
                    defaultValue: 0
                },
                level: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: false,
                    defaultValue: 1
                },
                voice: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: false,
                    defaultValue: 0
                },
                lang: {
                    type: DataTypes.STRING(2),
                    allowNull: false,
                    primaryKey: false,
                    defaultValue: 'en'
                },

            }
        );
        this.User.sync();

        //Guild table
        this.Guild = this.db.define(
            'Guilds',
            {
                gid: {
                    type: DataTypes.STRING(18),
                    allowNull: false,
                    primaryKey: false
                },
                logs: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    primaryKey: false,
                    defaultValue: false
                }
            }
        );
        this.Guild.sync();

        //MuteRole table
        this.MuteRole = this.db.define(
            'MuteRoles',
            {
                gid: {
                    type: DataTypes.STRING(18),
                    allowNull: false,
                    primaryKey: false
                },
                rid: {
                    type: DataTypes.STRING(18),
                    allowNull: false,
                    primaryKey: false
                },
                rname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    primaryKey: false
                },
                rcolor: {
                    type: DataTypes.STRING(9),
                    allowNull: false,
                    primaryKey: false
                },
            }
        );
        this.MuteRole.sync();
    }

    //region User
    private async getUser(userId: string, guildId: string): Promise<Model<any, any>> {
        return await this.User.findOne({where: {uid: userId, gid: guildId}});
    }

    async addUser(account: Account): Promise<void> {
        await this.User.create({
            uid: account.uid,
            gid: account.gid,
            xp: account.xp,
            level: account.level,
            voice: account.voice,
            lang: account.lang
        });
    }

    async updateUser(account: Account): Promise<void> {
        await this.User.update({
                xp: account.xp,
                level: account.level,
                voice: account.voice,
                lang: account.lang
            },
            {
                where: {
                    uid: account.uid,
                    gid: account.gid
                }
            });
    }

    private async getUsers(): Promise<Model<any, any>[]> {
        return await this.User.findAll();
    }

    async loadUsers(client: Bot): Promise<void> {
        let users = await this.getUsers();
        users.forEach(u => {
            let usr = u.get() as Account;
            client.guild.get(usr.gid).addAccount(usr);
        });
    }

    saveUsers(client: Bot): void {
        client.guild.forEach(g => {
            g.accounts.forEach(async u => {
                if (!await this.getUser(u.uid, u.gid)) // TODO()
                    await this.addUser(u);
                else {
                    await  this.updateUser(u);
                }
            });
        });
    }

    //endregion

    //region Guild
    private async getGuilds(): Promise<Model<any, any>[]> {
        return await this.Guild.findAll();
    }

    // async getGuildUsers(client: Bot, guildId: string): Promise<Model<any, any>[]> {
    //     return await this.User.findAll({where: {gid: guildId}});
    // } TODO()

    async getGuild(guildId: string): Promise<Model<any, any>> {
        return await this.Guild.findOne({where: {gid: guildId}});
    }

    async addGuild(guild: Guild): Promise<void> {
        await this.Guild.create({
            gid: guild.gid,
            logs: guild.logs
        });
    }

    async updateGuild(guild: Guild): Promise<void> {
        await this.Guild.update({
                logs: guild.logs
            },
            {
                where: {
                    gid: guild.gid
                }
            });
    }

    async loadGuilds(client: Bot): Promise<void> {
        let guilds = await this.getGuilds();
        guilds.forEach(g => {
            client.guild.set(g.get('gid').toString(), new Guild(g.get('gid').toString()));
        });
    }

    saveGuilds(client: Bot): void {
        client.guild.forEach(async (g) => {
            if (!await this.getGuild(g.gid)) // TODO()
                await this.addGuild(g);
            else {
                await  this.updateGuild(g);
            }
        });
    }

    //endregion

    //region MuteRole
    async getMuteRole(client: Bot, guildId: string) {
        return await this.MuteRole.findOne({where: {gid: guildId}});
    }

    //endregion

}