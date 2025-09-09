import { WeatherService } from '../services/weather';
import { formatCurrentWeather, formatError } from '../utils/formatter';
import { loadConfig } from '../utils/config';
import { Validator } from '../utils/validator';
import { Logger } from '../utils/logger';

/**
 * Command to search for weather information with auto-suggestions
 * This is an example of how to extend the CLI with additional commands
 */
export class SearchCommand {
    private weatherService: WeatherService;

    constructor() {
        const config = loadConfig();
        this.weatherService = new WeatherService(config);
    }

    /**
     * Execute the search command with location suggestions
     */
    async execute(searchTerm: string): Promise<void> {
        try {
            if (!Validator.isValidLocation(searchTerm)) {
                console.log(formatError('Invalid search term', 'Please provide a valid location name'));
                return;
            }

            const sanitizedLocation = Validator.sanitizeLocation(searchTerm);
            
            Logger.info(`Searching weather for locations matching: ${sanitizedLocation}`);

            // Try to get weather data - if successful, location exists
            const weatherData = await this.weatherService.getCurrentWeather(sanitizedLocation);
            const formattedData = formatCurrentWeather(weatherData);
            
            console.log(formattedData);
            
        } catch (error) {
            // If location not found, provide helpful suggestions
            const errorMessage = error instanceof Error ? error.message : 'Location not found';
            
            if (errorMessage.includes('not found')) {
                console.log(formatError(
                    `Location "${searchTerm}" not found`,
                    'Try using more specific location names like "London, UK" or "New York, NY"'
                ));
                this.suggestAlternatives(searchTerm);
            } else {
                console.log(formatError(errorMessage));
            }
        }
    }

    /**
     * Provide alternative location suggestions
     */
    private suggestAlternatives(searchTerm: string): void {
        console.log('\n💡 Suggestion: Try these location formats:');
        console.log(`   • "${searchTerm}, Country" (e.g., "London, UK")`);
        console.log(`   • "${searchTerm}, State, Country" (e.g., "Springfield, IL, USA")`);
        console.log('   • Use famous landmarks or airports as reference points');
    }
}
