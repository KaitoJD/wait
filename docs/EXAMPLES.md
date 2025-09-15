# WAIT - Examples

## Table of Contents

1. [Getting Started](#getting-started)
2. [Location Examples](#location-examples)
3. [Weather Display](#weather-display)
4. [Error Scenarios](#error-scenarios)
5. [Troubleshooting](#troubleshooting)

---

## Getting Started

### First Launch

Basic flow: Launch → Enter Location → View Weather
1. Use `↑/↓` to navigate menu, `Enter` to select
2. Select "1. Enter Location" and type your city
3. Select "2. Current Weather" or "3. Weather Forecast"

## Location Examples

### Valid Location Formats
- Simple cities: `London`, `Tokyo`
- US cities: `Austin, TX`, `Portland, OR`
- International: `Paris, France`, `Sydney, Australia`
- Coordinates: `40.7128,-74.0060`

## Weather Display

### Current Weather Example
```
Location: London, England, UK

Current Weather:
Temperature: 18°C
Condition: Cloudy
Feels Like: 16°C
Humidity: 72%
Wind: 15 km/h NW
Pressure: 1012 mb
```

### 3-Day Forecast Example
```
Day 1 - 2025-09-14:
  Condition: Cloudy | Max: 20°C | Min: 12°C

Day 2 - 2025-09-15:
  Condition: Rain | Max: 17°C | Min: 10°C

Day 3 - 2025-09-16:
  Condition: Sunny | Max: 22°C | Min: 14°C
```

### Settings Display
- **API Key Status:** Configured ✓ / Not configured ✗
- **Current Location:** Shows set location
- **Actions:** Change API Key, Clear Cache, Reset App

---

## Error Scenarios

### Common Errors

**Missing API Key:**
```
Error: Missing WEATHER_API_KEY environment variable.

To fix:
1. Get free API key at https://www.weatherapi.com/
2. Set: export WEATHER_API_KEY="your_key"
3. Restart application
```

**Location Not Set:**
```
Please set location first
```

**Invalid Location:**
```
Error: Location not found: "InvalidCity"
Try: City, State or City, Country format
```

**Network Error:**
```
Failed to fetch weather data
Check internet connection and try again
```

## Troubleshooting

### Quick Fixes
1. **No Weather Data:** Check Settings → Verify API key configured
2. **Location Errors:** Use format "City, State" or "City, Country"
3. **Display Issues:** Ensure terminal is at least 80×24 characters
4. **Connection Issues:** Verify internet connection

### Setup Test
1. Launch WAIT → Settings → Check "Configured ✓"
2. Enter Location → "London" 
3. Current Weather → Should display data
4. All menu options should work without errors