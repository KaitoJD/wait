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
        weatherBox.setContent(`Error: ${error}\n\nPlease check your location and try again.\nUse the menu to enter a new location or check your internet connection.`);
        weatherBox.screen.render();
    }
}