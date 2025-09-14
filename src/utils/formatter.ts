import { WeatherData, ForecastData } from '../types';

/**
 * Format current weather data for console output
 */
export function formatCurrentWeather(data: WeatherData): string {
    const { location, temperature, description, humidity, windSpeed, feelsLike, visibility, pressure } = data;

    let output = `
🌤️  Weather Information for ${location}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌡️  Temperature: ${temperature}°C`;

    if (feelsLike !== undefined) {
        output += ` (feels like ${feelsLike}°C)`;
    }

    output += `
☁️  Condition: ${description}
💧 Humidity: ${humidity}%
💨 Wind Speed: ${windSpeed} km/h`;

    if (visibility !== undefined) {
        output += `
👁️  Visibility: ${visibility} km`;
    }

    if (pressure !== undefined) {
        output += `
🔘 Pressure: ${pressure} mb`;
    }

    return output.trim();
}

/**
 * Format weather forecast data for console output
 */
export function formatForecast(data: ForecastData): string {
    const { location, dailyForecasts } = data;

    let output = `
🔮 Weather Forecast for ${location}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    dailyForecasts.forEach((forecast, index) => {
        const date = new Date(forecast.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });

        output += `
📅 ${date}
   🌡️  High: ${forecast.temperatureHigh}°C | Low: ${forecast.temperatureLow}°C
   ☁️  ${forecast.description}`;

        if (forecast.humidity !== undefined) {
            output += `
   💧 Humidity: ${forecast.humidity}%`;
        }

        if (forecast.windSpeed !== undefined) {
            output += `
   💨 Wind: ${forecast.windSpeed} km/h`;
        }

        if (index < dailyForecasts.length - 1) {
            output += '\n   ────────────────────────────────────────────';
        }
    });

    return output.trim();
}

/**
 * Format error messages consistently
 */
export function formatError(message: string, suggestion?: string): string {
    let output = `❌ Error: ${message}`;
    
    if (suggestion) {
        output += `\n💡 ${suggestion}`;
    }

    return output;
}

/**
 * Format temperature with unit
 */
export function formatTemperature(temp: number, unit: 'celsius' | 'fahrenheit' = 'celsius'): string {
    if (unit === 'fahrenheit') {
        return `${Math.round((temp * 9/5) + 32)}°F`;
    }
    return `${Math.round(temp)}°C`;
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