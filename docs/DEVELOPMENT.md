# Development Guide

## Table of Contents

1. [Development Setup](#development-setup)
   - [Scripts](#scripts)
   - [Development Workflow](#development-workflow)
2. [Adding New Features](#adding-new-features)
   - [Adding New Commands](#adding-new-commands)
   - [Adding New Services](#adding-new-services)
   - [Adding New Utilities](#adding-new-utilities)
3. [Code Style Guidelines](#code-style-guidelines)
   - [TypeScript Best Practices](#typescript-best-practices)
   - [File Organization](#file-organization)
   - [Error Handling](#error-handling)
4. [Testing Strategy (Future Implementation)](#testing-strategy-future-implementation)
   - [Unit Testing Structure](#unit-testing-structure)
   - [Integration Testing](#integration-testing)
5. [Debugging](#debugging)
   - [Common Issues](#common-issues)
   - [Debug Logging](#debug-logging)
6. [Performance Optimization](#performance-optimization)
   - [Best Practices](#best-practices)
   - [Memory Management](#memory-management)
7. [Security Considerations](#security-considerations)
   - [API Key Management](#api-key-management)
   - [Input Validation](#input-validation)

---

## Development Setup

### Scripts
- `npm run dev` - Run the application in development mode
- `npm run build` - Build the TypeScript code
- `npm start` - Run the built application

### Development Workflow

1. Make changes to TypeScript files in `src/`
2. Test changes: `npm run dev -- current "test location"`
3. Build and verify: `npm run build`
4. Run built version: `node dist/app.js current "test location"`

## Adding New Features

The application is designed for extensibility with a clean architecture:

### Adding New Commands

1. **Create command file** in `src/commands/`:
```typescript
// src/commands/historical.ts
export class HistoricalCommand {
    async execute(location: string, date: string): Promise<void> {
        // Implementation
    }
}
```

2. **Register command** in `src/commands/index.ts`:
```typescript
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

### Adding New Services

1. **Create service** in `src/services/`:
```typescript
// src/services/alerts.ts
export class AlertsService {
    async getWeatherAlerts(location: string): Promise<AlertData[]> {
        // Implementation
    }
}
```

2. **Define types** in `src/types/index.ts`:
```typescript
export interface AlertData {
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    expires: string;
}
```

### Adding New Utilities

Add helper functions in `src/utils/`:

```typescript
// src/utils/cache.ts
export class CacheManager {
    private cache = new Map<string, { data: any; expires: number }>();
    
    get<T>(key: string): T | null {
        // Cache implementation
    }
    
    set<T>(key: string, value: T, ttlMs: number): void {
        // Cache implementation
    }
}
```

## Code Style Guidelines

### TypeScript Best Practices
- Use strict type checking
- Prefer interfaces over types for object shapes
- Use proper error handling with try-catch blocks
- Document public methods with JSDoc comments

### File Organization
- One class per file
- Consistent naming: PascalCase for classes, camelCase for functions
- Group related functionality in services
- Keep utilities pure and stateless

### Error Handling
- Use specific error messages
- Provide helpful suggestions
- Handle network errors gracefully
- Validate inputs early

## Testing Strategy (Future Implementation)

### Unit Testing Structure
```typescript
// tests/services/weather.test.ts
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

### Integration Testing
```typescript
// tests/commands/current.test.ts
describe('CurrentCommand', () => {
    test('should handle valid location', async () => {
        // Test command execution
    });
    
    test('should handle invalid location', async () => {
        // Test error handling
    });
});
```

## Debugging

### Common Issues

1. **API Key Problems**
   - Check `.env` file exists
   - Verify API key is valid
   - Ensure no extra whitespace

2. **TypeScript Compilation Errors**
   - Run `npm run build` to see specific errors
   - Check import/export statements
   - Verify interface definitions

3. **Network Issues**
   - Test with simple locations like "London"
   - Check internet connectivity
   - Verify API endpoint accessibility

### Debug Logging

Add temporary logging for debugging:
```typescript
import { Logger } from '../utils/logger';

Logger.info(`Fetching weather for: ${location}`);
Logger.error(`API Error: ${error.message}`);
```

## Performance Optimization

### Best Practices
- Cache API responses when appropriate
- Use proper HTTP timeouts
- Minimize data transformation overhead
- Implement proper error boundaries

### Memory Management
- Avoid keeping large objects in memory
- Clean up resources properly
- Use appropriate data structures

## Security Considerations

### API Key Management
- Never commit API keys to version control
- Use environment variables exclusively
- Validate API key format before use
- Rotate keys periodically

### Input Validation
- Sanitize all user inputs
- Validate location formats
- Prevent injection attacks
- Handle malformed data gracefully