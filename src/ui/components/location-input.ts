import blessed from 'blessed';

export class LocationInput {
    static create(screen: blessed.Widgets.Screen): blessed.Widgets.TextboxElement {
        const locationInput = blessed.textbox({
            label: ' Enter Location ',
            top: 'center',
            left: 'center',
            width: 60,
            height: 3,
            keys: true,
            mouse: true,
            style: {
                fg: 'white',
                bg: 'black',
                focus: {
                    border: {
                        fg: 'blue'
                    }
                }
            },
            border: {
                type: 'line'
            },
            hidden: true
        });

        screen.append(locationInput);
        return locationInput;
    }

    static show(locationInput: blessed.Widgets.TextboxElement, currentLocation?: string): void {
        if (currentLocation) {
            locationInput.setValue(currentLocation);
        } else {
            locationInput.clearValue();
        }
        
        locationInput.show();
        locationInput.focus();
        locationInput.screen.render();
    }

    static hide(locationInput: blessed.Widgets.TextboxElement): void {
        locationInput.hide();
        locationInput.screen.render();
    }

    static setupEventHandlers(
        locationInput: blessed.Widgets.TextboxElement,
        callbacks: {
            onSubmit: (location: string) => void;
            onCancel: () => void;
        }
    ): void {
        locationInput.on('submit', (value: string) => {
            const location = value.trim();
            if (location) {
                callbacks.onSubmit(location);
            }
            LocationInput.hide(locationInput);
        });

        locationInput.key(['escape'], () => {
            callbacks.onCancel();
            LocationInput.hide(locationInput);
        });
    }
}