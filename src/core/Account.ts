export class Account {
    public uid: string;
    public gid: string;
    public xp: number;
    public level: number;
    public voice: number;
    public lang: string;


    constructor(uid:string, gid: string, xp?: number, level?: number, voice?: number, lang?: string) {
        this.uid = uid;
        this.gid = gid;
        if (xp) this.xp = xp;
        if (level) this.level = level;
        if (voice) this.voice = voice;
        if (lang) this.lang = lang;
    }
}