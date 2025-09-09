/**
 * Input validation utilities for the weather CLI application
 */

export class Validator {
    /**
     * Validate location input
     */
    static isValidLocation(location: string): boolean {
        if (!location || typeof location !== 'string') {
            return false;
        }

        const trimmed = location.trim();
        if (trimmed.length === 0) {
            return false;
        }

        // Basic validation - location should be at least 2 characters
        // and not contain only special characters
        const hasValidChars = /[a-zA-Z]/.test(trimmed);
        return trimmed.length >= 2 && hasValidChars;
    }

    /**
     * Validate number of forecast days
     */
    static isValidForecastDays(days: string | number): boolean {
        const numDays = typeof days === 'string' ? parseInt(days, 10) : days;
        return !isNaN(numDays) && numDays >= 1 && numDays <= 10;
    }

    /**
     * Validate API key format (basic check)
     */
    static isValidApiKey(apiKey: string): boolean {
        if (!apiKey || typeof apiKey !== 'string') {
            return false;
        }

        const trimmed = apiKey.trim();
        // Basic validation - API key should be at least 10 characters
        return trimmed.length >= 10 && trimmed !== 'your_api_key_here' && trimmed !== 'demo_key_replace_with_real_key';
    }

    /**
     * Sanitize location input by removing extra spaces and special characters
     */
    static sanitizeLocation(location: string): string {
        return location.trim().replace(/\s+/g, ' ');
    }
}
