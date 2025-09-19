# WAIT - User Guide

*A simple guide for using the Weather App In Terminal*

## Table of Contents

1. [What is WAIT?](#what-is-wait)
2. [What You'll Need](#what-youll-need)
3. [Quick Setup](#quick-setup)
4. [Running WAIT](#running-wait)
5. [Keyboard Navigation](#keyboard-navigation)
6. [Menu Options](#menu-options)
7. [Common Issues and Solutions](#common-issues-and-solutions)
8. [Tips and Tricks](#tips-and-tricks)
9. [Getting Help](#getting-help)

---

## What is WAIT?

WAIT (Weather App In Terminal) is a modern, interactive text-based application that displays weather information directly in your terminal. It features:

- **Beautiful TUI Interface**: Navigate with arrow keys through an intuitive menu system
- **Real-time Weather**: Current conditions and 3-day forecasts
- **Cross-platform**: Works on Windows, macOS, and Linux
- **No Dependencies**: Standalone executable files (no need to install Node.js)
- **Fast and Lightweight**: Instant startup and responsive interface
- **Embedded API Key**: Pre-built executables include a securely encrypted API key

## What You'll Need

Before you start, make sure you have:

1. **A computer** running Windows, macOS, or Linux
2. **Internet connection** (to get weather data)
3. **Terminal/Command Prompt** access
4. **About 2 minutes** for setup

## Quick Setup

**Pre-built executables include a securely embedded API key - no configuration needed!**

### Step 1: Download WAIT executable

**Download for your platform:**
- **Linux**: Download `wait-linux`
- **Windows**: Download `wait-win.exe`
- **macOS**: Download `wait-macos`

### Step 2: Make executable (Linux/macOS only)

```bash
chmod +x wait-linux
# or
chmod +x wait-macos
```

### Step 3: Run and enjoy!

No API key setup required - just run the application!

## Running WAIT

Simply run the executable for your platform:

```bash
./wait-linux    # Linux
./wait-macos    # macOS
wait-win.exe    # Windows (double-click or run from Command Prompt)
```

## Keyboard Navigation

| Key | Action |
|-----|---------|
| `↑` `↓` | Navigate menu items |
| `Enter` | Select menu item |
| `Escape` | Go back/Cancel |
| `q` | Quit application |

## Menu Options

### 1. Enter Location
- **Purpose**: Set your location for weather queries
- **Usage**: Type city name (e.g., "London", "New York, NY", "Tokyo")
- **Tips**: Include state/country for accuracy (e.g., "Paris, France")

### 2. Current Weather
- **Shows**: Temperature, condition, humidity, wind, pressure
- **Updates**: Real-time current conditions
- **Requirement**: Location must be set first

### 3. Weather Forecast (3 days)
- **Shows**: 3-day forecast with daily highs/lows
- **Details**: Conditions, humidity, wind speed
- **Requirement**: Location must be set first

### 4. Settings
- **Shows**: Current configuration and API key status
- **Information**: Location setting, API status (should show ✓ configured)
- **Note**: Pre-built executables automatically show API key as configured

### 5. Exit
- **Action**: Quit the application safely

## Common Issues and Solutions

### Problem: "Missing or invalid WEATHER_API_KEY"

This shouldn't happen with pre-built executables as the API key is embedded. If you encounter this:

1. **Try re-downloading** the executable from the official source
2. **Check platform compatibility** - make sure you downloaded the right version for your OS
3. **Verify file integrity** - the executable might be corrupted

### Problem: "Failed to fetch weather data"

**Possible causes:**
1. **No internet connection** - Check your network
2. **Invalid location** - Try a different city name or format
3. **Firewall blocking** - Check if your firewall allows the application to access the internet

### Problem: Terminal display looks broken

**Solutions:**
1. **Resize terminal**: Make sure your terminal is at least 80x24 characters
2. **Terminal compatibility**: Use a modern terminal (Terminal.app, PowerShell, gnome-terminal)
3. **Font issues**: Use a monospaced font

### Problem: Application won't start

**Solutions:**
1. **Permission issues (Linux/macOS)**: Make sure you ran `chmod +x` on the executable
2. **Security warnings (macOS)**: You may need to allow the app in Security & Privacy settings
3. **Antivirus software**: Some antivirus may flag the executable - add it to whitelist if needed

## Tips and Tricks

### Pro Tips:
1. **Set common locations**: Remember frequently used cities for quick access
2. **Add to PATH**: Add the executable to your system PATH for easy access from anywhere
3. **Check settings first**: Use the Settings menu to verify your setup

### Location Tips:
- **Be specific**: "Springfield, IL" vs "Springfield, MA"
- **International cities**: "Paris, France" vs "Paris, TX"  
- **Coordinates work**: You can use latitude,longitude (e.g., "40.7128,-74.0060")
- **Major cities**: Often just the city name works (e.g., "London", "Tokyo", "Sydney")

### Keyboard Shortcuts:
- **Quick exit**: Press `q` from anywhere to quit
- **Fast navigation**: Use arrow keys for smooth menu navigation
- **Cancel input**: Press `Escape` when typing location to cancel

## Getting Help

### Online Resources:
- **GitHub Issues**: Report bugs or ask questions at the project repository
- **Documentation**: Check the `docs/` folder for additional guides

### Quick Troubleshooting Checklist:
1. **Check Settings menu** - API key should show as configured automatically
2. **Verify internet connection**
3. **Try a simple location** like "London" or "New York"
4. **Check terminal size** (minimum 80x24 characters)
5. **Re-download executable** if problems persist