import {Account} from "./Account";
import {Collection} from "discord.js";

export class Guild {
    public gid: string;
    public accounts: Collection<string, Account> = new Collection();
    public logs: boolean = false;


    constructor(gid: string, logs?: boolean) {
        this.gid = gid;
        if (logs) this.logs = logs;
    }

    getAccount(userId: string): Account {
        return this.accounts.get(userId);
    }

    addAccount(account: Account): void {
        this.accounts.set(account.uid, new Account(account.uid, account.gid, account.xp, account.level, account.voice, account.lang));
    }

    newAccount(userId: string): void {
        this.accounts.set(userId, new Account(userId, this.gid));
    }

    deleteAccount(userId: string): void {
        this.accounts.delete(userId);
    }


}