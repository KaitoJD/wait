# WAIT - User Guide

*A simple guide for using the Weather App In Terminal*

## Table of Contents

1. [What is WAIT?](#what-is-wait)
2. [What You'll Need](#what-youll-need)
3. [Setup Overview](#setup-overview)
4. [Step 1: Get Your Weather API Key](#step-1-get-your-weather-api-key)
5. [Step 2: Download or Build WAIT](#step-2-download-or-build-wait)
6. [Step 3: Set Up Your Environment](#step-3-set-up-your-environment)
7. [Step 4: Run WAIT](#step-4-run-wait)
8. [How to Use WAIT](#how-to-use-wait)
9. [Keyboard Navigation](#keyboard-navigation)
10. [Menu Options](#menu-options)
11. [Common Issues and Solutions](#common-issues-and-solutions)
12. [Tips and Tricks](#tips-and-tricks)
13. [Getting Help](#getting-help)

---

## What is WAIT?

WAIT (Weather App In Terminal) is a modern, interactive text-based application that displays weather information directly in your terminal. It features:

- **Beautiful TUI Interface**: Navigate with arrow keys through an intuitive menu system
- **Real-time Weather**: Current conditions and 3-day forecasts
- **Cross-platform**: Works on Windows, macOS, and Linux
- **No Dependencies**: Standalone executable files (no need to install Node.js)
- **Fast and Lightweight**: Instant startup and responsive interface

## What You'll Need

Before you start, make sure you have:

1. **A computer** running Windows, macOS, or Linux
2. **Internet connection** (to get weather data)
3. **Terminal/Command Prompt** access
4. **About 5 minutes** for setup

## Setup Overview

Here's what we'll do:

```
Step 1: Get free weather API key (like getting a library card)
Step 2: Download WAIT executable or build from source
Step 3: Set environment variable for your API key  
Step 4: Run WAIT and enjoy!
```

## Step 1: Get Your Weather API Key

1. **Visit WeatherAPI.com**
   - Go to [https://www.weatherapi.com/](https://www.weatherapi.com/)
   - Click "Sign Up Free" (it's completely free!)

2. **Create Your Account**
   - Enter your email and create a password
   - Verify your email address

3. **Get Your API Key**
   - After logging in, go to your Dashboard
   - Copy your API key (it looks like: `abcd1234efgh5678ijkl9012`)
   - Keep this safe - you'll need it in Step 3!

## Step 2: Download or Build WAIT

### Option A: Download Pre-built Executable (Recommended)

1. **Download for your platform:**
   - **Linux**: Download `wait-linux`
   - **Windows**: Download `wait-win.exe`
   - **macOS**: Download `wait-macos`

2. **Make it executable (Linux/macOS):**
   ```bash
   chmod +x wait-linux
   # or
   chmod +x wait-macos
   ```

### Option B: Build from Source

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KaitoJD/wait.git
   cd wait
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the application:**
   ```bash
   npm run build
   ```

4. **Create executable (optional):**
   ```bash
   npm run build:pkg
   ```

## Step 3: Set Up Your Environment

Set your API key as an environment variable:

### Linux/macOS:
```bash
export WEATHER_API_KEY="your_api_key_here"
```

To make it permanent, add to your shell profile:
```bash
echo 'export WEATHER_API_KEY="your_api_key_here"' >> ~/.bashrc
# or ~/.zshrc for Zsh users
```

### Windows (Command Prompt):
```cmd
set WEATHER_API_KEY=your_api_key_here
```

### Windows (PowerShell):
```powershell
$env:WEATHER_API_KEY="your_api_key_here"
```

## Step 4: Run WAIT

### Using Executable:
```bash
./wait-linux          # Linux
./wait-macos           # macOS
wait-win.exe           # Windows
```

### Using NPM (if built from source):
```bash
npm start
# or
npm run dev
```

## How to Use WAIT

When you start WAIT, you'll see a beautiful interface with:

```
┌─────────────────────────────────────────┐
│        WAIT - Weather App In Terminal    │
├─────────────────────────────────────────┤
│ Main Menu          │ Weather Information │
│                    │                     │
│ 1. Enter Location  │ Select an option    │
│ 2. Current Weather │ from the menu to    │
│ 3. Weather Forecast│ get started         │
│ 4. Settings        │                     │
│ 5. Exit            │                     │
└─────────────────────────────────────────┘
│ Press ↑/↓ to navigate, Enter to select   │
└─────────────────────────────────────────┘
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
- **Information**: Location setting, API status
- **Help**: Setup instructions if API key missing

### 5. Exit
- **Action**: Quit the application safely

## Common Issues and Solutions

### Problem: "Missing or invalid WEATHER_API_KEY"

**Solution:**
1. Check that you've set the environment variable correctly
2. Verify your API key is valid (32 characters, letters and numbers)
3. Make sure there are no extra spaces in your API key

**Test your environment variable:**
```bash
echo $WEATHER_API_KEY    # Linux/macOS
echo %WEATHER_API_KEY%   # Windows CMD
echo $env:WEATHER_API_KEY # Windows PowerShell
```

### Problem: "Failed to fetch weather data"

**Possible causes:**
1. **No internet connection** - Check your network
2. **Invalid location** - Try a different city name
3. **API key quota exceeded** - Check your WeatherAPI.com dashboard

### Problem: Application crashes when selecting weather options

**Solution:**
- This was fixed in recent versions
- Make sure you're using the latest executable
- Check that your API key is properly configured

### Problem: Terminal display looks broken

**Solutions:**
1. **Resize terminal**: Make sure your terminal is at least 80x24 characters
2. **Terminal compatibility**: Use a modern terminal (Terminal.app, PowerShell, gnome-terminal)
3. **Font issues**: Use a monospaced font

## Tips and Tricks

### Pro Tips:
1. **Set common locations**: Remember frequently used cities for quick access
2. **Bookmark the application**: Add the executable to your PATH for easy access
3. **Check settings first**: Use the Settings menu to verify your setup

### Location Tips:
- **Be specific**: "Springfield, IL" vs "Springfield, MA"
- **International cities**: "Paris, France" vs "Paris, TX"
- **Coordinates work**: You can use latitude,longitude (e.g., "40.7128,-74.0060")

### Keyboard Shortcuts:
- **Quick exit**: Press `q` from anywhere to quit
- **Fast navigation**: Use arrow keys for smooth menu navigation
- **Cancel input**: Press `Escape` when typing location to cancel

## Getting Help

### In the Application:
- **Settings Menu**: Check API key status and get setup help
- **Error Messages**: Follow the detailed instructions provided

### Online Resources:
- **GitHub Issues**: Report bugs or ask questions
- **Documentation**: Check the `docs/` folder for detailed guides
- **WeatherAPI Support**: Visit WeatherAPI.com for API-related issues

### Quick Troubleshooting:
1. **Check Settings menu** for configuration status
2. **Verify internet connection**
3. **Confirm API key is set correctly**
4. **Try a different location name**

---

## What's Next?

Now that you have WAIT set up:

1. **Explore all features** - Try different locations and menu options
2. **Customize your setup** - Add the executable to your PATH
3. **Share with friends** - WAIT makes a great terminal demo!
4. **Contribute** - Check out the source code and contribute improvements

**Enjoy your new terminal weather app! 🌤️**