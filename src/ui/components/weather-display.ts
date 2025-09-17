import blessed from 'blessed';
import { ApiWeatherResponse, ApiForecastResponse } from '../../types';

export class WeatherDisplay {
    static create(screen: blessed.Widgets.Screen): blessed.Widgets.BoxElement {
        const weatherBox = blessed.box({
            label: ' Weather Information ',
            top: 3,
            left: '40%',
            width: '60%',
            height: '70%',
            content: 'No weather data to display.\n\nPlease select "Enter Location" from the menu to set your location,\nthen choose "Current Weather" to see the weather information.',
            scrollable: true,
            alwaysScroll: true,
            keys: true,
            vi: true,
            style: {
                fg: 'white'
            },
            border: {
                type: 'line'
            }
        });

        screen.append(weatherBox);
        return weatherBox;
    }

    static formatCurrentWeather(data: ApiWeatherResponse): string {
        const { location, current } = data;
        
        return `Location: ${location.name}, ${location.region}, ${location.country}

Current Weather:
Temperature: ${current.temp_c}°C
Condition: ${current.condition.text}
Feels Like: ${current.feelslike_c}°C
Humidity: ${current.humidity}%
Wind: ${current.wind_kph} km/h
Pressure: ${current.pressure_mb} mb
Visibility: ${current.vis_km} km`;
    }

    static formatForecast(data: ApiForecastResponse): string {
        const { location, forecast } = data;
        
        let content = `Location: ${location.name}, ${location.region}, ${location.country}\n\n`;
        content += `3-Day Weather Forecast:\n\n`;
        
        forecast.forecastday.forEach((day: any, index: number) => {
            const dayData = day.day;
            content += `Day ${index + 1} - ${day.date}:\n`;
            content += `  Condition: ${dayData.condition.text}\n`;
            content += `  Max Temperature: ${dayData.maxtemp_c}°C\n`;
            content += `  Min Temperature: ${dayData.mintemp_c}°C\n`;
            content += `  Humidity: ${dayData.avghumidity}%\n`;
            content += `  Max Wind: ${dayData.maxwind_kph} km/h\n\n`;
        });

        return content;
    }

    static showLoading(weatherBox: blessed.Widgets.BoxElement): void {
        weatherBox.setContent('Loading weather data...\n\nPlease wait while we fetch the latest weather information.');
        weatherBox.screen.render();
    }

    static showError(weatherBox: blessed.Widgets.BoxElement, error: string): void {
        let content = `Error: ${error}\n\n`;
        
        // Check if it's an API key related error
        if (error.toLowerCase().includes('api key') || error.toLowerCase().includes('weather_api_key')) {
            content += 'To fix this issue:\n\n';
            content += '1. Get a free API key at: https://www.weatherapi.com/\n';
            content += '2. Sign up → Dashboard → Copy your API key\n';
            content += '3. Set the environment variable:\n';
            content += '   export WEATHER_API_KEY="your_api_key_here"\n';
            content += '4. Restart the application\n\n';
            content += 'Then you can use the weather functions.';
        } else {
            content += 'Please check your location and try again.\n';
            content += 'Use the menu to enter a new location or check your internet connection.';
        }
        
        weatherBox.setContent(content);
        weatherBox.screen.render();
    }
}