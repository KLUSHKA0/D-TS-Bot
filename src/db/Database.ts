import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';
import Bot from '../client';

export class Database {
    private db: Sequelize;

    public User: ModelStatic<Model<any, any>>;
    public Guild: ModelStatic<Model<any, any>>;
    public MuteRole: ModelStatic<Model<any, any>>;

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

    async getUser(client: Bot, userId: string, guildId: string): Promise<Model<any, any>> {
        return await client.db.User.findOne({ where: { uid: userId, gid: guildId } });
    }

    async addUser(client: Bot, userId: string, guildId: string): Promise<void> {
        await this.User.create({ uid: userId, gid: guildId });
    }

    async getUsers(client: Bot): Promise<Model<any, any>[]> {
        return await this.User.findAll();
    }

    async getGuildUser(client: Bot, guildId: string): Promise<Model<any, any>[]> {
        return await this.User.findAll({ where: { gid: guildId } });
    }

    async getGuild(client: Bot, guildId: string) {
        return await this.Guild.findOne({ where: { gid: guildId } });
    }

    async getMuteRole(client: Bot, guildId: string) { 
        return await this.MuteRole.findOne({ where: { gid: guildId}});
    }

}