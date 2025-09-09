import { Command } from 'commander';
import { CurrentCommand } from './current';
import { ForecastCommand } from './forecast';
// import { SearchCommand } from './search'; // Optional: uncomment to enable search command

/**
 * Register all CLI commands with the Commander.js program
 */
export function registerCommands(program: Command): void {
    const currentCommand = new CurrentCommand();
    const forecastCommand = new ForecastCommand();
    // const searchCommand = new SearchCommand(); // Optional: uncomment to enable search command

    // Current weather command
    program
        .command('current')
        .alias('now')
        .description('Get current weather for a location')
        .argument('<location>', 'Location to get weather for (e.g., "London", "New York, NY")')
        .action(async (location: string) => {
            await currentCommand.execute(location);
        });

    // Weather forecast command
    program
        .command('forecast')
        .alias('fc')
        .description('Get weather forecast for a location')
        .argument('<location>', 'Location to get forecast for (e.g., "London", "New York, NY")')
        .argument('[days]', 'Number of days to forecast (1-10, default: 3)', '3')
        .action(async (location: string, days: string) => {
            await forecastCommand.execute(location, days);
        });

    // Optional: Search command (uncomment to enable)
    /*
    program
        .command('search')
        .alias('find')
        .description('Search for weather information with suggestions')
        .argument('<searchTerm>', 'Search term for location')
        .action(async (searchTerm: string) => {
            await searchCommand.execute(searchTerm);
        });
    */

    // Help command enhancement
    program.on('--help', () => {
        console.log('\nExamples:');
        console.log('  $ weather-cli current "London"');
        console.log('  $ weather-cli current "New York, NY"');
        console.log('  $ weather-cli forecast "Paris" 5');
        console.log('  $ weather-cli fc "Tokyo"');
        console.log('\nEnvironment Variables:');
        console.log('  WEATHER_API_KEY     Your WeatherAPI.com API key (required)');
        console.log('  WEATHER_API_BASE_URL Base URL for the weather API (optional)');
        console.log('\nGet a free API key at: https://www.weatherapi.com/');
    });
}