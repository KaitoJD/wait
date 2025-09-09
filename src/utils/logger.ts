/**
 * Logger utility for consistent logging across the application
 */

export enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    SUCCESS = 'success'
}

export class Logger {
    private static formatMessage(level: LogLevel, message: string): string {
        const timestamp = new Date().toLocaleTimeString();
        const icons = {
            [LogLevel.INFO]: 'ℹ️',
            [LogLevel.WARN]: '⚠️',
            [LogLevel.ERROR]: '❌',
            [LogLevel.SUCCESS]: '✅'
        };

        return `[${timestamp}] ${icons[level]} ${message}`;
    }

    static info(message: string): void {
        console.log(this.formatMessage(LogLevel.INFO, message));
    }

    static warn(message: string): void {
        console.warn(this.formatMessage(LogLevel.WARN, message));
    }

    static error(message: string): void {
        console.error(this.formatMessage(LogLevel.ERROR, message));
    }

    static success(message: string): void {
        console.log(this.formatMessage(LogLevel.SUCCESS, message));
    }
}
