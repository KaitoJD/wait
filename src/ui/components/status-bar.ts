import blessed from 'blessed';

export class StatusBar {
    static create(screen: blessed.Widgets.Screen): blessed.Widgets.BoxElement {
        const statusBar = blessed.box({
            bottom: 0,
            left: 0,
            width: '100%',
            height: 1,
            content: ' Press ↑/↓ to navigate, Enter to select, Tab to switch focus, q to quit',
            style: {
                fg: 'white',
                bg: 'blue'
            }
        });

        screen.append(statusBar);
        return statusBar;
    }

    static updateMessage(statusBar: blessed.Widgets.BoxElement, message: string): void {
        statusBar.setContent(` ${message}`);
        statusBar.screen.render();
    }

    static showLoading(statusBar: blessed.Widgets.BoxElement, operation: string): void {
        StatusBar.updateMessage(statusBar, `Loading ${operation}... Please wait`);
    }

    static showError(statusBar: blessed.Widgets.BoxElement, error: string): void {
        StatusBar.updateMessage(statusBar, `Error: ${error} - Press any key to continue`);
    }

    static showSuccess(statusBar: blessed.Widgets.BoxElement, message: string): void {
        StatusBar.updateMessage(statusBar, `Success: ${message}`);
    }

    static showDefault(statusBar: blessed.Widgets.BoxElement): void {
        StatusBar.updateMessage(statusBar, 'Press ↑/↓ to navigate, Enter to select, Tab to switch focus, q to quit');
    }

    static showWeatherViewHelp(statusBar: blessed.Widgets.BoxElement): void {
        StatusBar.updateMessage(statusBar, 'Use ↑/↓ to scroll, Tab for menu, q to quit');
    }

    static showLocationInputHelp(statusBar: blessed.Widgets.BoxElement): void {
        StatusBar.updateMessage(statusBar, 'Type location name and press Enter to confirm, Escape to cancel');
    }
}