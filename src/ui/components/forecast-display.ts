import blessed from 'blessed';
import { ApiForecastResponse, ApiForecastHour, UnitPreferences, DEFAULT_METRIC_PREFERENCES } from '../../types';
import { formatTemperature, formatWindSpeed } from '../../utils/formatter';

export interface ForecastState {
    data: ApiForecastResponse | null;
    expandedDayIndex: number | null;
    units: UnitPreferences;
}

export class ForecastDisplay {
    private static state: ForecastState = {
        data: null,
        expandedDayIndex: null,
        units: { ...DEFAULT_METRIC_PREFERENCES }
    };

    static create(screen: blessed.Widgets.Screen): blessed.Widgets.ListElement {
        const forecastList = blessed.list({
            label: ' 3-Day Forecast (Enter to expand hours) ',
            top: 3,
            left: '40%',
            width: '60%',
            height: '100%-4',
            items: ['No forecast data to display.', '', 'Please select "Enter Location" from the menu,', 'then choose "Weather Forecast" to see data.'],
            keys: true,
            vi: true,
            scrollable: true,
            alwaysScroll: true,
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
                selected: {
                    bg: 'blue',
                    fg: 'white'
                },
                item: {
                    fg: 'white'
                },
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

        // Hidden by default
        forecastList.hide();
        screen.append(forecastList);
        return forecastList;
    }

    static setData(forecastList: blessed.Widgets.ListElement, data: ApiForecastResponse, units: UnitPreferences = DEFAULT_METRIC_PREFERENCES): void {
        this.state.data = data;
        this.state.expandedDayIndex = null;
        this.state.units = { ...units };
        this.render(forecastList);
    }

    static setupEventHandlers(
        forecastList: blessed.Widgets.ListElement,
        callbacks: {
            onBack: () => void;
        }
    ): void {
        forecastList.key(['b'], () => {
            callbacks.onBack();
        });

        forecastList.on('select', (_item: any, index: number) => {
            this.handleSelection(forecastList, index);
        });
    }

    private static handleSelection(forecastList: blessed.Widgets.ListElement, index: number): void {
        if (!this.state.data) return;

        // Get the selected item content from blessed list
        const listItems = (forecastList as any).items || [];
        if (index >= listItems.length) return;
        
        const selectedItem = listItems[index];
        const itemText = selectedItem?.content || selectedItem?.getText?.() || String(selectedItem) || '';

        // Check if it's a day header (contains expand icon and "Day")
        if (itemText.includes('Day ') && (itemText.includes('-') || itemText.includes('>'))) {
            // Extract day index from the selected item
            const dayMatch = itemText.match(/Day (\d+)/);
            if (dayMatch) {
                const dayIndex = parseInt(dayMatch[1], 10) - 1;
                
                // Toggle expansion
                if (this.state.expandedDayIndex === dayIndex) {
                    this.state.expandedDayIndex = null;
                } else {
                    this.state.expandedDayIndex = dayIndex;
                }
                
                this.render(forecastList);
            }
        }
    }

    private static render(forecastList: blessed.Widgets.ListElement): void {
        if (!this.state.data) {
            forecastList.setItems(['No forecast data available.']);
            forecastList.screen.render();
            return;
        }

        const { location, forecast } = this.state.data;
        const items: string[] = [];

        // Location header
        items.push(`Location: ${location.name}, ${location.region}, ${location.country}`);
        items.push('');
        items.push('─'.repeat(50));
        items.push('');

        forecast.forecastday.forEach((day, dayIndex) => {
            const dayData = day.day;
            const isExpanded = this.state.expandedDayIndex === dayIndex;
            const expandIcon = isExpanded ? '>' : '-';
            const units = this.state.units;

            // Day header (selectable)
            items.push(`${expandIcon} Day ${dayIndex + 1} - ${day.date}`);
            items.push(`  ${dayData.condition.text}`);
            items.push(`  High: ${formatTemperature(dayData.maxtemp_c, dayData.maxtemp_f, units.temperature)} | Low: ${formatTemperature(dayData.mintemp_c, dayData.mintemp_f, units.temperature)}`);
            items.push(`  Humidity: ${dayData.avghumidity}% | Wind: ${formatWindSpeed(dayData.maxwind_kph, dayData.maxwind_mph, units.windSpeed)}`);

            // Show hourly data if expanded
            if (isExpanded && day.hour && day.hour.length > 0) {
                items.push('');
                items.push('  ┌─ Hourly Forecast ───────────────────────────────┐');
                
                const hourlyIntervals = [0, 3, 6, 9, 12, 15, 18, 21];
                
                for (const hourIndex of hourlyIntervals) {
                    const hourData = day.hour[hourIndex];
                    if (hourData) {
                        const time = this.formatTime(hourData.time);
                        const temp = formatTemperature(hourData.temp_c, hourData.temp_f, units.temperature);
                        const condition = hourData.condition.text.substring(0, 15);
                        const rain = `${hourData.chance_of_rain}%`;
                        
                        items.push(`  │ ${time.padEnd(6)}  ${temp.padEnd(8)}  ${condition.padEnd(17)}  Rain: ${rain.padEnd(4)} │`);
                    }
                }
                
                items.push('  └─────────────────────────────────────────────────┘');
            }

            items.push('');
        });

        items.push('─'.repeat(50));
        items.push('');
        items.push('Press Enter on a day to toggle hourly forecast');
        items.push('Press B to return to menu');

        forecastList.setItems(items);
        forecastList.screen.render();
    }

    private static formatTime(timeStr: string): string {
        // timeStr format: "2024-01-15 09:00"
        const parts = timeStr.split(' ');
        if (parts.length === 2) {
            return parts[1];
        }
        return timeStr;
    }

    static show(forecastList: blessed.Widgets.ListElement): void {
        forecastList.show();
        forecastList.focus();
        forecastList.screen.render();
    }

    static hide(forecastList: blessed.Widgets.ListElement): void {
        forecastList.hide();
        forecastList.screen.render();
    }

    static reset(): void {
        this.state = {
            data: null,
            expandedDayIndex: null,
            units: { ...DEFAULT_METRIC_PREFERENCES }
        };
    }

    static showLoading(forecastList: blessed.Widgets.ListElement): void {
        forecastList.setItems([
            'Loading forecast data...',
            '',
            'Please wait while we fetch the weather forecast.'
        ]);
        forecastList.screen.render();
    }

    static showError(forecastList: blessed.Widgets.ListElement, error: string): void {
        const items = [
            `Error: ${error}`,
            '',
        ];

        if (error.toLowerCase().includes('api key') || error.toLowerCase().includes('weather_api_key')) {
            items.push('To fix this issue:');
            items.push('');
            items.push('1. Get a free API key at: https://www.weatherapi.com/');
            items.push('2. Sign up → Dashboard → Copy your API key');
            items.push('3. Set the environment variable:');
            items.push('   export WEATHER_API_KEY="your_api_key_here"');
            items.push('4. Restart the application');
        } else {
            items.push('Please check your location and try again.');
            items.push('Press B to return to menu.');
        }

        forecastList.setItems(items);
        forecastList.screen.render();
    }
}
