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