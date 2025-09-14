# WAIT - Examples and Walkthroughs

This document shows real-world usage examples and expected outputs for WAIT (Weather App In Terminal).

## Table of Contents

1. [Getting Started Walkthrough](#getting-started-walkthrough)
2. [Location Entry Examples](#location-entry-examples)
3. [Current Weather Examples](#current-weather-examples)
4. [Weather Forecast Examples](#weather-forecast-examples)
5. [Settings and Configuration](#settings-and-configuration)
6. [Error Scenarios](#error-scenarios)
7. [Advanced Usage Patterns](#advanced-usage-patterns)
8. [Troubleshooting Examples](#troubleshooting-examples)

---

## Getting Started Walkthrough

### First Run Experience

**Step 1: Launch WAIT**
```bash
./wait-linux
```

**Expected Interface:**
```
┌─────────────────────────────────────────┐
│        WAIT - Weather App In Terminal    │
├─────────────────────────────────────────┤
│ Main Menu          │ Weather Information │
│                    │                     │
│ 1. Enter Location  │ No weather data to  │
│ 2. Current Weather │ display.            │
│ 3. Weather Forecast│                     │
│ 4. Settings        │ Please select       │
│ 5. Exit            │ "Enter Location"    │
│                    │ from the menu to    │
│                    │ set your location.  │
├─────────────────────────────────────────┤
│ Press ↑/↓ to navigate, Enter to select   │
└─────────────────────────────────────────┘
```

**Step 2: Set Location**
- Press `↓` to highlight "1. Enter Location"
- Press `Enter` to select

**Location Input Dialog:**
```
┌─────────────────────────────────────────┐
│        WAIT - Weather App In Terminal    │
├─────────────────────────────────────────┤
│                                         │
│              ┌─ Enter Location ─┐       │
│              │ London, UK       │       │
│              └─────────────────┘       │
│                                         │
├─────────────────────────────────────────┤
│ Type location and press Enter to confirm │
└─────────────────────────────────────────┘
```

**Step 3: Get Weather**
- Type "London, UK" and press `Enter`
- Navigate to "2. Current Weather"
- Press `Enter` to view weather

---

## Location Entry Examples

### Successful Location Formats

#### Major Cities (Simple)
**Input:** `London`
**Result:** ✅ Finds London, England, United Kingdom

**Input:** `Tokyo`
**Result:** ✅ Finds Tokyo, Japan

#### US Cities with State
**Input:** `Austin, TX`
**Result:** ✅ Finds Austin, Texas, United States

**Input:** `Portland, OR`
**Result:** ✅ Finds Portland, Oregon (not Maine)

#### International Cities
**Input:** `Paris, France`
**Result:** ✅ Finds Paris, France (not Paris, Texas)

**Input:** `Sydney, Australia`
**Result:** ✅ Finds Sydney, New South Wales, Australia

#### Coordinates
**Input:** `40.7128,-74.0060`
**Result:** ✅ Finds New York City area

### Location Entry Flow
```
Main Menu → Select "1. Enter Location" → Type Location → Press Enter → Return to Menu
```

**Visual Flow:**
1. **Menu Selection:**
   ```
   │ > 1. Enter Location  │
   │   2. Current Weather │
   ```

2. **Input Dialog:**
   ```
   ┌─ Enter Location ─┐
   │ London          │  ← User typing
   └─────────────────┘
   ```

3. **Confirmation:**
   ```
   │ Success: Location set to: London, England, UK │
   ```

---

## Current Weather Examples

### London Weather Display
**Navigation:** Menu → 2. Current Weather

**Expected Output:**
```
┌─────────────────────────────────────────┐
│        WAIT - Weather App In Terminal    │
├─────────────────────────────────────────┤
│ Main Menu          │ Weather Information │
│                    │                     │
│ 1. Enter Location  │ Location: London,   │
│ 2. Current Weather │ England, United     │
│ 3. Weather Forecast│ Kingdom             │
│ 4. Settings        │                     │
│ 5. Exit            │ Current Weather:    │
│                    │ Temperature: 18°C   │
│                    │ Condition: Cloudy   │
│                    │ Feels Like: 16°C    │
│                    │ Humidity: 72%       │
│                    │ Wind: 15 km/h NW    │
│                    │ Pressure: 1012 mb   │
│                    │ Visibility: 10 km   │
├─────────────────────────────────────────┤
│ Weather data loaded                       │
└─────────────────────────────────────────┘
```

### Tokyo Weather Display
**Location:** `Tokyo, Japan`

**Expected Output:**
```
Location: Tokyo, Tokyo, Japan

Current Weather:
Temperature: 24°C
Condition: Partly cloudy
Feels Like: 27°C
Humidity: 68%
Wind: 8 km/h SE
Pressure: 1018 mb
Visibility: 10 km
```

### Loading State
**During API Call:**
```
│ Loading weather data...                  │
│                                         │
│ Please wait while we fetch the latest   │
│ weather information.                    │
```

**Status Bar During Load:**
```
│ Loading current weather... Please wait   │
```

---

## Weather Forecast Examples

### 3-Day Forecast Display
**Navigation:** Menu → 3. Weather Forecast

**Expected Output:**
```
┌─────────────────────────────────────────┐
│        WAIT - Weather App In Terminal    │
├─────────────────────────────────────────┤
│ Main Menu          │ Weather Information │
│                    │                     │
│ 1. Enter Location  │ Location: London,   │
│ 2. Current Weather │ England, UK         │
│ 3. Weather Forecast│                     │
│ 4. Settings        │ 3-Day Weather       │
│ 5. Exit            │ Forecast:           │
│                    │                     │
│                    │ Day 1 - 2025-09-14: │
│                    │   Condition: Cloudy │
│                    │   Max: 20°C         │
│                    │   Min: 12°C         │
│                    │   Humidity: 75%     │
│                    │   Wind: 18 km/h     │
│                    │                     │
│                    │ Day 2 - 2025-09-15: │
│                    │   Condition: Rain   │
│                    │   Max: 17°C         │
│                    │   Min: 10°C         │
│                    │   Humidity: 85%     │
│                    │   Wind: 22 km/h     │
│                    │                     │
│                    │ Day 3 - 2025-09-16: │
│                    │   Condition: Sunny  │
│                    │   Max: 22°C         │
│                    │   Min: 14°C         │
│                    │   Humidity: 65%     │
│                    │   Wind: 12 km/h     │
├─────────────────────────────────────────┤
│ Forecast data loaded                     │
└─────────────────────────────────────────┘
```

### Scrollable Forecast
**Note:** Forecast content is scrollable in the display panel
- Use arrow keys to scroll through longer forecasts
- All forecast data fits in the display area

---

## Settings and Configuration

### Settings Menu Display
**Navigation:** Menu → 4. Settings

#### With API Key Configured
```
┌─────────────────────────────────────────┐
│        WAIT - Weather App In Terminal    │
├─────────────────────────────────────────┤
│ Main Menu          │ Weather Information │
│                    │                     │
│ 1. Enter Location  │ Settings:           │
│ 2. Current Weather │                     │
│ 3. Weather Forecast│ Current Location:   │
│ 4. Settings        │ London, UK          │
│ 5. Exit            │ API Key Status:     │
│                    │ Configured ✓        │
│                    │                     │
│                    │ Configuration:      │
│                    │ • Weather API:      │
│                    │   WeatherAPI.com    │
│                    │ • Base URL:         │
│                    │   https://api.      │
│                    │   weatherapi.com/v1 │
│                    │                     │
│                    │ Available Actions:  │
│                    │ 1. Change API Key   │
│                    │ 2. Clear Cache      │
│                    │ 3. Reset App        │
├─────────────────────────────────────────┤
│ Settings view - Press any key to return  │
└─────────────────────────────────────────┘
```

#### Without API Key Configured
```
Settings:

Current Location: London, UK
API Key Status: Not configured ✗

To configure API key:
1. Get free API key at: https://www.weatherapi.com/
2. Set environment variable: export WEATHER_API_KEY="your_key"
3. Restart application

Available Actions:
1. Change API Key (requires restart)
2. Clear Cache
3. Reset Application
```

---

## Error Scenarios

### Missing API Key Error
**Scenario:** API key not configured
**Navigation:** Menu → 2. Current Weather

**Error Display:**
```
┌─────────────────────────────────────────┐
│        WAIT - Weather App In Terminal    │
├─────────────────────────────────────────┤
│ Main Menu          │ Weather Information │
│                    │                     │
│ 1. Enter Location  │ Error: Missing or   │
│ 2. Current Weather │ invalid WEATHER_API │
│ 3. Weather Forecast│ _KEY environment    │
│ 4. Settings        │ variable. Please    │
│ 5. Exit            │ set your Weather    │
│                    │ API key as an       │
│                    │ environment         │
│                    │ variable.           │
│                    │                     │
│                    │ To fix this issue:  │
│                    │                     │
│                    │ 1. Get a free API   │
│                    │    key at:          │
│                    │    https://www.     │
│                    │    weatherapi.com/  │
│                    │ 2. Sign up →        │
│                    │    Dashboard →      │
│                    │    Copy your key    │
│                    │ 3. Set environment  │
│                    │    variable:        │
│                    │    export WEATHER_  │
│                    │    API_KEY="your_   │
│                    │    api_key_here"    │
│                    │ 4. Restart the      │
│                    │    application      │
├─────────────────────────────────────────┤
│ Configuration error                      │
└─────────────────────────────────────────┘
```

### Location Not Set Error
**Scenario:** User tries to get weather without setting location
**Navigation:** Menu → 2. Current Weather (without setting location first)

**Error Display:**
```
│ Please set location first               │
```

### Network/API Error
**Scenario:** Internet connection issue or API problem

**Error Display:**
```
Error: Failed to fetch weather data for "InvalidCity"

Please check your location and try again.
Use the menu to enter a new location or check your internet connection.
```

### Invalid Location Error
**Input:** `XYZ123InvalidCity`

**Error Display:**
```
Error: Location not found: "XYZ123InvalidCity"

Please check your location and try again.
Use the menu to enter a new location or check your internet connection.
```

---

## Advanced Usage Patterns

### Workflow for Multiple Locations
1. **Set Location A:** Enter Location → "London, UK"
2. **Check Weather A:** Current Weather → View London data
3. **Change Location:** Enter Location → "Tokyo, Japan"  
4. **Check Weather B:** Current Weather → View Tokyo data
5. **Compare Forecasts:** Weather Forecast for each location

### Daily Weather Check Routine
1. **Launch WAIT:** `./wait-linux`
2. **Quick Check:** Navigate directly to "2. Current Weather"
3. **Extended Info:** Check "3. Weather Forecast" if needed
4. **Quick Exit:** Press `q` to quit

### First-Time User Setup
1. **Launch:** Start WAIT application
2. **Check Settings:** Menu → 4. Settings (verify API key status)
3. **Configure if Needed:** Follow instructions if API key missing
4. **Set Location:** Menu → 1. Enter Location
5. **Test:** Menu → 2. Current Weather
6. **Explore:** Try forecast and other features

---

## Troubleshooting Examples

### Diagnostic Workflow
When something isn't working, follow this pattern:

1. **Check Settings First:**
   ```
   Menu → 4. Settings → Check API Key Status
   ```

2. **Test Simple Location:**
   ```
   Menu → 1. Enter Location → Type "London" → Enter
   ```

3. **Try Basic Weather:**
   ```
   Menu → 2. Current Weather
   ```

### Common Issue Resolution

#### Issue: Blank weather display
**Check:** Settings menu shows API key status
**Solution:** Configure API key if status shows ✗

#### Issue: "Location not found" errors
**Try Alternative Formats:**
- Original: `Springfield`
- Better: `Springfield, IL`
- Best: `Springfield, Illinois, US`

#### Issue: Display looks broken
**Terminal Size Check:**
- Minimum: 80 columns × 24 rows
- Recommended: 100 columns × 30 rows
- Test: Resize terminal window

### Testing Your Setup

**Complete Test Sequence:**
1. Launch WAIT
2. Go to Settings → Verify "Configured ✓"
3. Enter Location → "London"  
4. Current Weather → Should show data
5. Weather Forecast → Should show 3-day forecast
6. Exit with `q`

**Expected Results:**
- ✅ All menu options work
- ✅ Weather data displays correctly
- ✅ No error messages
- ✅ Smooth navigation

---

## Performance Examples

### Typical Response Times
- **Menu Navigation:** Instant
- **Location Setting:** Instant (local operation)
- **Current Weather:** 1-3 seconds (API call)
- **Weather Forecast:** 1-3 seconds (API call)
- **Settings Display:** Instant

### Resource Usage
- **Memory:** ~50MB for executable
- **CPU:** Minimal (only during API calls)
- **Network:** ~1KB per weather request
- **Storage:** Executable size ~45MB

This demonstrates WAIT's efficiency and responsiveness for daily weather checking needs.