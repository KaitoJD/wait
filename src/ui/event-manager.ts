import blessed from 'blessed';
import { TUIComponents } from '../types';
import { Menu, LocationInput, StatusBar, WeatherDisplay } from './components';

export class EventManager {
    private components: TUIComponents;
    private currentLocation: string = '';

    constructor(components: TUIComponents) {
        this.components = components;
        this.setupGlobalHandlers();
        this.setupMenuHandlers();
        this.setupLocationInputHandlers();
    }

    private setupGlobalHandlers(): void {
        // Global quit handlers
        this.components.screen.key(['escape', 'q', 'C-c'], () => {
            return process.exit(0);
        });

        // Tab key to toggle focus between menu and weather display
        this.components.screen.key(['tab'], () => {
            this.toggleFocus();
        });

        // Setup weather display scroll and focus handlers
        this.setupWeatherDisplayHandlers();

        // Focus management
        this.components.menu.focus();
    }

    private setupWeatherDisplayHandlers(): void {
        const weatherDisplay = this.components.weatherDisplay;

        // Handle focus events to update status bar
        weatherDisplay.on('focus', () => {
            StatusBar.showWeatherViewHelp(this.components.statusBar);
        });

        weatherDisplay.on('blur', () => {
            StatusBar.showDefault(this.components.statusBar);
        });
    }

    private toggleFocus(): void {
        if (this.components.menu === this.components.screen.focused) {
            this.components.weatherDisplay.focus();
        } else {
            this.components.menu.focus();
        }
        this.components.screen.render();
    }

    private setupMenuHandlers(): void {
        Menu.setupEventHandlers(this.components.menu, {
            onEnterLocation: () => this.handleEnterLocation(),
            onCurrentWeather: () => this.handleCurrentWeather(),
            onForecast: () => this.handleForecast(),
            onSettings: () => this.handleSettings().catch(console.error),
            onExit: () => this.handleExit()
        });
    }

    private setupLocationInputHandlers(): void {
        LocationInput.setupEventHandlers(this.components.locationInput, {
            onSubmit: (location: string) => this.handleLocationSubmit(location),
            onCancel: () => this.handleLocationCancel()
        });
    }

    private handleEnterLocation(): void {
        StatusBar.showLocationInputHelp(this.components.statusBar);
        LocationInput.show(this.components.locationInput, this.currentLocation);
    }

    private async handleCurrentWeather(): Promise<void> {
        if (!this.currentLocation) {
            StatusBar.showError(this.components.statusBar, 'Please set location first');
            return;
        }

        try {
            // Check configuration first
            const configModule = await import('../utils/config');
            if (!configModule.isConfigValid()) {
                const errorMsg = configModule.getConfigErrorMessage();
                StatusBar.showError(this.components.statusBar, 'Configuration error');
                WeatherDisplay.showError(this.components.weatherDisplay, errorMsg);
                return;
            }

            StatusBar.showLoading(this.components.statusBar, 'current weather');
            
            // Import weather service and config
            const weatherModule = await import('../services/weather');
            
            const config = configModule.loadConfig();
            const weatherService = new weatherModule.WeatherService(config);
            
            const weatherData = await weatherService.getRawCurrentWeather(this.currentLocation);
            
            const formattedWeather = WeatherDisplay.formatCurrentWeather(weatherData);
            
            this.components.weatherDisplay.setContent(formattedWeather);
            this.components.screen.render();
            
            StatusBar.showSuccess(this.components.statusBar, 'Weather data loaded');
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
            StatusBar.showError(this.components.statusBar, errorMessage);
            WeatherDisplay.showError(this.components.weatherDisplay, errorMessage);
        }
    }

    private async handleForecast(): Promise<void> {
        if (!this.currentLocation) {
            StatusBar.showError(this.components.statusBar, 'Please set location first');
            return;
        }

        try {
            // Check configuration first
            const configModule = await import('../utils/config');
            if (!configModule.isConfigValid()) {
                const errorMsg = configModule.getConfigErrorMessage();
                StatusBar.showError(this.components.statusBar, 'Configuration error');
                WeatherDisplay.showError(this.components.weatherDisplay, errorMsg);
                return;
            }

            StatusBar.showLoading(this.components.statusBar, 'weather forecast');
            
            // Import weather service and config
            const weatherModule = await import('../services/weather');
            
            const config = configModule.loadConfig();
            const weatherService = new weatherModule.WeatherService(config);
            
            const forecastData = await weatherService.getRawForecast(this.currentLocation);
            
            const formattedForecast = WeatherDisplay.formatForecast(forecastData);
            
            this.components.weatherDisplay.setContent(formattedForecast);
            this.components.screen.render();
            
            StatusBar.showSuccess(this.components.statusBar, 'Forecast data loaded');
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch forecast data';
            StatusBar.showError(this.components.statusBar, errorMessage);
            WeatherDisplay.showError(this.components.weatherDisplay, errorMessage);
        }
    }

    private async handleSettings(): Promise<void> {
        try {
            // Import config module to check API key status
            const configModule = await import('../utils/config');
            const apiKeyStatus = configModule.isConfigValid() ? 'Configured' : 'Not configured';
            
            const settingsContent = `Settings:

Current Location: ${this.currentLocation || 'Not set'}
API Key Status: ${apiKeyStatus}

Configuration:
• Weather API: WeatherAPI.com
• Base URL: ${process.env.WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1'}

${apiKeyStatus === 'Not configured' ? 'To configure API key:\n1. Get free API key at: https://www.weatherapi.com/\n2. Set environment variable: export WEATHER_API_KEY="your_key"\n3. Restart application\n' : ''}
Available Actions:
1. Change API Key (requires restart)
2. Clear Cache  
3. Reset Application

Note: Settings functionality can be expanded in future versions.
Press any key to return to main menu.`;

            this.components.weatherDisplay.setContent(settingsContent);
            this.components.screen.render();
            StatusBar.updateMessage(this.components.statusBar, 'Settings view - Press any key to return');
        } catch (error) {
            console.error('Error in settings:', error);
        }
    }

    private handleExit(): void {
        process.exit(0);
    }

    private handleLocationSubmit(location: string): void {
        this.currentLocation = location;
        StatusBar.showSuccess(this.components.statusBar, `Location set to: ${location}`);
        
        // Restore focus to menu
        this.components.menu.focus();
        this.components.screen.render();
    }

    private handleLocationCancel(): void {
        StatusBar.showDefault(this.components.statusBar);
        
        // Restore focus to menu
        this.components.menu.focus();
        this.components.screen.render();
    }

    public getCurrentLocation(): string {
        return this.currentLocation;
    }

    public setCurrentLocation(location: string): void {
        this.currentLocation = location;
    }
}