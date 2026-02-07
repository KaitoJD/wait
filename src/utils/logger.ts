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
        const indicator = {
            [LogLevel.INFO]: '[INFO]',
            [LogLevel.WARN]: '[WARNING]',
            [LogLevel.ERROR]: '[ERROR]',
            [LogLevel.SUCCESS]: '[SUCCESS]'
        };

        return `[${timestamp}] ${indicator[level]} ${message}`;
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
