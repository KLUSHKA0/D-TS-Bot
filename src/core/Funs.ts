import { format } from 'date-and-time';

export function stringF(msg: string, ...args: string[]): string {
    args.forEach(i => {
        msg = msg.replace('%s', i);
    });
    return msg;
}


export function dateFormat(time: Date): string {
    return format(time, 'HH:mm:ss DD.MM.YYYY');
}

export function timeFormat(time: Date): string {
    return format(time, 'HH:mm:ss');
}

export function voiceTimeFormat(sec: number): string {
    if (sec < 60) return `00:00:${sec < 10 ? `0${sec}` : sec}`;
    if (sec < 3600) { return `00:${~~(sec / 60) < 10 ? `0${~~(sec / 60)}` : ~~(sec / 60)}:${sec % 60 != 0 ? sec % 60 : "00"}`; }
    else { return `${~~(sec / 3600)}:${sec % 3600 != 0 && sec >= 60 ? ~~((sec % 3600) / 60) : "00"}:${sec % 60 != 0 ? sec % 60 : "00"}`; }
}



export function eventHandler(): void {

}