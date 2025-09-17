# WAIT - Architecture

## Architecture Overview

### 5-Layer Structure
1. **Application Entry** (`src/app.ts`, `src/tui-app.ts`) - Bootstrap and orchestration
2. **UI Layer** (`src/ui/`) - Terminal interface with Blessed.js
3. **Services** (`src/services/`) - API integration and data transformation  
4. **Types** (`src/types/`) - TypeScript interfaces and definitions
5. **Utilities** (`src/utils/`) - Cross-cutting concerns (config, validation, formatting)

## Key Components

### UI Layer
- **`ScreenManager`**: Terminal lifecycle and compatibility management
- **`EventManager`**: Central coordinator for user interactions and API calls
- **Components**: Header, Menu, WeatherDisplay, LocationInput, StatusBar

### Services Layer
- **`ApiClient`**: HTTP client with error handling and authentication
- **`WeatherService`**: Weather data operations and API response transformation

### Utilities
- **`config.ts`**: Environment variable management (`WEATHER_API_KEY`)
- **`validator.ts`**: Input validation and sanitization
- **`formatter.ts`**: Temperature and date formatting
- **`logger.ts`**: Structured logging with levels

## Key Features

### Dependencies
- **blessed**: Terminal UI framework
- **axios**: HTTP client for weather API
- **dotenv**: Environment configuration
- **pkg**: Binary packaging for distribution

### Error Handling
- Layered error translation (API → Service → UI)
- User-friendly error messages
- Graceful degradation and cleanup

### Build & Distribution
```bash
npm run dev        # Development with ts-node
npm run build      # TypeScript compilation
npm run build:pkg  # Multi-platform binaries
```

### Security
- Environment variable API key storage
- Input validation and sanitization
- HTTPS-only communication with 10s timeouts

## Design Patterns
- **Facade**: WeatherService simplifies API operations
- **Observer**: Event-driven architecture via EventManager
- **Factory**: Static component creation methods
- **Strategy**: Configurable formatting and API endpoints