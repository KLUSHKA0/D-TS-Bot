

export function stringF(msg: string, ...args: string[]): string {
    args.forEach(i => {
        msg = msg.replace('%s', i);
    });
    return msg;
}


export function formatFullTime(time: Date) {
    var hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    var minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    var seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    var date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
    var month = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
    var year = time.getFullYear();
    return `${hours}:${minutes}:${seconds} ${date}.${month}.${year}`;
}

export function formatOnlyTime(time: Date) {
    var hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    var minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    var seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
}

export function formatVoice(sec: number): string {
    if (sec < 60) return `00:00:${sec < 10 ? `0${sec}` : sec}`;
    if (sec < 3600) { return `00:${~~(sec / 60) < 10 ? `0${~~(sec / 60)}` : ~~(sec / 60)}:${sec % 60 != 0 ? sec % 60 : "00"}`; }
    else { return `${~~(sec / 3600)}:${sec % 3600 != 0 && sec >= 60 ? ~~((sec % 3600) / 60) : "00"}:${sec % 60 != 0 ? sec % 60 : "00"}`; }
}