import blessed from 'blessed';

export class Menu {
    static create(screen: blessed.Widgets.Screen): blessed.Widgets.ListElement {
        const menu = blessed.list({
            label: ' Main Menu ',
            top: 3,
            left: 0,
            width: '40%',
            height: '70%',
            items: [
                '1. Enter Location',
                '2. Current Weather',
                '3. Weather Forecast (3 days)',
                '4. Settings',
                '5. Exit'
            ],
            keys: true,
            vi: true,
            style: {
                selected: {
                    bg: 'blue',
                    fg: 'white'
                },
                item: {
                    fg: 'white'
                }
            },
            border: {
                type: 'line'
            }
        });

        screen.append(menu);
        return menu;
    }

    static setupEventHandlers(
        menu: blessed.Widgets.ListElement, 
        callbacks: {
            onEnterLocation: () => void;
            onCurrentWeather: () => void;
            onForecast: () => void;
            onSettings: () => void;
            onExit: () => void;
        }
    ): void {
        menu.on('select', async (item: any, index: number) => {
            switch (index) {
                case 0: // Enter Location
                    callbacks.onEnterLocation();
                    break;
                case 1: // Current Weather
                    callbacks.onCurrentWeather();
                    break;
                case 2: // Weather Forecast
                    callbacks.onForecast();
                    break;
                case 3: // Settings
                    callbacks.onSettings();
                    break;
                case 4: // Exit
                    callbacks.onExit();
                    break;
            }
        });
    }
}