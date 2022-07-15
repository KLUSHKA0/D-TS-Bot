import {Account} from "./Account";
import {Collection} from "discord.js";

export class Guild {
    public gid: string;
    public accounts: Collection<string, Account>;
    public logs: boolean = false;


    constructor(gid: string) {
        this.gid = gid;
    }

    getAccount(userId: string): Account {
        return this.accounts.get(userId);
    }

    addAccount(userId: string): void {
        this.accounts.set(userId, new Account(userId, this.gid));
    }

    deleteAccount(userId: string): void {
        this.accounts.delete(userId);
    }


}