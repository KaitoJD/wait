#!/usr/bin/env node

import { config } from 'dotenv';
import { WeatherTUI } from './tui-app';

// Load environment variables
config();

/**
 * Main entry point for the weather application
 */
async function main(): Promise<void> {
    try {
        // Create and start the TUI application
        const app = new WeatherTUI();
        app.run();
    } catch (error) {
        console.error('❌ Failed to start weather application:', error);
        process.exit(1);
    }
}

// Run the application
main().catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
});