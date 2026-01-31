import blessed from 'blessed';

export class ScreenManager {
    static createScreen(): blessed.Widgets.Screen {
        const screen = blessed.screen({
            smartCSR: true,
            title: 'WAIT - Weather App In Terminal',
            autoPadding: true,
            dockBorders: true,
            warnings: false
        });

        // Handle pkg compatibility issues
        if ((process as any).pkg) {
            // Disable problematic features in pkg environment
            const program = screen.program as any;
            if (program && typeof program.isAlt === 'undefined') {
                program.isAlt = false;
            }
        }

        return screen;
    }

    static gracefulExit(screen: blessed.Widgets.Screen): void {
        try {
            // Safe cleanup for pkg environments
            if (screen && screen.program) {
                const program = screen.program as any;
                if (program.isAlt) {
                    program.alternateBuffer = false;
                    program.normalBuffer();
                }
            }
            
            if (screen) {
                screen.destroy();
            }
        } catch (error) {
            // Ignore cleanup errors in pkg environment
        }
        
        process.exit(0);
    }

    static setupProcessHandlers(screen: blessed.Widgets.Screen, gracefulExitCallback: () => void): void {
        // Handle process termination gracefully
        process.on('SIGINT', gracefulExitCallback);
        process.on('SIGTERM', gracefulExitCallback);
        process.on('exit', () => {
            try {
                if (screen) {
                    screen.destroy();
                }
            } catch (error) {
                // Ignore cleanup errors
            }
        });
        
        // Handle uncaught exceptions in pkg environment
        if ((process as any).pkg) {
            process.on('uncaughtException', (error) => {
                if (error.message && error.message.includes('isAlt')) {
                    // Ignore blessed pkg compatibility errors
                    gracefulExitCallback();
                } else {
                    throw error;
                }
            });
        }
    }
}