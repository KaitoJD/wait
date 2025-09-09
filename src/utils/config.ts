import { WeatherConfig } from '../types';
import { Validator } from './validator';

/**
 * Load configuration from environment variables
 */
export function loadConfig(): WeatherConfig {
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey || !Validator.isValidApiKey(apiKey)) {
        console.error('❌ Error: Invalid or missing WEATHER_API_KEY environment variable');
        console.log('💡 Please set your Weather API key:');
        console.log('   export WEATHER_API_KEY="your_api_key_here"');
        console.log('   Get a free API key at: https://www.weatherapi.com/');
        process.exit(1);
    }

    return {
        apiKey,
        baseUrl: process.env.WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1'
    };
}

/**
 * Default configuration for development
 */
export const DEFAULT_CONFIG: Partial<WeatherConfig> = {
    baseUrl: 'https://api.weatherapi.com/v1'
};