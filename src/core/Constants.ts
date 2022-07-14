import path from 'path';

export const path_env = { 
    text: 'TOKEN=', 
    path: path.join(__dirname, '..', '..', '.env') 
}

export const path_config = {
    text: '{\n\t"prefix": "",\n\t"debug": true,\n\t"initSite": false,\n\t"ownerID": ""\n}',
    path: path.join(__dirname, '..', 'config.json')
}

export const path_db = {
    text: "",
    path: path.join(__dirname, '..', 'db', 'db.sqlite')
}

export const reset: string = '\x1b[0m';
export const fgYellow: string = '\x1b[33m';
export const fgRed: string = '\x1b[31m';
export const fgGray: string = '\x1b[90m';
export const fgCyan: string = '\x1b[36m';
export const fgMagneta: string = '\x1b[35m'
export const fgGreen: string = "\x1b[32m";

export const status = {
    online: "онлайн",
    idle: "не активен",
    dnd: "не беспокоить",
    offline: "оффлайн"
}
