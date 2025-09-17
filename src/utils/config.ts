import { WeatherConfig } from '../types';
import { Validator } from './validator';

/**
 * Load configuration from environment variables
 */
export function loadConfig(): WeatherConfig {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey || !Validator.isValidApiKey(apiKey)) {
        // Throw an error instead of calling process.exit() to allow TUI to handle it gracefully
        throw new Error('Missing or invalid WEATHER_API_KEY environment variable. Please set your Weather API key as an environment variable. Get a free API key at: https://www.weatherapi.com/');
    }

    return {
        apiKey,
        baseUrl: process.env.WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1'
    };
}

/**
 * Check if configuration is valid without throwing errors
 */
export function isConfigValid(): boolean {
    const apiKey = process.env.WEATHER_API_KEY;
    return !!(apiKey && Validator.isValidApiKey(apiKey));
}

/**
 * Get configuration error message for display in TUI
 */
export function getConfigErrorMessage(): string {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey) {
        return 'Weather API key is not set. Please set the WEATHER_API_KEY environment variable.';
    }
    
    if (!Validator.isValidApiKey(apiKey)) {
        return 'Weather API key is invalid. Please check your WEATHER_API_KEY environment variable.';
    }
    
    return 'Configuration is valid';
}

/**
 * Default configuration for development
 */
export const DEFAULT_CONFIG: Partial<WeatherConfig> = {
    baseUrl: 'https://api.weatherapi.com/v1'
};