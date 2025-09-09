# Examples and Output

This document shows example commands and their expected output formats.

## Table of Contents

1. [Wrapper Script Examples](#wrapper-script-examples)
   - [First Time Setup](#first-time-setup)
2. [Current Weather Examples](#current-weather-examples)
   - [Basic Current Weather](#basic-current-weather)
   - [International Location](#international-location)
3. [Weather Forecast Examples](#weather-forecast-examples)
   - [Default 3-Day Forecast](#default-3-day-forecast)
   - [Custom Duration Forecast](#custom-duration-forecast)
4. [Error Examples](#error-examples)
   - [Invalid Location](#invalid-location)
   - [Location Not Found](#location-not-found)
   - [Invalid Forecast Days](#invalid-forecast-days)
   - [Missing API Key](#missing-api-key)
5. [Help Command Examples](#help-command-examples)
   - [General Help](#general-help)
   - [Command-Specific Help](#command-specific-help)
6. [Location Format Examples](#location-format-examples)
   - [Successful Location Formats](#successful-location-formats)
   - [Problematic Location Formats](#problematic-location-formats)

---

## Wrapper Script Examples

### First Time Setup
```bash
# Linux/macOS
./weather.sh setup

# Windows
weather.bat setup
```

**Output:**
```
[INFO] Setting up Weather CLI...
[INFO] Installing dependencies...
✓ Dependencies installed successfully
✓ Created .env file from .env.example
⚠ Please edit .env file and add your WEATHER_API_KEY
  Get a free API key at: https://www.weatherapi.com/
[INFO] Building TypeScript project...
✓ Project built successfully
✓ Setup complete!

Next steps:
1. Edit .env file and add your WeatherAPI.com API key
2. Test with: ./weather.sh current "London"
```

## Current Weather Examples

### Basic Current Weather
```bash
# Using wrapper script (Linux/macOS)
./weather.sh current "London"

# Using wrapper script (Windows)
weather.bat current "London"

# Using npm directly
npm run dev current "London"
```

**Output:**
```
[10:10:14 PM] ℹ️ Fetching current weather for London...
🌤️  Weather Information for London, England, United Kingdom
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌡️  Temperature: 15°C (feels like 13°C)
☁️  Condition: Partly cloudy
💧 Humidity: 72%
💨 Wind Speed: 11 km/h
👁️  Visibility: 10 km
🔘 Pressure: 1013 mb
```

### International Location
```bash
npm run dev current "Tokyo, Japan"
```

**Output:**
```
[10:11:05 PM] ℹ️ Fetching current weather for Tokyo, Japan...
🌤️  Weather Information for Tokyo, Tokyo, Japan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌡️  Temperature: 28°C (feels like 32°C)
☁️  Condition: Sunny
💧 Humidity: 65%
💨 Wind Speed: 8 km/h
👁️  Visibility: 10 km
🔘 Pressure: 1015 mb
```

## Weather Forecast Examples

### Default 3-Day Forecast
```bash
npm run dev forecast "Paris"
```

**Output:**
```
[10:11:26 PM] ℹ️ Fetching 3-day weather forecast for Paris...
🔮 Weather Forecast for Paris, Ile-de-France, France
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Monday, September 9
   🌡️  High: 22°C | Low: 14°C
   ☁️  Partly cloudy
   💧 Humidity: 68%
   💨 Wind: 15 km/h
   ────────────────────────────────────────────
📅 Tuesday, September 10
   🌡️  High: 20°C | Low: 12°C
   ☁️  Light rain
   💧 Humidity: 78%
   💨 Wind: 12 km/h
   ────────────────────────────────────────────
📅 Wednesday, September 11
   🌡️  High: 18°C | Low: 10°C
   ☁️  Overcast
   💧 Humidity: 82%
   💨 Wind: 14 km/h
```

### Custom Duration Forecast
```bash
npm run dev forecast "Sydney" 5
```

**Output:**
```
[10:12:15 PM] ℹ️ Fetching 5-day weather forecast for Sydney...
🔮 Weather Forecast for Sydney, New South Wales, Australia
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 Monday, September 9
   🌡️  High: 24°C | Low: 16°C
   ☁️  Sunny
   💧 Humidity: 55%
   💨 Wind: 12 km/h
   ────────────────────────────────────────────
📅 Tuesday, September 10
   🌡️  High: 26°C | Low: 18°C
   ☁️  Partly cloudy
   💧 Humidity: 58%
   💨 Wind: 10 km/h
   ────────────────────────────────────────────
📅 Wednesday, September 11
   🌡️  High: 23°C | Low: 15°C
   ☁️  Light rain
   💧 Humidity: 72%
   💨 Wind: 15 km/h
   ────────────────────────────────────────────
📅 Thursday, September 12
   🌡️  High: 21°C | Low: 13°C
   ☁️  Overcast
   💧 Humidity: 78%
   💨 Wind: 18 km/h
   ────────────────────────────────────────────
📅 Friday, September 13
   🌡️  High: 25°C | Low: 17°C
   ☁️  Sunny
   💧 Humidity: 52%
   💨 Wind: 8 km/h
```

## Error Examples

### Invalid Location
```bash
npm run dev current ""
```

**Output:**
```
❌ Error: Location is required
💡 Usage: weather-cli current <location>
```

### Location Not Found
```bash
npm run dev current "InvalidCityName12345"
```

**Output:**
```
[10:13:45 PM] ℹ️ Fetching current weather for InvalidCityName12345...
❌ Error: Failed to fetch current weather for "InvalidCityName12345": API Error: Bad Request
```

### Invalid Forecast Days
```bash
npm run dev forecast "London" 15
```

**Output:**
```
❌ Error: Invalid number of days
💡 Days must be between 1 and 10
```

### Missing API Key
```bash
# With invalid or missing API key in .env
npm run dev current "London"
```

**Output:**
```
❌ Error: Invalid or missing WEATHER_API_KEY environment variable
💡 Please set your Weather API key:
   export WEATHER_API_KEY="your_api_key_here"
   Get a free API key at: https://www.weatherapi.com/
```

## Help Command Examples

### General Help
```bash
npm run dev -- --help
```

**Output:**
```
Usage: weather-cli [options] [command]

A CLI application to fetch weather information

Options:
  -V, --version                  output the version number
  -h, --help                     display help for command

Commands:
  current|now <location>         Get current weather for a location
  forecast|fc <location> [days]  Get weather forecast for a location
  help [command]                 display help for command

Examples:
  $ weather-cli current "London"
  $ weather-cli current "New York, NY"
  $ weather-cli forecast "Paris" 5
  $ weather-cli fc "Tokyo"

Environment Variables:
  WEATHER_API_KEY     Your WeatherAPI.com API key (required)
  WEATHER_API_BASE_URL Base URL for the weather API (optional)

Get a free API key at: https://www.weatherapi.com/
```

### Command-Specific Help
```bash
npm run dev current --help
```

**Output:**
```
Usage: weather-cli current|now [options] <location>

Get current weather for a location

Arguments:
  location    Location to get weather for (e.g., "London", "New York, NY")

Options:
  -h, --help  display help for command
```

## Location Format Examples

### Successful Location Formats
- `"London"`
- `"New York, NY"`
- `"Paris, France"`
- `"Tokyo, Japan"`
- `"Sydney, NSW, Australia"`
- `"Los Angeles, CA, USA"`

### Problematic Location Formats
- `""` (Empty string)
- `"123"` (Numbers only)
- `"!@#$%"` (Special characters only)
- `"X"` (Too short)