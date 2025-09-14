# WAIT - Technical Architecture# WAIT - Technical Architecture



This document provides an overview of the technical architecture and design decisions for the WAIT (Weather App In Terminal) TUI application.This document provides an overview of the technical architecture and design decisions for the WAIT (Weather App In Terminal) TUI application.



## Table of Contents## Table of Contents



1. [Architecture Overview](#architecture-overview)1. [Architecture Overview](#architecture-overview)

2. [Design Patterns](#design-patterns)2. [Design Patterns](#design-patterns)

3. [File Structure Explanation](#file-structure-explanation)3. [File Structure Explanation](#file-structure-explanation)

4. [Component Architecture](#component-architecture)4. [Component Architecture](#component-architecture)

5. [Key Design Decisions](#key-design-decisions)5. [Key Design Decisions](#key-design-decisions)

6. [Event System](#event-system)6. [Event System](#event-system)

7. [Error Handling Strategy](#error-handling-strategy)7. [Error Handling Strategy](#error-handling-strategy)

8. [Build and Distribution](#build-and-distribution)8. [Build and Distribution](#build-and-distribution)

9. [Security Considerations](#security-considerations)9. [Security Considerations](#security-considerations)

10. [Future Enhancements](#future-enhancements)10. [Future Enhancements](#future-enhancements)



------



## Architecture Overview## Architecture Overview



The application follows a **component-based TUI architecture** with clear separation of concerns:The application follows a **component-based TUI architecture** with clear separation of concerns:



``````

┌─────────────────────────────────────────────────────────┐┌─────────────────────────────────────────────────────────┐

│                   Application Layer                     ││                   Application Layer                     │

│                (src/app.ts, src/tui-app.ts)           ││                (src/app.ts, src/tui-app.ts)           │

├─────────────────────────────────────────────────────────┤├─────────────────────────────────────────────────────────┤

│                     UI Layer                            ││                     UI Layer                            │

│     (src/ui/components/, src/ui/event-manager.ts)     ││     (src/ui/components/, src/ui/event-manager.ts)     │

├─────────────────────────────────────────────────────────┤├─────────────────────────────────────────────────────────┤

│                   Service Layer                         ││                   Service Layer                         │

│              (src/services/weather.ts)                 ││              (src/services/weather.ts)                 │

├─────────────────────────────────────────────────────────┤├─────────────────────────────────────────────────────────┤

│                   Utility Layer                         ││                   Utility Layer                         │

│        (src/utils/config.ts, src/utils/validator.ts)  ││        (src/utils/config.ts, src/utils/validator.ts)  │

├─────────────────────────────────────────────────────────┤├─────────────────────────────────────────────────────────┤

│                  External APIs                          ││                  External APIs                          │

│                (WeatherAPI.com)                        ││                (WeatherAPI.com)                        │

└─────────────────────────────────────────────────────────┘└─────────────────────────────────────────────────────────┘

``````

│                   Service Layer                         │

## Design Patterns│  (services/weather.ts, services/api.ts)               │

├─────────────────────────────────────────────────────────┤

### 1. Component Pattern│                   Utility Layer                         │

Each UI element is encapsulated in its own component class with static factory methods:│  (utils/formatter.ts, utils/config.ts, etc.)         │

- **Header Component**: Application title and branding├─────────────────────────────────────────────────────────┤

- **Menu Component**: Interactive navigation list│                   Types Layer                           │

- **Weather Display**: Dynamic content area for weather information│  (types/index.ts)                                      │

- **Location Input**: Modal text input for location entry└─────────────────────────────────────────────────────────┘

- **Status Bar**: Context-sensitive help and status messages```



### 2. Event Manager Pattern## Design Patterns

Centralized event handling through the `EventManager` class:

- Manages all user interactions### 1. Command Pattern

- Coordinates between components
- Provides clean separation of concerns

- Handles async operations (API calls)

- Provides error handling and user feedback```typescript

export class CurrentCommand {

### 3. Service Layer Pattern

Weather-related business logic is encapsulated in service classes:

- `WeatherService`: API communication and data transformation
- `ApiClient`: HTTP client wrapper with error handling

### 4. Screen Manager Pattern

Terminal screen management with blessed compatibility:

- `ScreenManager`: Screen creation and process handling
- Component lifecycle management
- Event coordination between UI elements

- PKG compatibility fixes for packaged executables

- Graceful exit handling```typescript

export class WeatherService {

## File Structure Explanation    async getCurrentWeather(location: string): Promise<WeatherData> {

        // Service implementation

```    }

src/}

├── app.ts                    # Main application entry point```

├── tui-app.ts               # TUI application class and startup logic

├── types/### 3. Dependency Injection

│   └── index.ts             # TypeScript interfaces and type definitions
├── ui/
│   ├── components/
│   │   ├── index.ts         # Component exports
│   │   ├── header.ts        # Header component
│   │   ├── menu.ts          # Navigation menu component
│   │   ├── weather-display.ts # Weather information display
│   │   ├── location-input.ts  # Location entry modal

│   │   └── status-bar.ts    # Status and help bar## File Structure Explanation

│   ├── event-manager.ts     # Central event handling system

│   ├── screen.ts           # Screen management utilities### `/src/app.ts`

│   └── types.ts            # UI-specific type definitions- Application entry point

├── services/- Sets up Commander.js

│   ├── api.ts              # HTTP client service- Loads environment variables

│   └── weather.ts          # Weather data service- Registers commands

└── utils/

    ├── config.ts           # Configuration management### `/src/commands/`

    ├── formatter.ts        # Data formatting utilities- **index.ts**: Command registration and CLI setup

    ├── logger.ts           # Logging utilities- **current.ts**: Current weather command implementation

    └── validator.ts        # Input validation- **forecast.ts**: Weather forecast command implementation

```- **search.ts**: Optional search command (example of extensibility)



## Component Architecture### `/src/services/`

- **weather.ts**: Core weather business logic

### Component Hierarchy- **api.ts**: HTTP client abstraction and error handling

```

WeatherTUI (Main Application)### `/src/types/`

├── ScreenManager (Terminal Management)- **index.ts**: TypeScript interfaces and type definitions

├── Header (Static Display)- Separates API response types from internal data types

├── Menu (Interactive Navigation) 

├── WeatherDisplay (Dynamic Content)### `/src/utils/`

├── LocationInput (Modal Input)- **config.ts**: Configuration management and validation

├── StatusBar (Context Help)- **formatter.ts**: Console output formatting

└── EventManager (Event Coordination)- **validator.ts**: Input validation utilities

```- **logger.ts**: Consistent logging across the application



### Component Communication## Key Design Decisions

- **Factory Pattern**: Components created via static `create()` methods

- **Event Callbacks**: Components receive callback functions for user actions### 1. TypeScript First

- **State Management**: EventManager maintains application state- Full type safety across the application

- **Screen Rendering**: Components trigger screen updates through blessed- Clear interfaces for all data structures

- Better IDE support and refactoring capabilities

## Key Design Decisions

### 2. Separation of API and Internal Types

### 1. TypeScript First```typescript

- **Full Type Safety**: All components and services are fully typed// API Response Type

- **Interface Definitions**: Clear contracts between componentsexport interface ApiWeatherResponse {

- **Development Experience**: IntelliSense and compile-time error checking    location: { name: string; /* ... */ };

    current: { temp_c: number; /* ... */ };

### 2. Modular UI Architecture}

- **Component Separation**: Each UI element is self-contained

- **Reusable Components**: Factory methods for consistent creation// Internal Application Type

- **Event Decoupling**: EventManager prevents tight coupling between componentsexport interface WeatherData {

    location: string;

### 3. Blessed TUI Library    temperature: number;

- **Cross-Platform**: Works consistently across terminal environments    // Simplified, normalized structure

- **Rich Widgets**: Built-in support for lists, boxes, and input fields}

- **Keyboard Navigation**: Native support for arrow keys and shortcuts```



### 4. PKG Compatibility### 3. Error Handling Strategy

- **Executable Packaging**: Support for standalone binary distribution- Comprehensive error catching at API level

- **Asset Bundling**: Includes necessary runtime dependencies- User-friendly error messages with suggestions

- **Process Handling**: Special handling for packaged environments- Graceful degradation for network issues



## Event System### 4. Extensibility Features



### Event Flow#### Adding New Commands

```1. Create new command class in `/src/commands/`

User Input → blessed Widget → Component Handler → EventManager → Service Layer → API → Response → UI Update2. Implement the `execute()` method

```3. Register in `/src/commands/index.ts`



### Event TypesExample:

- **Navigation Events**: Menu selection, focus changes```typescript

- **Input Events**: Location entry, text input// src/commands/historical.ts

- **System Events**: Application exit, error handlingexport class HistoricalCommand {

- **Async Events**: API calls, loading states    async execute(location: string, date: string): Promise<void> {

        // Implementation

### Error Handling    }

- **Graceful Degradation**: API failures don't crash the application}

- **User Feedback**: Clear error messages with actionable instructions  

- **Configuration Errors**: Helpful setup guidance for missing API keys// src/commands/index.ts

import { HistoricalCommand } from './historical';

## Build and Distribution

const historicalCommand = new HistoricalCommand();

### Development Workflowprogram

```bash    .command('historical')

npm run dev      # TypeScript compilation + execution    .description('Get historical weather data')

npm run build    # TypeScript compilation to dist/    .argument('<location>', 'Location')

npm run build:pkg # Create cross-platform executables    .argument('<date>', 'Date (YYYY-MM-DD)')

```    .action(async (location, date) => {

        await historicalCommand.execute(location, date);

### Target Platforms    });

- **Linux x64**: `wait-linux` executable```

- **Windows x64**: `wait-win.exe` executable  

- **macOS x64**: `wait-macos` executable#### Adding New Services

1. Create service class in `/src/services/`

### Dependencies2. Define interfaces in `/src/types/`

- **Runtime**: Node.js 18+ (embedded in executables)3. Inject configuration as needed

- **Libraries**: blessed (TUI), axios (HTTP), dotenv (config)

- **Development**: TypeScript, pkg (packaging)#### Adding New Utilities

1. Create utility functions in `/src/utils/`

## Security Considerations2. Export for use across the application

3. Follow single responsibility principle

### 1. API Key Management

- **Environment Variables**: API keys stored outside application code## Testing Strategy (Future Enhancement)

- **No Hardcoding**: Prevents accidental exposure in version control

- **Validation**: API key format validation before useThe architecture supports easy testing:



### 2. Input Validation```typescript

- **Location Sanitization**: User input cleaned before API calls// Unit Testing Example

- **Error Boundaries**: Malformed responses don't crash applicationdescribe('WeatherService', () => {

    test('should format current weather correctly', async () => {

### 3. Network Security        const mockConfig: WeatherConfig = {

- **HTTPS Only**: All API communications use encrypted connections            apiKey: 'test-key',

- **Timeout Handling**: Network requests have reasonable timeouts            baseUrl: 'https://mock-api.com'

        };

## Future Enhancements        

        const weatherService = new WeatherService(mockConfig);

### 1. Configuration File Support        // Test implementation

- **Local Settings**: Support for ~/.waitrc configuration file    });

- **Default Locations**: Save frequently used locations});

- **Theme Customization**: Color schemes and display preferences```



### 2. Caching Layer## Performance Considerations

- **Local Storage**: Cache recent weather data to reduce API calls

- **Offline Mode**: Display cached data when network unavailable### 1. HTTP Client Configuration

- **Smart Refresh**: Automatic cache invalidation based on data age- 10-second timeout for API requests

- Proper error handling for network issues

### 3. Plugin System- Axios interceptors for common functionality

- **Weather Providers**: Support for multiple weather APIs

- **Custom Formatters**: User-defined display formats### 2. Data Transformation

- **Extension Points**: Hooks for additional functionality- Transform API responses to internal types once

- Minimize data processing in formatters

### 4. Enhanced UI Features- Cache configuration loading

- **Charts and Graphs**: ASCII-based weather trend visualization

- **Multiple Locations**: Weather comparison across locations### 3. Memory Management

- **Weather Alerts**: Integration with weather warning systems- No persistent state in command classes

- Proper cleanup of resources

### 5. Testing Infrastructure- Minimal dependencies

- **Unit Tests**: Component and service testing

- **Integration Tests**: End-to-end workflow validation## Security Considerations

- **Mock Services**: Testing without external API dependencies

### 1. API Key Management

---- Environment variable validation

- No hardcoded secrets

## Conclusion- Clear error messages for missing keys



The WAIT application demonstrates a clean, modular architecture that separates concerns while providing a rich user experience through the terminal. The component-based design makes the application maintainable and extensible, while the event-driven architecture ensures responsive user interactions.### 2. Input Validation

- Location input sanitization

The choice of TypeScript provides development-time safety, while the blessed library delivers cross-platform terminal compatibility. The PKG packaging system enables distribution as standalone executables without requiring users to install Node.js or manage dependencies.- Parameter validation before API calls
- Prevention of injection attacks through input cleaning

## Future Enhancements

### 1. Caching Layer
```typescript
export class CacheService {
    async get<T>(key: string): Promise<T | null> {
        // Cache implementation
    }
    
    async set<T>(key: string, value: T, ttl: number): Promise<void> {
        // Cache implementation
    }
}
```

### 2. Plugin System
```typescript
export interface WeatherPlugin {
    name: string;
    version: string;
    execute(context: PluginContext): Promise<void>;
}
```

### 3. Configuration File Support
```typescript
// wait.config.js
module.exports = {
    apiKey: process.env.WEATHER_API_KEY,
    defaultLocation: 'London',
    units: 'metric',
    plugins: ['forecast-charts', 'weather-alerts']
};
```

## Metrics and Monitoring (Future)

- API response time tracking
- Error rate monitoring
- Usage analytics
- Performance optimization opportunities