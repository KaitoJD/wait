import { TemperatureUnit, WindSpeedUnit, PressureUnit, VisibilityUnit, PrecipitationUnit } from '../types';

/**
 * Format temperature with unit - uses pre-computed API values
 */
export function formatTemperature(tempC: number, tempF: number, unit: TemperatureUnit = 'celsius'): string {
    if (unit === 'fahrenheit') {
        return `${tempF}°F`;
    }
    return `${tempC}°C`;
}

/**
 * Format wind speed with unit - uses pre-computed API values
 */
export function formatWindSpeed(speedKph: number, speedMph: number, unit: WindSpeedUnit = 'kph'): string {
    if (unit === 'mph') {
        return `${speedMph} mph`;
    }
    return `${speedKph} km/h`;
}

/**
 * Format pressure with unit - uses pre-computed API values
 */
export function formatPressure(mb: number, inHg: number, unit: PressureUnit = 'mb'): string {
    if (unit === 'in') {
        return `${inHg} inHg`;
    }
    return `${mb} mb`;
}

/**
 * Format visibility with unit - uses pre-computed API values
 */
export function formatVisibility(km: number, miles: number, unit: VisibilityUnit = 'km'): string {
    if (unit === 'miles') {
        return `${miles} miles`;
    }
    return `${km} km`;
}

/**
 * Format precipitation with unit - uses pre-computed API values
 */
export function formatPrecipitation(mm: number, inches: number, unit: PrecipitationUnit = 'mm'): string {
    if (unit === 'in') {
        return `${inches} in`;
    }
    return `${mm} mm`;
}

/**
 * Format date/time for display
 */
export function formatDateTime(dateStr: string, format: 'date' | 'time' | 'datetime' = 'datetime'): string {
    const date = new Date(dateStr);
    
    switch (format) {
        case 'date':
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
        case 'time':
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        case 'datetime':
        default:
            return date.toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
    }
}