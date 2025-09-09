import axios, { AxiosResponse } from 'axios';
import { WeatherConfig } from '../types';

/**
 * Generic API client for making HTTP requests
 */
export class ApiClient {
    private config: WeatherConfig;

    constructor(config: WeatherConfig) {
        this.config = config;
    }

    /**
     * Make a GET request to the weather API
     */
    async get<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
        try {
            const url = `${this.config.baseUrl}${endpoint}`;
            const queryParams = {
                ...params,
                key: this.config.apiKey
            };

            const response: AxiosResponse<T> = await axios.get(url, {
                params: queryParams,
                timeout: 10000, // 10 second timeout
            });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    throw new Error('Invalid API key. Please check your WEATHER_API_KEY environment variable.');
                } else if (error.response?.status === 404) {
                    throw new Error('Location not found. Please check the location name and try again.');
                } else if (error.response?.status === 429) {
                    throw new Error('API rate limit exceeded. Please try again later.');
                } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
                    throw new Error('Network error. Please check your internet connection and try again.');
                }
                throw new Error(`API Error: ${error.response?.statusText || error.message}`);
            }
            throw new Error(`Failed to fetch weather data: ${error}`);
        }
    }
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use ApiClient class instead
 */
export async function fetchWeatherData(url: string): Promise<any> {
    try {
        const response = await axios.get(url, { timeout: 10000 });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Error fetching weather data: ${error.response?.statusText || error.message}`);
        }
        throw new Error(`Error fetching weather data: ${error}`);
    }
}