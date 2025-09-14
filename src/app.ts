#!/usr/bin/env node

import blessed from 'blessed';
import { config } from 'dotenv';
import { WeatherService } from './services/weather';
import { loadConfig } from './utils/config';
import { WeatherData, ForecastData } from './types';
import { formatTemperature, formatDateTime } from './utils/formatter';

// Load environment variables
config();

interface TUIState {
    currentLocation: string;
    weatherData: WeatherData | null;
    forecastData: ForecastData | null;
    loading: boolean;
    error: string | null;
    view: 'menu' | 'current' | 'forecast' | 'location-input';
    locationInput: string;
}

class WeatherTUI {
    private screen!: blessed.Widgets.Screen;
    private weatherService: WeatherService;
    private state: TUIState;
    
    // UI Components
    private header!: blessed.Widgets.BoxElement;
    private menu!: blessed.Widgets.ListElement;
    private weatherDisplay!: blessed.Widgets.BoxElement;
    private statusBar!: blessed.Widgets.BoxElement;
    private locationInput!: blessed.Widgets.TextboxElement;

    constructor() {
        this.state = {
            currentLocation: '',
            weatherData: null,
            forecastData: null,
            loading: false,
            error: null,
            view: 'menu',
            locationInput: ''
        };

        try {
            const appConfig = loadConfig();
            this.weatherService = new WeatherService(appConfig);
        } catch (error) {
            console.error('Failed to initialize weather service:', error);
            process.exit(1);
        }

        this.setupScreen();
        this.setupUI();
        this.setupEventHandlers();
        this.setupProcessHandlers();
    }

    private setupScreen() {
        this.screen = blessed.screen({
            smartCSR: true,
            title: 'WAIT - Weather App In Terminal',
            autoPadding: true,
            dockBorders: true,
            warnings: false
        });

        // Handle pkg compatibility issues
        if ((process as any).pkg) {
            // Disable problematic features in pkg environment
            const program = this.screen.program as any;
            if (program && typeof program.isAlt === 'undefined') {
                program.isAlt = false;
            }
        }
    }

    private setupUI() {
        this.createHeader();
        this.createMenu();
        this.createWeatherDisplay();
        this.createLocationInput();
        this.createStatusBar();
        
        this.showMenu();
        this.screen.render();
    }

    private createHeader() {
        this.header = blessed.box({
            top: 0,
            left: 0,
            width: '100%',
            height: 3,
            content: '{center}WAIT - Weather App In Terminal{/center}',
            tags: true,
            style: {
                fg: 'white',
                bg: 'blue',
                bold: true
            },
            border: {
                type: 'line'
            }
        });

        this.screen.append(this.header);
    }

    private createMenu() {
        this.menu = blessed.list({
            label: ' Main Menu ',
            top: 3,
            left: 0,
            width: '40%',
            height: '70%',
            items: [
                '1. Enter Location',
                '2. Current Weather',
                '3. Weather Forecast (3 days)',
                '4. Settings',
                '5. Exit'
            ],
            keys: true,
            vi: true,
            style: {
                selected: {
                    bg: 'blue',
                    fg: 'white'
                },
                item: {
                    fg: 'white'
                }
            },
            border: {
                type: 'line'
            }
        });

        this.screen.append(this.menu);
    }

    private createWeatherDisplay() {
        this.weatherDisplay = blessed.box({
            label: ' Weather Information ',
            top: 3,
            left: '40%',
            width: '60%',
            height: '70%',
            content: '{center}Select an option from the menu to get started{/center}',
            tags: true,
            scrollable: true,
            alwaysScroll: true,
            scrollbar: {
                ch: ' ',
                track: {
                    bg: 'cyan'
                },
                style: {
                    inverse: true
                }
            },
            border: {
                type: 'line'
            },
            style: {
                fg: 'white'
            }
        });

        this.screen.append(this.weatherDisplay);
    }

    private createLocationInput() {
        this.locationInput = blessed.textbox({
            label: ' Enter Location ',
            top: 'center',
            left: 'center',
            width: '50%',
            height: 5,
            inputOnFocus: true,
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                bg: 'black',
                focus: {
                    bg: 'blue'
                }
            },
            hidden: true
        });

        this.screen.append(this.locationInput);
    }

    private createStatusBar() {
        this.statusBar = blessed.box({
            bottom: 0,
            left: 0,
            width: '100%',
            height: 3,
            content: '{center}↑↓: Navigate | Enter: Select | ESC: Back/Exit | q: quit{/center}',
            tags: true,
            style: {
                fg: 'white',
                bg: 'gray'
            }
        });

        this.screen.append(this.statusBar);
    }

    private setupEventHandlers() {
        // Global key handlers
        this.screen.key(['escape', 'q', 'C-c'], () => {
            if (this.state.view === 'menu') {
                this.gracefulExit();
            } else {
                this.showMenu();
            }
        });

        // Menu selection handler
        this.menu.on('select', async (item: any, index: number) => {
            switch (index) {
                case 0: // Enter Location
                    this.showLocationInput();
                    break;
                case 1: // Current Weather
                    if (this.state.currentLocation) {
                        await this.getCurrentWeather();
                    } else {
                        this.showError('Please enter a location first!');
                    }
                    break;
                case 2: // Weather Forecast
                    if (this.state.currentLocation) {
                        await this.getWeatherForecast();
                    } else {
                        this.showError('Please enter a location first!');
                    }
                    break;
                case 3: // Settings
                    this.showSettings();
                    break;
                case 4: // Exit
                    this.gracefulExit();
                    break;
            }
        });

        // Location input handler
        this.locationInput.on('submit', (value: string) => {
            if (value.trim()) {
                this.state.currentLocation = value.trim();
                this.state.locationInput = value.trim();
                this.showMenu();
                this.updateStatusBar(`Location set to: ${this.state.currentLocation}`);
            } else {
                this.showError('Please enter a valid location!');
            }
        });

        this.locationInput.key(['escape'], () => {
            this.showMenu();
        });
    }

    private setupProcessHandlers() {
        // Handle process termination gracefully
        process.on('SIGINT', () => this.gracefulExit());
        process.on('SIGTERM', () => this.gracefulExit());
        process.on('exit', () => {
            try {
                if (this.screen) {
                    this.screen.destroy();
                }
            } catch (error) {
                // Ignore cleanup errors
            }
        });
        
        // Handle uncaught exceptions in pkg environment
        if ((process as any).pkg) {
            process.on('uncaughtException', (error) => {
                if (error.message && error.message.includes('isAlt')) {
                    // Ignore blessed pkg compatibility errors
                    this.gracefulExit();
                } else {
                    throw error;
                }
            });
        }
    }

    private showMenu() {
        this.state.view = 'menu';
        this.menu.hidden = false;
        this.weatherDisplay.hidden = false;
        this.locationInput.hidden = true;
        
        this.menu.focus();
        this.updateWeatherDisplay('Select an option from the menu');
        this.screen.render();
    }

    private showLocationInput() {
        this.state.view = 'location-input';
        this.menu.hidden = true;
        this.weatherDisplay.hidden = true;
        this.locationInput.hidden = false;
        
        this.locationInput.clearValue();
        this.locationInput.focus();
        this.updateStatusBar('Enter location (e.g., "London", "New York, NY") and press Enter');
        this.screen.render();
    }

    private async getCurrentWeather() {
        this.state.view = 'current';
        this.state.loading = true;
        this.state.error = null;
        
        this.updateWeatherDisplay('Loading current weather...');
        
        try {
            const weather = await this.weatherService.getCurrentWeather(this.state.currentLocation);
            this.state.weatherData = weather;
            this.state.loading = false;
            this.displayCurrentWeather(weather);
        } catch (error) {
            this.state.loading = false;
            this.state.error = error instanceof Error ? error.message : 'Unknown error occurred';
            this.showError(this.state.error);
        }
    }

    private async getWeatherForecast() {
        this.state.view = 'forecast';
        this.state.loading = true;
        this.state.error = null;
        
        this.updateWeatherDisplay('Loading weather forecast...');
        
        try {
            const forecast = await this.weatherService.getWeatherForecast(this.state.currentLocation, 3);
            this.state.forecastData = forecast;
            this.state.loading = false;
            this.displayWeatherForecast(forecast);
        } catch (error) {
            this.state.loading = false;
            this.state.error = error instanceof Error ? error.message : 'Unknown error occurred';
            this.showError(this.state.error);
        }
    }

    private displayCurrentWeather(weather: WeatherData) {
        const content = [
            `{center}{bold}Current Weather for ${weather.location}{/bold}{/center}`,
            '',
            `🌡️ Temperature: {bold}${formatTemperature(weather.temperature, 'celsius')}{/bold}`,
            `📖 Condition: {bold}${weather.description}{/bold}`,
            `💧 Humidity: {bold}${weather.humidity}%{/bold}`,
            `💨 Wind Speed: {bold}${weather.windSpeed} km/h{/bold}`,
            ''
        ];

        if (weather.feelsLike !== undefined) {
            content.push(`🌡️ Feels Like: {bold}${formatTemperature(weather.feelsLike, 'celsius')}{/bold}`);
        }
        if (weather.pressure !== undefined) {
            content.push(`📊 Pressure: {bold}${weather.pressure} mb{/bold}`);
        }
        if (weather.visibility !== undefined) {
            content.push(`👁️ Visibility: {bold}${weather.visibility} km{/bold}`);
        }

        content.push('', '{center}Press ESC to return to menu{/center}');

        this.updateWeatherDisplay(content.join('\n'));
    }

    private displayWeatherForecast(forecast: ForecastData) {
        const content = [
            `{center}{bold}3-Day Forecast for ${forecast.location}{/bold}{/center}`,
            ''
        ];

        forecast.dailyForecasts.forEach((day, index) => {
            const date = formatDateTime(day.date, 'date');
            content.push(`{bold}Day ${index + 1} - ${date}{/bold}`);
            content.push(`  🌡️  High: ${formatTemperature(day.temperatureHigh, 'celsius')}`);
            content.push(`  🌡️  Low: ${formatTemperature(day.temperatureLow, 'celsius')}`);
            content.push(`  📖 ${day.description}`);
            if (day.humidity !== undefined) {
                content.push(`  💧 Humidity: ${day.humidity}%`);
            }
            if (day.windSpeed !== undefined) {
                content.push(`  💨 Wind: ${day.windSpeed} km/h`);
            }
            content.push('');
        });

        content.push('{center}Press ESC to return to menu{/center}');

        this.updateWeatherDisplay(content.join('\n'));
    }

    private showSettings() {
        const content = [
            '{center}{bold}Settings{/bold}{/center}',
            '',
            '⚙️  Current Configuration:',
            `   📍 Location: ${this.state.currentLocation || 'Not set'}`,
            `   🔑 API: WeatherAPI.com`,
            '',
            '💡 Tips:',
            '   • Set location using "Enter Location" option',
            '   • API key is loaded from WEATHER_API_KEY environment variable',
            '   • Supports locations like "London", "New York, NY", coordinates',
            '',
            '{center}Press ESC to return to menu{/center}'
        ];

        this.updateWeatherDisplay(content.join('\n'));
    }

    private showError(message: string) {
        const content = [
            '{center}{red-fg}{bold}❌ Error{/bold}{/red-fg}{/center}',
            '',
            `{red-fg}${message}{/red-fg}`,
            '',
            '{center}Press ESC to return to menu{/center}'
        ];

        this.updateWeatherDisplay(content.join('\n'));
    }

    private updateWeatherDisplay(content: string) {
        this.weatherDisplay.setContent(content);
        this.screen.render();
    }

    private updateStatusBar(message: string) {
        this.statusBar.setContent(`{center}${message}{/center}`);
        this.screen.render();
    }

    private gracefulExit() {
        try {
            // Safe cleanup for pkg environments
            if (this.screen && this.screen.program) {
                const program = this.screen.program as any;
                if (program.isAlt) {
                    program.alternateBuffer = false;
                    program.normalBuffer();
                }
            }
            
            if (this.screen) {
                this.screen.destroy();
            }
        } catch (error) {
            // Ignore cleanup errors in pkg environment
        }
        
        process.exit(0);
    }

    public start() {
        this.menu.focus();
        this.screen.render();
    }
}

// Start the TUI application
const app = new WeatherTUI();
app.start();