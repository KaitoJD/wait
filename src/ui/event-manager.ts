import blessed from 'blessed';
import { TUIComponents, UnitPreferences, DEFAULT_METRIC_PREFERENCES } from '../types';
import { Menu, LocationInput, StatusBar, WeatherDisplay, ForecastDisplay, SettingsDisplay } from './components';

export class EventManager {
    private components: TUIComponents;
    private currentLocation: string = '';
    private unitPreferences: UnitPreferences = { ...DEFAULT_METRIC_PREFERENCES };

    constructor(components: TUIComponents) {
        this.components = components;
        this.setupGlobalHandlers();
        this.setupMenuHandlers();
        this.setupLocationInputHandlers();
        this.setupForecastListHandlers();
        this.setupSettingsHandlers();
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
            onAirQuality: () => this.handleAirQuality(),
            onForecast: () => this.handleForecast(),
            onAstronomy: () => this.handleAstronomy(),
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

    private setupForecastListHandlers(): void {
        ForecastDisplay.setupEventHandlers(this.components.forecastList, {
            onBack: () => this.handleForecastBack()
        });

        // Handle focus events
        this.components.forecastList.on('focus', () => {
            StatusBar.updateMessage(this.components.statusBar, 'Enter: toggle hours | B: back to menu | ↑↓: navigate');
        });
    }

    private setupSettingsHandlers(): void {
        SettingsDisplay.setupEventHandlers(this.components.settingsList, {
            onBack: () => this.handleSettingsBack(),
            onPreferencesChanged: (preferences: UnitPreferences) => {
                this.unitPreferences = { ...preferences };
            }
        });

        // Handle focus events
        this.components.settingsList.on('focus', () => {
            StatusBar.updateMessage(this.components.statusBar, 'Enter: toggle setting | B: back to menu | ↑↓: navigate');
        });
    }

    private handleSettingsBack(): void {
        SettingsDisplay.hide(this.components.settingsList);
        this.components.weatherDisplay.show();
        this.components.menu.focus();
        StatusBar.showDefault(this.components.statusBar);
        this.components.screen.render();
    }

    private handleForecastBack(): void {
        ForecastDisplay.hide(this.components.forecastList);
        this.components.weatherDisplay.show();
        this.components.menu.focus();
        StatusBar.showDefault(this.components.statusBar);
        this.components.screen.render();
    }

    private hideAllDisplays(): void {
        ForecastDisplay.hide(this.components.forecastList);
        SettingsDisplay.hide(this.components.settingsList);
        this.components.weatherDisplay.show();
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

        this.hideAllDisplays();

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
            
            const formattedWeather = WeatherDisplay.formatCurrentWeather(weatherData, this.unitPreferences);
            
            this.components.weatherDisplay.setContent(formattedWeather);
            this.components.screen.render();
            
            StatusBar.showSuccess(this.components.statusBar, 'Weather data loaded');
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
            StatusBar.showError(this.components.statusBar, errorMessage);
            WeatherDisplay.showError(this.components.weatherDisplay, errorMessage);
        }
    }

    private async handleAirQuality(): Promise<void> {
        if (!this.currentLocation) {
            StatusBar.showError(this.components.statusBar, 'Please set location first');
            return;
        }

        this.hideAllDisplays();

        try {
            // Check configuration first
            const configModule = await import('../utils/config');
            if (!configModule.isConfigValid()) {
                const errorMsg = configModule.getConfigErrorMessage();
                StatusBar.showError(this.components.statusBar, 'Configuration error');
                WeatherDisplay.showError(this.components.weatherDisplay, errorMsg);
                return;
            }

            StatusBar.showLoading(this.components.statusBar, 'air quality data');
            
            // Import weather service and config
            const weatherModule = await import('../services/weather');
            
            const config = configModule.loadConfig();
            const weatherService = new weatherModule.WeatherService(config);
            
            const airQualityData = await weatherService.getRawAirQuality(this.currentLocation);
            
            const formattedAirQuality = WeatherDisplay.formatAirQuality(airQualityData);
            
            this.components.weatherDisplay.setContent(formattedAirQuality);
            this.components.screen.render();
            
            StatusBar.showSuccess(this.components.statusBar, 'Air quality data loaded');
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch air quality data';
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
                ForecastDisplay.showError(this.components.forecastList, errorMsg);
                return;
            }

            // Hide all displays, then switch to forecast view
            this.hideAllDisplays();
            this.components.weatherDisplay.hide();
            ForecastDisplay.show(this.components.forecastList);
            ForecastDisplay.showLoading(this.components.forecastList);
            StatusBar.showLoading(this.components.statusBar, 'weather forecast');
            
            // Import weather service and config
            const weatherModule = await import('../services/weather');
            
            const config = configModule.loadConfig();
            const weatherService = new weatherModule.WeatherService(config);
            
            const forecastData = await weatherService.getRawForecast(this.currentLocation);
            
            // Set data in the interactive forecast display
            ForecastDisplay.setData(this.components.forecastList, forecastData, this.unitPreferences);
            
            StatusBar.showSuccess(this.components.statusBar, 'Forecast loaded - Enter to expand day');
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch forecast data';
            StatusBar.showError(this.components.statusBar, errorMessage);
            ForecastDisplay.showError(this.components.forecastList, errorMessage);
        }
    }

    private async handleAstronomy(): Promise<void> {
        if (!this.currentLocation) {
            StatusBar.showError(this.components.statusBar, 'Please set location first');
            return;
        }

        this.hideAllDisplays();

        try {
            // Check configuration first
            const configModule = await import('../utils/config');
            if (!configModule.isConfigValid()) {
                const errorMsg = configModule.getConfigErrorMessage();
                StatusBar.showError(this.components.statusBar, 'Configuration error');
                WeatherDisplay.showError(this.components.weatherDisplay, errorMsg);
                return;
            }

            StatusBar.showLoading(this.components.statusBar, 'astronomy data');
            
            // Import weather service and config
            const weatherModule = await import('../services/weather');
            
            const config = configModule.loadConfig();
            const weatherService = new weatherModule.WeatherService(config);
            
            const astronomyData = await weatherService.getRawAstronomy(this.currentLocation);
            
            const formattedAstronomy = WeatherDisplay.formatAstronomy(astronomyData);
            
            this.components.weatherDisplay.setContent(formattedAstronomy);
            this.components.screen.render();
            
            StatusBar.showSuccess(this.components.statusBar, 'Astronomy data loaded');
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch astronomy data';
            StatusBar.showError(this.components.statusBar, errorMessage);
            WeatherDisplay.showError(this.components.weatherDisplay, errorMessage);
        }
    }

    private async handleSettings(): Promise<void> {
        // Hide all displays, then switch to settings view
        this.hideAllDisplays();
        this.components.weatherDisplay.hide();
        SettingsDisplay.show(this.components.settingsList, this.unitPreferences);
        StatusBar.updateMessage(this.components.statusBar, 'Enter: toggle setting | B: back to menu | ↑↓: navigate');
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

    public getUnitPreferences(): UnitPreferences {
        return { ...this.unitPreferences };
    }

    public setUnitPreferences(preferences: UnitPreferences): void {
        this.unitPreferences = { ...preferences };
    }
}