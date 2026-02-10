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

// API response interfaces (adjust based on your weather API)
export interface ApiWeatherResponse {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
        humidity: number;
        wind_kph: number;
        feelslike_c: number;
        vis_km: number;
        pressure_mb: number;
        uv: number;
        precip_mm: number;
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
    condition: {
        text: string;
    };
    humidity: number;
    wind_kph: number;
    chance_of_rain: number;
    feelslike_c: number;
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
                mintemp_c: number;
                condition: {
                    text: string;
                };
                avghumidity: number;
                maxwind_kph: number;
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
    locationInput: blessed.Widgets.TextboxElement;
    statusBar: blessed.Widgets.BoxElement;
    header: blessed.Widgets.BoxElement;
}

export interface TUIState {
    currentView: ViewType;
    currentLocation?: string;
}

export type ViewType = 'menu' | 'weather' | 'airquality' | 'forecast' | 'settings';