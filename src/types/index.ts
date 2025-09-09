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
    };
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
        }>;
    };
}

// Configuration interface
export interface WeatherConfig {
    apiKey: string;
    baseUrl: string;
}