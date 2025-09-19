# WAIT - Usage Guide

Quick reference for using WAIT (Weather App In Terminal).

## Quick Start

1. **Launch**: Run `./wait-linux` (or `npm start`)
2. **Set Location**: Choose option 1, enter city name (e.g., "London, UK")
3. **Get Weather**: Choose option 2 (current) or 3 (forecast)

## Navigation

| Key | Action |
|-----|--------|
| `↑/↓` | Navigate menu |
| `Enter` | Select item |
| `Escape` | Go back |
| `q` | Quit |

## Menu Options

1. **Enter Location**: Set your city/location for weather queries. Formats: `London`, `New York, NY`, `Paris, France`, coordinates
2. **Current Weather**: Shows temperature, conditions, humidity, wind, pressure
3. **Weather Forecast**: 3-day forecast with highs/lows and conditions  
4. **Settings**: View API key status and configuration
5. **Exit**: Close application

## Location Setup

**Supported formats:**
- `London` (major cities)
- `Austin, TX` (US cities) 
- `Paris, France` (international)
- `51.5074,-0.1278` (coordinates)

**Tips:** Include country/state for accuracy, use official city names.

## Configuration

**Settings Menu** shows:
- Current location status
- API key status (✓ configured / ✗ missing)
- Setup instructions if needed

**Note**: Pre-built executables include an embedded encrypted API key, so you should see "✓ configured" automatically.

**Weather Data:**
- Temperature in Celsius (°C)
- Conditions, humidity, wind (km/h), pressure (mb)
- Real-time data from WeatherAPI.com

## Troubleshooting

**Common Issues:**

- **"Please set location first"** → Use menu option 1
- **API key errors (pre-built executables)** → Shouldn't happen as key is embedded; try re-downloading executable
- **API key errors (source builds)** → Check Settings menu, verify environment variable  
- **"Failed to fetch weather data"** → Check internet, try different location format
- **Broken display** → Ensure terminal is 80x24+, use monospaced font
- **Navigation issues** → Check terminal has focus, try different terminal app

**Quick fixes:** Check API key in Settings, test with simple location like "London"