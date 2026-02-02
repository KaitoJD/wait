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
                '3. Air Quality',
                '4. Weather Forecast (3 days)',
                '5. Settings',
                '6. Exit'
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
            onAirQuality: () => void;
            onForecast: () => void;
            onSettings: () => void;
            onExit: () => void;
        }
    ): void {
        menu.on('select', async (item: any, index: number) => {
            switch (index) {
                case 0:
                    callbacks.onEnterLocation();
                    break;
                case 1:
                    callbacks.onCurrentWeather();
                    break;
                case 2:
                    callbacks.onAirQuality();
                    break;
                case 3:
                    callbacks.onForecast();
                    break;
                case 4:
                    callbacks.onSettings();
                    break;
                case 5:
                    callbacks.onExit();
                    break;
            }
        });
    }
}