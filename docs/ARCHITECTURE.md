# Weather CLI - Technical Architecture

This document provides an overview of the technical architecture and design decisions for the Weather CLI application.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Design Patterns](#design-patterns)
   - [1. Command Pattern](#1-command-pattern)
   - [2. Service Layer Pattern](#2-service-layer-pattern)
   - [3. Dependency Injection](#3-dependency-injection)
3. [File Structure Explanation](#file-structure-explanation)
   - [/src/app.ts](#srcappts)
   - [/src/commands/](#srccommands)
   - [/src/services/](#srcservices)
   - [/src/types/](#srctypes)
   - [/src/utils/](#srcutils)
4. [Key Design Decisions](#key-design-decisions)
   - [1. TypeScript First](#1-typescript-first)
   - [2. Separation of API and Internal Types](#2-separation-of-api-and-internal-types)
   - [3. Error Handling Strategy](#3-error-handling-strategy)
   - [4. Extensibility Features](#4-extensibility-features)
5. [Testing Strategy (Future Enhancement)](#testing-strategy-future-enhancement)
6. [Performance Considerations](#performance-considerations)
   - [1. HTTP Client Configuration](#1-http-client-configuration)
   - [2. Data Transformation](#2-data-transformation)
   - [3. Memory Management](#3-memory-management)
7. [Security Considerations](#security-considerations)
   - [1. API Key Management](#1-api-key-management)
   - [2. Input Validation](#2-input-validation)
8. [Future Enhancements](#future-enhancements)
   - [1. Caching Layer](#1-caching-layer)
   - [2. Plugin System](#2-plugin-system)
   - [3. Configuration File Support](#3-configuration-file-support)
9. [Metrics and Monitoring (Future)](#metrics-and-monitoring-future)

---

## Architecture Overview

The application follows a layered architecture pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                     CLI Layer                           │
│  (app.ts, commands/index.ts)                          │
├─────────────────────────────────────────────────────────┤
│                   Command Layer                         │
│  (commands/current.ts, commands/forecast.ts)          │
├─────────────────────────────────────────────────────────┤
│                   Service Layer                         │
│  (services/weather.ts, services/api.ts)               │
├─────────────────────────────────────────────────────────┤
│                   Utility Layer                         │
│  (utils/formatter.ts, utils/config.ts, etc.)         │
├─────────────────────────────────────────────────────────┤
│                   Types Layer                           │
│  (types/index.ts)                                      │
└─────────────────────────────────────────────────────────┘
```

## Design Patterns

### 1. Command Pattern
Each CLI command is implemented as a separate class with a consistent `execute()` method:

```typescript
export class CurrentCommand {
    async execute(location: string): Promise<void> {
        // Command implementation
    }
}
```

### 2. Service Layer Pattern
Weather-related business logic is encapsulated in service classes:

```typescript
export class WeatherService {
    async getCurrentWeather(location: string): Promise<WeatherData> {
        // Service implementation
    }
}
```

### 3. Dependency Injection
Configuration is injected into services, making the application testable and configurable:

```typescript
constructor(config: WeatherConfig) {
    this.apiClient = new ApiClient(config);
}
```

## File Structure Explanation

### `/src/app.ts`
- Application entry point
- Sets up Commander.js
- Loads environment variables
- Registers commands

### `/src/commands/`
- **index.ts**: Command registration and CLI setup
- **current.ts**: Current weather command implementation
- **forecast.ts**: Weather forecast command implementation
- **search.ts**: Optional search command (example of extensibility)

### `/src/services/`
- **weather.ts**: Core weather business logic
- **api.ts**: HTTP client abstraction and error handling

### `/src/types/`
- **index.ts**: TypeScript interfaces and type definitions
- Separates API response types from internal data types

### `/src/utils/`
- **config.ts**: Configuration management and validation
- **formatter.ts**: Console output formatting
- **validator.ts**: Input validation utilities
- **logger.ts**: Consistent logging across the application

## Key Design Decisions

### 1. TypeScript First
- Full type safety across the application
- Clear interfaces for all data structures
- Better IDE support and refactoring capabilities

### 2. Separation of API and Internal Types
```typescript
// API Response Type
export interface ApiWeatherResponse {
    location: { name: string; /* ... */ };
    current: { temp_c: number; /* ... */ };
}

// Internal Application Type
export interface WeatherData {
    location: string;
    temperature: number;
    // Simplified, normalized structure
}
```

### 3. Error Handling Strategy
- Comprehensive error catching at API level
- User-friendly error messages with suggestions
- Graceful degradation for network issues

### 4. Extensibility Features

#### Adding New Commands
1. Create new command class in `/src/commands/`
2. Implement the `execute()` method
3. Register in `/src/commands/index.ts`

Example:
```typescript
// src/commands/historical.ts
export class HistoricalCommand {
    async execute(location: string, date: string): Promise<void> {
        // Implementation
    }
}

// src/commands/index.ts
import { HistoricalCommand } from './historical';

const historicalCommand = new HistoricalCommand();
program
    .command('historical')
    .description('Get historical weather data')
    .argument('<location>', 'Location')
    .argument('<date>', 'Date (YYYY-MM-DD)')
    .action(async (location, date) => {
        await historicalCommand.execute(location, date);
    });
```

#### Adding New Services
1. Create service class in `/src/services/`
2. Define interfaces in `/src/types/`
3. Inject configuration as needed

#### Adding New Utilities
1. Create utility functions in `/src/utils/`
2. Export for use across the application
3. Follow single responsibility principle

## Testing Strategy (Future Enhancement)

The architecture supports easy testing:

```typescript
// Unit Testing Example
describe('WeatherService', () => {
    test('should format current weather correctly', async () => {
        const mockConfig: WeatherConfig = {
            apiKey: 'test-key',
            baseUrl: 'https://mock-api.com'
        };
        
        const weatherService = new WeatherService(mockConfig);
        // Test implementation
    });
});
```

## Performance Considerations

### 1. HTTP Client Configuration
- 10-second timeout for API requests
- Proper error handling for network issues
- Axios interceptors for common functionality

### 2. Data Transformation
- Transform API responses to internal types once
- Minimize data processing in formatters
- Cache configuration loading

### 3. Memory Management
- No persistent state in command classes
- Proper cleanup of resources
- Minimal dependencies

## Security Considerations

### 1. API Key Management
- Environment variable validation
- No hardcoded secrets
- Clear error messages for missing keys

### 2. Input Validation
- Location input sanitization
- Parameter validation before API calls
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
// weather-cli.config.js
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