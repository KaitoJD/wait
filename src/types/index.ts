import blessed from 'blessed';

// Core weather data interfaces
export interface WeatherData {
    location: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    feelsLike?: number;
    visibility?: number;
    pressure?: number;
    uvIndex?: number;
    precipitation?: number;
}

export interface ForecastData {
    location: string;
    dailyForecasts: Array<{
        date: string;
        temperatureHigh: number;
        temperatureLow: number;
        description: string;
        humidity?: number;
        windSpeed?: number;
    }>;
}

export interface AirQualityData {
    location: string;
    co: number;
    o3: number;
    no2: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    usEpaIndex: number;
    gbDefraIndex: number;
}

// Unit preference types
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kph' | 'mph';
export type PressureUnit = 'mb' | 'in';
export type VisibilityUnit = 'km' | 'miles';
export type PrecipitationUnit = 'mm' | 'in';
export type UnitPreset = 'metric' | 'imperial' | 'custom';

export interface UnitPreferences {
    preset: UnitPreset;
    temperature: TemperatureUnit;
    windSpeed: WindSpeedUnit;
    pressure: PressureUnit;
    visibility: VisibilityUnit;
    precipitation: PrecipitationUnit;
}

export const DEFAULT_METRIC_PREFERENCES: UnitPreferences = {
    preset: 'metric',
    temperature: 'celsius',
    windSpeed: 'kph',
    pressure: 'mb',
    visibility: 'km',
    precipitation: 'mm'
};

export const DEFAULT_IMPERIAL_PREFERENCES: UnitPreferences = {
    preset: 'imperial',
    temperature: 'fahrenheit',
    windSpeed: 'mph',
    pressure: 'in',
    visibility: 'miles',
    precipitation: 'in'
};

// API response interfaces (adjust based on your weather API)
export interface ApiWeatherResponse {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        temp_c: number;
        temp_f: number;
        condition: {
            text: string;
        };
        humidity: number;
        wind_kph: number;
        wind_mph: number;
        feelslike_c: number;
        feelslike_f: number;
        vis_km: number;
        vis_miles: number;
        pressure_mb: number;
        pressure_in: number;
        uv: number;
        precip_mm: number;
        precip_in: number;
        air_quality?: {
            co: number;
            o3: number;
            no2: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            'us-epa-index': number;
            'gb-defra-index': number;
        };
    };
}

export interface ApiForecastHour {
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
        text: string;
    };
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    chance_of_rain: number;
    feelslike_c: number;
    feelslike_f: number;
}

export interface ApiForecastResponse {
    location: {
        name: string;
        region: string;
        country: string;
    };
    forecast: {
        forecastday: Array<{
            date: string;
            day: {
                maxtemp_c: number;
                maxtemp_f: number;
                mintemp_c: number;
                mintemp_f: number;
                condition: {
                    text: string;
                };
                avghumidity: number;
                maxwind_kph: number;
                maxwind_mph: number;
            };
            hour: ApiForecastHour[];
        }>;
    };
}

// Configuration interface
export interface WeatherConfig {
    apiKey: string;
    baseUrl: string;
}

// TUI Component interfaces
export interface TUIComponents {
    screen: blessed.Widgets.Screen;
    menu: blessed.Widgets.ListElement;
    weatherDisplay: blessed.Widgets.BoxElement;
    forecastList: blessed.Widgets.ListElement;
    settingsList: blessed.Widgets.ListElement;
    locationInput: blessed.Widgets.TextboxElement;
    statusBar: blessed.Widgets.BoxElement;
    header: blessed.Widgets.BoxElement;
}

export interface TUIState {
    currentView: ViewType;
    currentLocation?: string;
}

export interface ApiAstronomyResponse {
    location: {
        name: string;
        region: string;
        country: string;
    };
    astronomy: {
        astro: {
            sunrise: string;
            sunset: string;
            moonrise: string;
            moonset: string;
            moon_phase: string;
            moon_illumination: number;
            is_moon_up: number;
            is_sun_up: number;
        };
    };
}

export type ViewType = 'menu' | 'weather' | 'airquality' | 'forecast' | 'settings' | 'astronomy';