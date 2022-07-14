import { fgCyan, fgGray, fgGreen, fgRed, fgYellow, timeFormat, reset } from ".";

export class Logger {
    private time = () => `${fgGray}${timeFormat(new Date())}${reset}`

    info = (msg: string) => console.log(`${(this.time())} ${fgCyan}[I]${reset} ${msg}`);
    debug = (msg: string) => console.log(`${(this.time())} ${fgGreen}[D]${reset} ${msg}`);
    warn = (msg: string) => console.log(`${(this.time())} ${fgYellow}[W]${reset} ${msg}`);
    error = (name: string, msg: string) => console.log(`${(this.time())} ${fgRed}[E]${reset} ${name}: ${msg}`);
}