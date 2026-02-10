import blessed from 'blessed';
import {
    UnitPreferences,
    DEFAULT_METRIC_PREFERENCES,
    DEFAULT_IMPERIAL_PREFERENCES
} from '../../types';

/**
 * Settings item indices for selection handling
 */
const enum SettingsItem {
    HEADER_TITLE = 0,
    SEPARATOR_1 = 1,
    QUICK_SWITCH_LABEL = 2,
    USE_METRIC = 3,
    USE_IMPERIAL = 4,
    SEPARATOR_2 = 5,
    INDIVIDUAL_LABEL = 6,
    TEMPERATURE = 7,
    WIND_SPEED = 8,
    PRESSURE = 9,
    VISIBILITY = 10,
    PRECIPITATION = 11,
    SEPARATOR_3 = 12,
    HELP_TEXT = 13
}

export class SettingsDisplay {
    private static currentPreferences: UnitPreferences = { ...DEFAULT_METRIC_PREFERENCES };

    static create(screen: blessed.Widgets.Screen): blessed.Widgets.ListElement {
        const settingsList = blessed.list({
            label: ' Settings ',
            top: 3,
            left: '40%',
            width: '60%',
            height: '100%-4',
            items: ['No settings to display.'],
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
        settingsList.hide();
        screen.append(settingsList);
        return settingsList;
    }

    static setPreferences(preferences: UnitPreferences): void {
        this.currentPreferences = { ...preferences };
    }

    static getPreferences(): UnitPreferences {
        return { ...this.currentPreferences };
    }

    static setupEventHandlers(
        settingsList: blessed.Widgets.ListElement,
        callbacks: {
            onBack: () => void;
            onPreferencesChanged: (preferences: UnitPreferences) => void;
        }
    ): void {
        settingsList.key(['b'], () => {
            callbacks.onBack();
        });

        settingsList.on('select', (_item: any, index: number) => {
            const changed = this.handleSelection(settingsList, index);
            if (changed) {
                callbacks.onPreferencesChanged(this.getPreferences());
            }
        });
    }

    private static handleSelection(settingsList: blessed.Widgets.ListElement, index: number): boolean {
        let changed = false;

        switch (index) {
            case SettingsItem.USE_METRIC:
                this.currentPreferences = { ...DEFAULT_METRIC_PREFERENCES };
                changed = true;
                break;
            case SettingsItem.USE_IMPERIAL:
                this.currentPreferences = { ...DEFAULT_IMPERIAL_PREFERENCES };
                changed = true;
                break;
            case SettingsItem.TEMPERATURE:
                this.currentPreferences.temperature =
                    this.currentPreferences.temperature === 'celsius' ? 'fahrenheit' : 'celsius';
                this.updatePreset();
                changed = true;
                break;
            case SettingsItem.WIND_SPEED:
                this.currentPreferences.windSpeed =
                    this.currentPreferences.windSpeed === 'kph' ? 'mph' : 'kph';
                this.updatePreset();
                changed = true;
                break;
            case SettingsItem.PRESSURE:
                this.currentPreferences.pressure =
                    this.currentPreferences.pressure === 'mb' ? 'in' : 'mb';
                this.updatePreset();
                changed = true;
                break;
            case SettingsItem.VISIBILITY:
                this.currentPreferences.visibility =
                    this.currentPreferences.visibility === 'km' ? 'miles' : 'km';
                this.updatePreset();
                changed = true;
                break;
            case SettingsItem.PRECIPITATION:
                this.currentPreferences.precipitation =
                    this.currentPreferences.precipitation === 'mm' ? 'in' : 'mm';
                this.updatePreset();
                changed = true;
                break;
        }

        if (changed) {
            this.render(settingsList);
        }

        return changed;
    }

    /**
     * Recalculate the preset field based on individual settings
     */
    private static updatePreset(): void {
        const p = this.currentPreferences;

        const isMetric =
            p.temperature === 'celsius' &&
            p.windSpeed === 'kph' &&
            p.pressure === 'mb' &&
            p.visibility === 'km' &&
            p.precipitation === 'mm';

        const isImperial =
            p.temperature === 'fahrenheit' &&
            p.windSpeed === 'mph' &&
            p.pressure === 'in' &&
            p.visibility === 'miles' &&
            p.precipitation === 'in';

        if (isMetric) {
            p.preset = 'metric';
        } else if (isImperial) {
            p.preset = 'imperial';
        } else {
            p.preset = 'custom';
        }
    }

    static render(settingsList: blessed.Widgets.ListElement): void {
        const p = this.currentPreferences;
        const items: string[] = [];

        const metricCheck = p.preset === 'metric' ? '●' : '○';
        const imperialCheck = p.preset === 'imperial' ? '●' : '○';

        // Title
        items.push('  Units of Measurement');
        items.push('  ' + '─'.repeat(46));

        // Quick switch section
        items.push('  Quick Switch:');
        items.push(`    [${metricCheck}] Metric  (°C, km/h, mb, km, mm)`);
        items.push(`    [${imperialCheck}] Imperial  (°F, mph, inHg, mi, in)`);
        items.push('  ' + '─'.repeat(46));

        // Individual settings section
        items.push('  Individual Settings:');

        const tempLabel = p.temperature === 'celsius' ? '°C' : '°F';
        const windLabel = p.windSpeed === 'kph' ? 'km/h' : 'mph';
        const pressLabel = p.pressure === 'mb' ? 'mb' : 'inHg';
        const visLabel = p.visibility === 'km' ? 'km' : 'miles';
        const precipLabel = p.precipitation === 'mm' ? 'mm' : 'in';

        items.push(`    Temperature:     °C    ←→  °F      [${tempLabel}]`);
        items.push(`    Wind Speed:      km/h  ←→  mph     [${windLabel}]`);
        items.push(`    Pressure:        mb    ←→  inHg    [${pressLabel}]`);
        items.push(`    Visibility:      km    ←→  miles   [${visLabel}]`);
        items.push(`    Precipitation:   mm    ←→  in      [${precipLabel}]`);
        items.push('  ' + '─'.repeat(46));
        items.push('  Enter: toggle setting | B: back to menu');

        settingsList.setItems(items);
        settingsList.screen.render();
    }

    static show(settingsList: blessed.Widgets.ListElement, preferences: UnitPreferences): void {
        this.currentPreferences = { ...preferences };
        settingsList.show();
        this.render(settingsList);
        settingsList.focus();
        settingsList.screen.render();
    }

    static hide(settingsList: blessed.Widgets.ListElement): void {
        settingsList.hide();
        settingsList.screen.render();
    }
}
