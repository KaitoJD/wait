import blessed from 'blessed';
import { WeatherData, ForecastData } from '../types';

export interface TUIState {
    currentLocation: string;
    weatherData: WeatherData | null;
    forecastData: ForecastData | null;
    loading: boolean;
    error: string | null;
    view: 'menu' | 'current' | 'forecast' | 'location-input';
    locationInput: string;
}

export interface TUIComponents {
    screen: blessed.Widgets.Screen;
    header: blessed.Widgets.BoxElement;
    menu: blessed.Widgets.ListElement;
    weatherDisplay: blessed.Widgets.BoxElement;
    statusBar: blessed.Widgets.BoxElement;
    locationInput: blessed.Widgets.TextboxElement;
}

export type ViewType = TUIState['view'];