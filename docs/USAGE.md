# WAIT - Usage Guide

Complete guide for using WAIT (Weather App In Terminal) TUI application.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Interface Overview](#interface-overview)
3. [Navigation Guide](#navigation-guide)
4. [Menu Functions](#menu-functions)
5. [Location Management](#location-management)
6. [Weather Information](#weather-information)
7. [Settings and Configuration](#settings-and-configuration)
8. [Keyboard Shortcuts](#keyboard-shortcuts)
9. [Tips and Best Practices](#tips-and-best-practices)
10. [Troubleshooting Common Issues](#troubleshooting-common-issues)

---

## Quick Start

### 1. Launch WAIT
```bash
# Using executable
./wait-linux          # Linux
./wait-macos           # macOS  
wait-win.exe           # Windows

# Using npm (if built from source)
npm start
npm run dev
```

### 2. First Time Setup
1. When WAIT starts, you'll see the main menu
2. Select **"1. Enter Location"** to set your location
3. Type a city name (e.g., "London", "New York, NY")
4. Press **Enter** to confirm

### 3. Get Weather
1. Select **"2. Current Weather"** for current conditions
2. Or select **"3. Weather Forecast"** for 3-day forecast

---

## Interface Overview

WAIT uses a clean, organized TUI (Text User Interface) with three main areas:

```
┌─────────────────────────────────────────┐
│        WAIT - Weather App In Terminal    │  ← Header
├─────────────────────────────────────────┤
│ Main Menu          │ Weather Information │
│                    │                     │
│ 1. Enter Location  │ Select an option    │  ← Main Content
│ 2. Current Weather │ from the menu to    │    (Menu + Display)
│ 3. Weather Forecast│ get started         │
│ 4. Settings        │                     │
│ 5. Exit            │                     │
├─────────────────────────────────────────┤
│ Press ↑/↓ to navigate, Enter to select   │  ← Status Bar
└─────────────────────────────────────────┘
```

### Interface Elements:

- **Header**: Application title and branding
- **Menu Panel**: Interactive menu with numbered options
- **Display Panel**: Shows weather information and messages
- **Status Bar**: Context-sensitive help and instructions

---

## Navigation Guide

### Basic Navigation
| Key | Action | Description |
|-----|--------|-------------|
| `↑` | Up | Move to previous menu item |
| `↓` | Down | Move to next menu item |
| `Enter` | Select | Choose the highlighted menu item |
| `Escape` | Back | Return to previous screen |
| `q` | Quit | Exit the application |

### Navigation Flow
```
Main Menu ──→ Enter Location ──→ [Type location] ──→ Back to Menu
    │                                                      ↑
    ├──→ Current Weather ──→ [Weather Display] ──────────┘
    │                                                      
    ├──→ Weather Forecast ──→ [Forecast Display] ─────────┘
    │
    ├──→ Settings ──→ [Settings Display] ─────────────────┘
    │
    └──→ Exit ──→ [Application Closes]
```

---

## Menu Functions

### 1. Enter Location
**Purpose**: Set your location for weather queries

**How to use:**
1. Select menu item 1
2. Type your location in the input box
3. Press `Enter` to confirm or `Escape` to cancel

**Location formats:**
- City name: `London`
- City, State: `New York, NY`
- City, Country: `Paris, France`
- Coordinates: `40.7128,-74.0060`

### 2. Current Weather
**Purpose**: Display current weather conditions

**Requirements**: Location must be set first

**Information shown:**
- Current temperature (°C)
- Weather condition (e.g., "Sunny", "Cloudy")
- Feels like temperature
- Humidity percentage
- Wind speed and direction
- Atmospheric pressure
- Visibility

**Example display:**
```
Current Weather for London, England, United Kingdom

Temperature: 22°C
Condition: Partly cloudy
Feels Like: 24°C
Humidity: 65%
Wind: 15 km/h SW
Pressure: 1013 mb
Visibility: 10 km
```

### 3. Weather Forecast (3 days)
**Purpose**: Show 3-day weather forecast

**Requirements**: Location must be set first

**Information shown:**
- Daily high and low temperatures
- Weather conditions for each day
- Humidity levels
- Wind speeds

**Example display:**
```
3-Day Forecast for London, England, United Kingdom

Day 1 - 2025-09-14:
  Condition: Partly cloudy
  Max Temperature: 25°C
  Min Temperature: 18°C
  Humidity: 70%
  Max Wind: 20 km/h

Day 2 - 2025-09-15:
  Condition: Light rain
  Max Temperature: 22°C
  Min Temperature: 16°C
  Humidity: 85%
  Max Wind: 25 km/h

Day 3 - 2025-09-16:
  Condition: Sunny
  Max Temperature: 27°C
  Min Temperature: 19°C
  Humidity: 60%
  Max Wind: 15 km/h
```

### 4. Settings
**Purpose**: View configuration and get help

**Information shown:**
- Current location setting
- API key status (✓ configured / ✗ not configured)
- Configuration details
- Setup instructions (if needed)

### 5. Exit
**Purpose**: Safely close the application

**Action**: Immediately exits WAIT

---

## Location Management

### Setting Your Location

1. **From Main Menu**: Select "1. Enter Location"
2. **Input Format**: The location input accepts various formats
3. **Confirmation**: Press `Enter` to save, `Escape` to cancel

### Supported Location Formats

| Format | Example | When to Use |
|--------|---------|-------------|
| City only | `London` | Well-known major cities |
| City, State | `Austin, TX` | US cities (avoids confusion) |
| City, Country | `Paris, France` | International cities |
| Coordinates | `51.5074,-0.1278` | Precise locations |

### Location Tips

**For Accuracy:**
- Include state/country for common city names
- Use official city names (not nicknames)
- Check spelling carefully

**Examples of Good vs Poor Location Inputs:**
```
✅ Good:                    ❌ Poor:
London, UK                  London (ambiguous)
New York, NY               NYC (nickname)
Paris, France              Paris (could be Paris, TX)
Tokyo, Japan               Tokio (misspelled)
```

---

## Weather Information

### Understanding Weather Data

**Temperature**: Always shown in Celsius (°C)
- Current temperature
- "Feels like" temperature (includes wind chill/heat index)
- Daily highs and lows in forecasts

**Conditions**: Descriptive weather states
- Sunny, Cloudy, Partly cloudy
- Light rain, Heavy rain, Drizzle
- Snow, Sleet, Fog
- Thunderstorms, etc.

**Wind**: Speed and direction
- Speed in kilometers per hour (km/h)
- Direction as compass points (N, NE, E, SE, etc.)

**Other Metrics**:
- **Humidity**: Percentage of moisture in air
- **Pressure**: Atmospheric pressure in millibars (mb)
- **Visibility**: How far you can see (km)

### Data Refresh

- **Current Weather**: Real-time data from WeatherAPI.com
- **Forecasts**: Updated multiple times per day
- **No Manual Refresh**: Data is always current when requested

---

## Settings and Configuration

### Accessing Settings
1. Select "4. Settings" from main menu
2. View current configuration
3. Press any key to return to menu

### Configuration Information Shown
- **Current Location**: Your set location or "Not set"
- **API Key Status**: ✓ Configured or ✗ Not configured
- **Base URL**: WeatherAPI.com endpoint
- **Setup Instructions**: If API key is missing

### API Key Status

**✓ Configured:**
- Green checkmark indicates API key is properly set
- Weather functions will work normally

**✗ Not configured:**
- Red X indicates missing or invalid API key
- Settings screen shows setup instructions
- Weather functions will display helpful error messages

---

## Keyboard Shortcuts

### Global Shortcuts (work anywhere)
| Key | Function |
|-----|----------|
| `q` | Quit application immediately |
| `Escape` | Go back to main menu |

### Menu Navigation
| Key | Function |
|-----|----------|
| `↑` / `↓` | Navigate menu items |
| `Enter` | Select highlighted item |

### Location Input
| Key | Function |
|-----|----------|
| `Enter` | Confirm location entry |
| `Escape` | Cancel location entry |
| `Backspace` | Delete characters |
| Text keys | Type location name |

### Weather Display
| Key | Function |
|-----|----------|
| `Escape` | Return to main menu |
| Any other key | Return to main menu |

---

## Tips and Best Practices

### Location Management
1. **Set Location First**: Always set your location before checking weather
2. **Be Specific**: Include state/country for accuracy
3. **Test Different Formats**: If one doesn't work, try another format

### Navigation Efficiency
1. **Use Arrow Keys**: More reliable than mouse in terminal
2. **Remember Shortcuts**: `q` to quit, `Escape` to go back
3. **Check Status Bar**: Shows context-sensitive help

### Terminal Setup
1. **Terminal Size**: Ensure at least 80x24 character display
2. **Font**: Use monospaced fonts for best display
3. **Modern Terminal**: Use updated terminal applications

### API Usage
1. **Check Settings First**: Verify API key status before troubleshooting
2. **Respect Limits**: Free API has rate limits (reasonable for normal use)
3. **Keep Key Secure**: Don't share your API key

---

## Troubleshooting Common Issues

### Problem: "Please set location first"
**Cause**: No location configured
**Solution**: Use menu option 1 to set your location

### Problem: API key error messages
**Cause**: Missing or invalid API key
**Solution**: 
1. Check Settings menu for status
2. Follow setup instructions shown
3. Verify environment variable is set correctly

### Problem: "Failed to fetch weather data"
**Possible Causes & Solutions:**
1. **Network issue**: Check internet connection
2. **Invalid location**: Try different location format
3. **API quota exceeded**: Check WeatherAPI.com dashboard
4. **Server issue**: Try again later

### Problem: Display looks broken or garbled
**Solutions:**
1. Resize terminal window (minimum 80x24)
2. Use a modern terminal application
3. Ensure monospaced font is selected
4. Check terminal UTF-8 support

### Problem: Menu navigation not working
**Solutions:**
1. Ensure terminal has focus
2. Try different arrow keys
3. Use a different terminal application
4. Check if keyboard shortcuts are being intercepted

### Problem: Can't type location
**Solutions:**
1. Make sure you've selected "Enter Location" first
2. Press `Enter` to activate the input field
3. If stuck, press `Escape` to cancel and try again

### Quick Diagnostic Steps
1. **Check API Key**: Go to Settings menu
2. **Test Basic Function**: Try setting a simple location like "London"
3. **Terminal Test**: Ensure arrow keys work in terminal
4. **Network Test**: Check internet connectivity

---

## Getting More Help

- **In-Application**: Check the Settings menu for configuration help
- **Documentation**: See other files in `docs/` folder
- **GitHub**: Report issues or ask questions on the repository
- **WeatherAPI**: Visit WeatherAPI.com for API-related issues

**Remember**: Most issues are related to API key configuration or location formatting. Check these first!