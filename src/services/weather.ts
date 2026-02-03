import { ApiClient } from './api';
import { WeatherData, ForecastData, AirQualityData, ApiWeatherResponse, ApiForecastResponse, WeatherConfig } from '../types';

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
     * Get raw current weather API response for TUI display
     */
    async getRawCurrentWeather(location: string): Promise<ApiWeatherResponse> {
        try {
            const response = await this.apiClient.get<ApiWeatherResponse>('/current.json', {
                q: location,
                aqi: 'no'
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to fetch current weather for "${location}": ${error}`);
        }
    }

    /**
     * Get air quality data for a location
     */
    async getAirQuality(location: string): Promise<AirQualityData> {
        try {
            const response = await this.apiClient.get<ApiWeatherResponse>('/current.json', {
                q: location,
                aqi: 'yes'
            });

            return this.transformAirQualityResponse(response);
        } catch (error) {
            throw new Error(`Failed to fetch air quality for "${location}": ${error}`);
        }
    }

    /**
     * Get raw air quality API response for TUI display
     */
    async getRawAirQuality(location: string): Promise<ApiWeatherResponse> {
        try {
            const response = await this.apiClient.get<ApiWeatherResponse>('/current.json', {
                q: location,
                aqi: 'yes'
            });

            return response;
        } catch (error) {
            throw new Error(`Failed to fetch air quality for "${location}": ${error}`);
        }
    }

    /**
     * Get raw forecast API response for TUI display
     */
    async getRawForecast(location: string, days: number = 3): Promise<ApiForecastResponse> {
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

            return response;
        } catch (error) {
            throw new Error(`Failed to fetch weather forecast for "${location}": ${error}`);
        }
    }

    /**
     * Alias for getWeatherForecast for backward compatibility
     */
    async getForecast(location: string, days: number = 3): Promise<ForecastData> {
        return this.getWeatherForecast(location, days);
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

    /**
     * Transform API response to our internal AirQualityData format
     */
    private transformAirQualityResponse(response: ApiWeatherResponse): AirQualityData {
        const { location, current } = response;
        const aqi = current.air_quality;
        
        if (!aqi) {
            throw new Error('Air quality data not available for this location');
        }
        
        return {
            location: `${location.name}, ${location.region}, ${location.country}`,
            co: Math.round(aqi.co * 100) / 100,
            o3: Math.round(aqi.o3 * 100) / 100,
            no2: Math.round(aqi.no2 * 100) / 100,
            so2: Math.round(aqi.so2 * 100) / 100,
            pm2_5: Math.round(aqi.pm2_5 * 100) / 100,
            pm10: Math.round(aqi.pm10 * 100) / 100,
            usEpaIndex: aqi['us-epa-index'],
            gbDefraIndex: aqi['gb-defra-index']
        };
    }
}