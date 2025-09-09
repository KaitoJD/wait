import { ApiClient } from './api';
import { WeatherData, ForecastData, ApiWeatherResponse, ApiForecastResponse, WeatherConfig } from '../types';

/**
 * Weather service for fetching current weather and forecast data
 */
export class WeatherService {
    private apiClient: ApiClient;

    constructor(config: WeatherConfig) {
        this.apiClient = new ApiClient(config);
    }

    /**
     * Get current weather for a location
     */
    async getCurrentWeather(location: string): Promise<WeatherData> {
        try {
            const response = await this.apiClient.get<ApiWeatherResponse>('/current.json', {
                q: location,
                aqi: 'no'
            });

            return this.transformCurrentWeatherResponse(response);
        } catch (error) {
            throw new Error(`Failed to fetch current weather for "${location}": ${error}`);
        }
    }

    /**
     * Get weather forecast for a location
     */
    async getWeatherForecast(location: string, days: number = 3): Promise<ForecastData> {
        try {
            if (days < 1 || days > 10) {
                throw new Error('Forecast days must be between 1 and 10');
            }

            const response = await this.apiClient.get<ApiForecastResponse>('/forecast.json', {
                q: location,
                days: days.toString(),
                aqi: 'no',
                alerts: 'no'
            });

            return this.transformForecastResponse(response);
        } catch (error) {
            throw new Error(`Failed to fetch weather forecast for "${location}": ${error}`);
        }
    }

    /**
     * Transform API response to our internal WeatherData format
     */
    private transformCurrentWeatherResponse(response: ApiWeatherResponse): WeatherData {
        const { location, current } = response;
        
        return {
            location: `${location.name}, ${location.region}, ${location.country}`,
            temperature: Math.round(current.temp_c),
            description: current.condition.text,
            humidity: current.humidity,
            windSpeed: Math.round(current.wind_kph),
            feelsLike: Math.round(current.feelslike_c),
            visibility: Math.round(current.vis_km),
            pressure: Math.round(current.pressure_mb)
        };
    }

    /**
     * Transform API response to our internal ForecastData format
     */
    private transformForecastResponse(response: ApiForecastResponse): ForecastData {
        const { location, forecast } = response;
        
        return {
            location: `${location.name}, ${location.region}, ${location.country}`,
            dailyForecasts: forecast.forecastday.map(day => ({
                date: day.date,
                temperatureHigh: Math.round(day.day.maxtemp_c),
                temperatureLow: Math.round(day.day.mintemp_c),
                description: day.day.condition.text,
                humidity: day.day.avghumidity,
                windSpeed: Math.round(day.day.maxwind_kph)
            }))
        };
    }
}