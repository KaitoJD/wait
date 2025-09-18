import { WeatherConfig } from '../types';
import { Validator } from './validator';
import { ApiKeyCrypto } from './crypto';
import { EMBEDDED_API_KEY_PARTS, BUILD_METADATA } from './embedded-key';

/**
 * Get API key from environment variable or embedded encrypted key
 */
function getApiKey(): string | null {
    // First try environment variable (development/user override)
    const envApiKey = process.env.WEATHER_API_KEY;
    if (envApiKey && Validator.isValidApiKey(envApiKey)) {
        return envApiKey;
    }

    // If no env key, try embedded encrypted key
    if (BUILD_METADATA.hasEmbeddedKey && EMBEDDED_API_KEY_PARTS.part1) {
        try {
            const reconstructed = ApiKeyCrypto.reconstructEncryptedKey(
                EMBEDDED_API_KEY_PARTS.part1,
                EMBEDDED_API_KEY_PARTS.part2,
                EMBEDDED_API_KEY_PARTS.part3
            );
            const decryptedKey = ApiKeyCrypto.decryptApiKey(reconstructed);
            
            if (Validator.isValidApiKey(decryptedKey)) {
                return decryptedKey;
            }
        } catch (error) {
            // Silently fail and continue to error handling below
            console.warn('Warning: Failed to decrypt embedded API key');
        }
    }

    return null;
}

/**
 * Load configuration from environment variables or embedded key
 */
export function loadConfig(): WeatherConfig {
    const apiKey = getApiKey();
    
    if (!apiKey) {
        let errorMessage = 'Missing or invalid Weather API key. ';
        if (BUILD_METADATA.hasEmbeddedKey) {
            errorMessage += 'The embedded API key could not be loaded. Please set your WEATHER_API_KEY environment variable as a fallback. ';
        } else {
            errorMessage += 'Please set your WEATHER_API_KEY environment variable. ';
        }
        errorMessage += 'Get a free API key at: https://www.weatherapi.com/';
        
        throw new Error(errorMessage);
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
    try {
        const apiKey = getApiKey();
        return !!(apiKey && Validator.isValidApiKey(apiKey));
    } catch (error) {
        return false;
    }
}

/**
 * Get configuration error message for display in TUI
 */
export function getConfigErrorMessage(): string {
    const envApiKey = process.env.WEATHER_API_KEY;
    const hasEmbeddedKey = BUILD_METADATA.hasEmbeddedKey && EMBEDDED_API_KEY_PARTS.part1;
    
    if (!envApiKey && !hasEmbeddedKey) {
        return 'Weather API key is not set. Please set the WEATHER_API_KEY environment variable or use an executable with an embedded key.';
    }
    
    if (envApiKey && !Validator.isValidApiKey(envApiKey)) {
        return 'Environment variable WEATHER_API_KEY is invalid. Please check your API key.';
    }
    
    if (!envApiKey && hasEmbeddedKey) {
        return 'Using embedded API key from executable.';
    }
    
    if (envApiKey && Validator.isValidApiKey(envApiKey)) {
        return 'Using API key from environment variable.';
    }
    
    return 'Configuration is valid';
}

/**
 * Default configuration for development
 */
export const DEFAULT_CONFIG: Partial<WeatherConfig> = {
    baseUrl: 'https://api.weatherapi.com/v1'
};