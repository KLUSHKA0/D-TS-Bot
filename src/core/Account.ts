export class Account {
    public uid: string;
    public gid: string;
    public xp: number = 0;
    public cd: boolean = false;
    public level: number = 1;
    public voice: number = 0;
    public lang: string = 'en';


    constructor(uid: string, gid: string, xp?: number, level?: number, voice?: number, lang?: string) {
        this.uid = uid;
        this.gid = gid;
        if (xp) this.xp = xp;
        if (level) this.level = level;
        if (voice) this.voice = voice;
        if (lang) this.lang = lang;
    }


    sendMessage() {
        const xp = this.xp;
        const level = this.level;
        if (level * (100 + level) <= xp) this.levelUp();
        else this.xp += 5;
        this.changeCd();
        setTimeout(() => {
            this.changeCd();
        }, 30000);
    }

    private levelUp(): void {
        this.level++;
    }

    changeCd(): void {
        this.cd = !this.cd;
    }

    toString(): string {
        return `xp: ${this.xp}, level: ${this.level}, voice: ${this.voice}, lang: ${this.lang}`
    }
}