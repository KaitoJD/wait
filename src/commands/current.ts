import { WeatherService } from '../services/weather';
import { formatCurrentWeather, formatError } from '../utils/formatter';
import { loadConfig } from '../utils/config';
import { Validator } from '../utils/validator';
import { Logger } from '../utils/logger';

/**
 * Command to get current weather for a location
 */
export class CurrentCommand {
    private weatherService: WeatherService;

    constructor() {
        const config = loadConfig();
        this.weatherService = new WeatherService(config);
    }

    /**
     * Execute the current weather command
     */
    async execute(location: string): Promise<void> {
        try {
            if (!Validator.isValidLocation(location)) {
                console.log(formatError('Location is required', 'Usage: weather-cli current <location>'));
                return;
            }

            const sanitizedLocation = Validator.sanitizeLocation(location);
            Logger.info(`Fetching current weather for ${sanitizedLocation}...`);
            
            const weatherData = await this.weatherService.getCurrentWeather(sanitizedLocation);
            const formattedData = formatCurrentWeather(weatherData);
            
            console.log(formattedData);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            console.log(formatError(errorMessage));
        }
    }
}