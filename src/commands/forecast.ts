import { WeatherService } from '../services/weather';
import { formatForecast, formatError } from '../utils/formatter';
import { loadConfig } from '../utils/config';
import { Validator } from '../utils/validator';
import { Logger } from '../utils/logger';

/**
 * Command to get weather forecast for a location
 */
export class ForecastCommand {
    private weatherService: WeatherService;

    constructor() {
        const config = loadConfig();
        this.weatherService = new WeatherService(config);
    }

    /**
     * Execute the weather forecast command
     */
    async execute(location: string, days: string = '3'): Promise<void> {
        try {
            if (!Validator.isValidLocation(location)) {
                console.log(formatError('Location is required', 'Usage: weather-cli forecast <location> [days]'));
                return;
            }

            if (!Validator.isValidForecastDays(days)) {
                console.log(formatError('Invalid number of days', 'Days must be between 1 and 10'));
                return;
            }

            const sanitizedLocation = Validator.sanitizeLocation(location);
            const forecastDays = parseInt(days, 10);
            
            Logger.info(`Fetching ${forecastDays}-day weather forecast for ${sanitizedLocation}...`);
            
            const forecastData = await this.weatherService.getWeatherForecast(sanitizedLocation, forecastDays);
            const formattedData = formatForecast(forecastData);
            
            console.log(formattedData);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            console.log(formatError(errorMessage));
        }
    }
}