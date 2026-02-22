import blessed from 'blessed';
import { ApiWeatherResponse, ApiForecastResponse, ApiAstronomyResponse, UnitPreferences, DEFAULT_METRIC_PREFERENCES } from '../../types';
import { formatTemperature, formatWindSpeed, formatPressure, formatVisibility, formatPrecipitation } from '../../utils/formatter';

export class WeatherDisplay {
    static create(screen: blessed.Widgets.Screen): blessed.Widgets.BoxElement {
        const weatherBox = blessed.box({
            label: ' Weather Information ',
            top: 3,
            left: '40%',
            width: '60%',
            height: '100%-4',
            content: 'No weather data to display.\n\nPlease select "Enter Location" from the menu to set your location,\nthen choose "Current Weather" to see the weather information.',
            scrollable: true,
            alwaysScroll: true,
            keys: true,
            vi: true,
            scrollbar: {
                ch: '│',
                track: {
                    bg: 'gray'
                },
                style: {
                    inverse: true
                }
            },
            style: {
                fg: 'white',
                focus: {
                    border: {
                        fg: 'cyan'
                    }
                }
            },
            border: {
                type: 'line'
            }
        });

        screen.append(weatherBox);
        return weatherBox;
    }

    static formatCurrentWeather(data: ApiWeatherResponse, units: UnitPreferences = DEFAULT_METRIC_PREFERENCES): string {
        const { location, current } = data;
        
        return `Location: ${location.name}, ${location.region}, ${location.country}

Current Weather:
- Temperature: ${formatTemperature(current.temp_c, current.temp_f, units.temperature)}
- Condition: ${current.condition.text}
- Feels Like: ${formatTemperature(current.feelslike_c, current.feelslike_f, units.temperature)}
- Humidity: ${current.humidity}%
- Wind: ${formatWindSpeed(current.wind_kph, current.wind_mph, units.windSpeed)}
- Pressure: ${formatPressure(current.pressure_mb, current.pressure_in, units.pressure)}
- Visibility: ${formatVisibility(current.vis_km, current.vis_miles, units.visibility)}
- UV Index: ${current.uv}
- Precipitation: ${formatPrecipitation(current.precip_mm, current.precip_in, units.precipitation)}`;
    }

    static formatForecast(data: ApiForecastResponse, units: UnitPreferences = DEFAULT_METRIC_PREFERENCES): string {
        const { location, forecast } = data;
        
        let content = `Location: ${location.name}, ${location.region}, ${location.country}\n\n`;
        content += `3-Day Weather Forecast:\n\n`;
        
        forecast.forecastday.forEach((day: any, index: number) => {
            const dayData = day.day;
            content += `Day ${index + 1} - ${day.date}:\n`;
            content += `  Condition: ${dayData.condition.text}\n`;
            content += `  Max Temperature: ${formatTemperature(dayData.maxtemp_c, dayData.maxtemp_f, units.temperature)}\n`;
            content += `  Min Temperature: ${formatTemperature(dayData.mintemp_c, dayData.mintemp_f, units.temperature)}\n`;
            content += `  Humidity: ${dayData.avghumidity}%\n`;
            content += `  Max Wind: ${formatWindSpeed(dayData.maxwind_kph, dayData.maxwind_mph, units.windSpeed)}\n\n`;
        });

        return content;
    }

    static formatAirQuality(data: ApiWeatherResponse): string {
        const { location, current } = data;
        const aqi = current.air_quality;
        
        if (!aqi) {
            return `Location: ${location.name}, ${location.region}, ${location.country}\n\nAir quality data is not available for this location.`;
        }
        
        const epaIndex = aqi['us-epa-index'];
        const epaLabels = ['', 'Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
        const epaLabel = epaLabels[epaIndex] || 'Unknown';
        
        const defraIndex = aqi['gb-defra-index'];
        let defraLabel = 'Unknown';
        if (defraIndex >= 1 && defraIndex <= 3) defraLabel = 'Low';
        else if (defraIndex >= 4 && defraIndex <= 6) defraLabel = 'Moderate';
        else if (defraIndex >= 7 && defraIndex <= 9) defraLabel = 'High';
        else if (defraIndex >= 10) defraLabel = 'Very High';
        
        return `Location: ${location.name}, ${location.region}, ${location.country}

Air Quality Index:
US EPA Index: ${epaIndex} (${epaLabel})
UK DEFRA Index: ${defraIndex} (${defraLabel})

Pollutant Levels:
Carbon Monoxide (CO): ${aqi.co.toFixed(1)} μg/m³
Ozone (O3): ${aqi.o3.toFixed(1)} μg/m³
Nitrogen Dioxide (NO2): ${aqi.no2.toFixed(1)} μg/m³
Sulphur Dioxide (SO2): ${aqi.so2.toFixed(1)} μg/m³
PM2.5: ${aqi.pm2_5.toFixed(1)} μg/m³
PM10: ${aqi.pm10.toFixed(1)} μg/m³

EPA Index Scale:
  1 = Good | 2 = Moderate | 3 = Unhealthy (Sensitive)
  4 = Unhealthy | 5 = Very Unhealthy | 6 = Hazardous`;
    }

    static formatAstronomy(data: ApiAstronomyResponse): string {
        const { location, astronomy } = data;
        const astro = astronomy.astro;

        const moonUp = astro.is_moon_up === 1 ? 'Yes' : 'No';
        const sunUp = astro.is_sun_up === 1 ? 'Yes' : 'No';

        return `Location: ${location.name}, ${location.region}, ${location.country}

Astronomy:
- Sunrise: ${astro.sunrise}
- Sunset: ${astro.sunset}
- Moonrise: ${astro.moonrise}
- Moonset: ${astro.moonset}
- Moon Phase: ${astro.moon_phase}
- Moon Illumination: ${astro.moon_illumination}%

Current Status:
- Sun Up: ${sunUp}
- Moon Up: ${moonUp}`;
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