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
            inputOnFocus: true,  // Automatically enter input mode when focused
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
        locationInput.screen.render();
        
        // Use setImmediate to ensure proper focus after render
        setImmediate(() => {
            locationInput.focus();
            locationInput.readInput();  // Explicitly start input mode
            locationInput.screen.render();
        });
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
        // Handle both 'submit' event and explicit Enter key
        locationInput.on('submit', (value: string) => {
            const location = value.trim();
            if (location) {
                callbacks.onSubmit(location);
            }
            LocationInput.hide(locationInput);
        });

        // Also handle Enter key explicitly to ensure proper input handling
        locationInput.key(['enter'], () => {
            const value = locationInput.getValue();
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