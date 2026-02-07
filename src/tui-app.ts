#!/usr/bin/env node

import { TUIComponents } from './types';
import { ScreenManager } from './ui/screen';
import { Header, Menu, WeatherDisplay, LocationInput, StatusBar } from './ui/components';
import { EventManager } from './ui/event-manager';

/**
 * Main TUI Weather Application
 */
export class WeatherTUI {
    private components: TUIComponents;
    private eventManager: EventManager;

    constructor() {
        // Initialize screen
        const screen = ScreenManager.createScreen();

        // Create UI components
        const header = Header.create(screen);
        const menu = Menu.create(screen);
        const weatherDisplay = WeatherDisplay.create(screen);
        const locationInput = LocationInput.create(screen);
        const statusBar = StatusBar.create(screen);

        // Store components
        this.components = {
            screen,
            header,
            menu,
            weatherDisplay,
            locationInput,
            statusBar
        };

        // Initialize event manager
        this.eventManager = new EventManager(this.components);

        // Setup process handlers
        ScreenManager.setupProcessHandlers(screen, () => ScreenManager.gracefulExit(screen));
        
        // Initial render
        screen.render();
    }

    /**
     * Start the TUI application
     */
    public run(): void {
        // The application is now running and event-driven
        // All interactions are handled by the EventManager
    }

    /**
     * Get the current location from the event manager
     */
    public getCurrentLocation(): string {
        return this.eventManager.getCurrentLocation();
    }

    /**
     * Set the current location programmatically
     */
    public setCurrentLocation(location: string): void {
        this.eventManager.setCurrentLocation(location);
    }
}

/**
 * Main entry point for the application
 */
async function main(): Promise<void> {
    try {
        // Create and start the TUI application
        const app = new WeatherTUI();
        app.run();
    } catch (error) {
        console.error('Failed to start weather application:', error);
        process.exit(1);
    }
}

// Run the application if this file is executed directly
if (require.main === module) {
    main().catch((error) => {
        console.error('Unhandled error:', error);
        process.exit(1);
    });
}