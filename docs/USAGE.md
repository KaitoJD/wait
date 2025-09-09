# Usage Guide

## Table of Contents

1. [Easy Usage with Scripts](#easy-usage-with-scripts)
2. [Commands Overview](#commands-overview)
3. [Current Weather](#current-weather)
   - [Using Wrapper Scripts (Recommended)](#using-wrapper-scripts-recommended)
   - [Direct npm Commands](#direct-npm-commands)
   - [Using Aliases](#using-aliases)
   - [After Building](#after-building)
4. [Weather Forecast](#weather-forecast)
   - [Using Wrapper Scripts (Recommended)](#using-wrapper-scripts-recommended-1)
   - [Direct npm Commands](#direct-npm-commands-1)
5. [Location Formats](#location-formats)
   - [Recommended Formats](#recommended-formats)
   - [Tips for Better Results](#tips-for-better-results)
6. [First Time Setup](#first-time-setup)
   - [Using Wrapper Scripts (Easiest)](#using-wrapper-scripts-easiest)
   - [Manual Setup](#manual-setup)
7. [Command Options](#command-options)
   - [Getting Help](#getting-help)
   - [Version Information](#version-information)
8. [Error Handling](#error-handling)
9. [Development vs Production](#development-vs-production)
   - [Development Mode](#development-mode)
   - [Production Mode](#production-mode)
10. [Advanced Usage](#advanced-usage)
    - [Environment-specific Configuration](#environment-specific-configuration)

---

## Easy Usage with Scripts

For convenience, we provide wrapper scripts that make using the Weather CLI much easier:

### Linux/macOS Users
```bash
./weather.sh current "London"
./weather.sh forecast "Paris" 5
./weather.sh setup  # First time setup
```

### Windows Users
```cmd
weather.bat current "London"
weather.bat forecast "Paris" 5
weather.bat setup  REM First time setup
```

## Commands Overview

The Weather CLI provides two main commands with aliases for convenience:

- `current` (alias: `now`) - Get current weather
- `forecast` (alias: `fc`) - Get weather forecast
- `--help` - Show help information
- `--version` - Show version information

## Current Weather

Get real-time weather information for any location:

### Using Wrapper Scripts (Recommended)
```bash
# Linux/macOS
./weather.sh current "London"
./weather.sh now "New York, NY"

# Windows
weather.bat current "London"
weather.bat now "New York, NY"
```

### Direct npm Commands
```bash
npm run dev current "London"
npm run dev current "New York, NY"
npm run dev current "Tokyo, Japan"
```

### Using Aliases
```bash
npm run dev now "Berlin"
```

### After Building
```bash
node dist/app.js current "Paris"
```

## Weather Forecast

Get weather forecast for multiple days (1-10 days):

### Using Wrapper Scripts (Recommended)
```bash
# Linux/macOS
./weather.sh forecast "London"      # Default 3 days
./weather.sh forecast "Paris" 5     # Custom number of days
./weather.sh fc "Tokyo" 7           # Using alias

# Windows  
weather.bat forecast "London"       # Default 3 days
weather.bat forecast "Paris" 5      # Custom number of days
weather.bat fc "Tokyo" 7            # Using alias
```

### Direct npm Commands
```bash
npm run dev forecast "London"       # Default 3 days
npm run dev forecast "Paris" 5      # Custom number of days
npm run dev fc "Tokyo" 7            # Using alias
```

## Location Formats

The application accepts various location formats:

### Recommended Formats
- `"London"` - City name
- `"New York, NY"` - City, State
- `"London, UK"` - City, Country
- `"Paris, Ile-de-France, France"` - City, Region, Country

### Tips for Better Results
- Use specific location names for accuracy
- Include state/province for US/Canadian cities
- Add country name for international locations
- Famous landmarks work as reference points

## First Time Setup

### Using Wrapper Scripts (Easiest)
```bash
# Linux/macOS
./weather.sh setup

# Windows
weather.bat setup
```

This will automatically:
- Install all dependencies
- Create `.env` file from template
- Build the TypeScript project
- Provide setup instructions

### Manual Setup
If you prefer to set up manually, follow the [Installation Guide](INSTALLATION.md).

## Command Options

### Getting Help
```bash
# Using wrapper scripts
./weather.sh help        # Linux/macOS
weather.bat help         # Windows

# Using npm directly
npm run dev -- --help

# Command-specific help
npm run dev current --help
npm run dev forecast --help
```

### Version Information
```bash
npm run dev -- --version
```

## Error Handling

The CLI provides helpful error messages:

- **Invalid location**: Suggestions for proper location format
- **Network issues**: Clear indication of connectivity problems  
- **API errors**: Specific guidance for API-related issues
- **Invalid parameters**: Help with correct command usage

## Development vs Production

### Development Mode
```bash
npm run dev current "London"
```

### Production Mode
```bash
# Build first
npm run build

# Run built version
node dist/app.js current "London"
```

## Advanced Usage

### Environment-specific Configuration
```bash
# Use different API endpoint
WEATHER_API_BASE_URL="https://custom-api.com/v1" npm run dev current "London"

# Debug mode (if implemented)
DEBUG=true npm run dev current "London"
```