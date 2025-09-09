# Weather CLI - User Guide

*A simple guide for getting weather information on your computer*

## Table of Contents

1. [What is Weather CLI?](#what-is-weather-cli)
2. [What You'll Need](#what-youll-need)
3. [Setup Overview](#setup-overview)
4. [Step 1: Install Node.js](#step-1-install-nodejs)
5. [Step 2: Get a Free Weather API Key](#step-2-get-a-free-weather-api-key)
6. [Step 3: Download Weather CLI](#step-3-download-weather-cli)
7. [Step 4: Easy Setup](#step-4-easy-setup)
8. [Step 5: Test It Out!](#step-5-test-it-out)
9. [How to Use Weather CLI](#how-to-use-weather-cli)
10. [Common Issues and Solutions](#common-issues-and-solutions)
11. [Quick Reference Card](#quick-reference-card)
12. [Getting Help](#getting-help)
13. [What's Next?](#whats-next)

---

## What is Weather CLI?

Weather CLI is a simple program that lets you check the weather for any city in the world directly from your computer. You type a command, and it shows you current weather or forecasts - no need to open a web browser!

## What You'll Need

Before you start, make sure you have:

1. **A computer** running Windows, Mac, or Linux
2. **Internet connection** (to get weather data)
3. **About 10 minutes** to set everything up

Don't worry if you're not tech-savvy - this guide will walk you through everything step by step!

## Setup Overview

Here's what we'll do (don't worry, it's easier than it looks!):

```
Step 1: Install Node.js (one-time setup)
Step 2: Get free weather API key (like getting a library card)
Step 3: Download Weather CLI files
Step 4: Run easy setup script (does everything automatically)
Step 5: Test it out!
```

## Step 1: Install Node.js

### For Windows Users:
1. Go to [nodejs.org/](https://nodejs.org)
2. Click the button that says "Download"
3. Select your computer's operating system and architecture, then download the installer file (`.msi`)
4. Run the installer file and follow the installation wizzard

### For Mac Users:
1. Go to [nodejs.org](https://nodejs.org)
2. Click the button that says "Download"  
3. Select your computer's operating system and architecture, then download the installer file (`.pkg`)
4. Open the downloaded `.pkg` file and follow the installation steps

### For Linux Users:
Open Terminal and run:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Step 2: Get a Free Weather API Key

To get weather data, you need a free "key" - it's like a library card that lets you access weather information.

1. Go to [weatherapi.com](https://www.weatherapi.com/)
2. Click "Get API Key Free"
3. Fill out the form with your email and create a password
4. Check your email and click the confirmation link
5. Once logged in, you'll see your API key - it looks like: `abc123def456ghi789`
6. **Copy this key** - you'll need it in Step 4

**Tip**: The free plan gives you 1 million weather requests per month - more than enough for personal use!

## Step 3: Download Weather CLI

1. Download the Weather CLI files to your computer
2. Extract/unzip them to a folder like:
   - Windows: `C:\weather-cli`
   - Mac/Linux: `/home/username/weather-cli`
3. Remember where you put this folder!

## Step 4: Easy Setup

Now comes the easy part! Weather CLI has a setup script that does all the hard work for you.

### Windows Users:
1. Open File Explorer and go to your weather-cli folder
2. Double-click on `weather.bat`
3. Type: `setup` and press Enter
4. Wait for it to download and install everything
5. When it asks for your API key, paste the key you got from Step 2

### Mac/Linux Users:
1. Open Terminal (press Cmd+Space and type "Terminal" on Mac)
2. Navigate to your weather-cli folder:
   ```bash
   cd /<path_to_your_weather-cli>
   ```
3. Run the setup:
   ```bash
   ./weather.sh setup
   ```
4. When it asks for your API key, paste the key you got from Step 2

**What the setup does:**
- Downloads all necessary files
- Creates a configuration file
- Tests that everything works
- Takes about 2-3 minutes

## Step 5: Test It Out!

Let's make sure everything works by checking the weather in London:

### Windows:
```cmd
weather.bat current "London"
```

### Mac/Linux:
```bash
./weather.sh current "London"
```

You should see something like:
```
🌤️ Weather Information for London, England, United Kingdom
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌡️ Temperature: 15°C (feels like 13°C)
☁️ Condition: Partly cloudy
💧 Humidity: 72%
💨 Wind Speed: 11 km/h
```

🎉 **Congratulations!** If you see weather information, everything is working!

## How to Use Weather CLI

### Check Current Weather
```bash
# Windows
weather.bat current "New York"
weather.bat current "Tokyo, Japan"

# Mac/Linux  
./weather.sh current "New York"
./weather.sh current "Tokyo, Japan"
```

### Get Weather Forecast
```bash
# Windows
weather.bat forecast "Paris"        # 3-day forecast
weather.bat forecast "Paris" 7      # 7-day forecast

# Mac/Linux
./weather.sh forecast "Paris"       # 3-day forecast  
./weather.sh forecast "Paris" 7     # 7-day forecast
```

### Tips for Location Names
- **Good**: "London", "New York", "Paris, France"
- **Better**: "London, UK", "New York, NY", "Paris, France"
- **Best**: "London, England, UK", "New York, NY, USA"

More specific = more accurate results!

## Common Issues and Solutions

### "Command not found" Error
**Problem**: The computer doesn't recognize the weather command.

**Solution**: 
- Make sure you're in the right folder (where you put the weather-cli files)
- On Windows, make sure you're typing `weather.bat`, not just `weather`

### "Invalid API Key" Error
**Problem**: Your weather API key isn't working.

**Solution**:
1. Check that you copied the API key correctly (no extra spaces)
2. Make sure you activated your account via email
3. Try generating a new key at weatherapi.com

### "Location not found" Error
**Problem**: The weather service can't find your location.

**Solution**:
- Try a more specific location: "Springfield, IL" instead of just "Springfield"
- Use major cities or landmarks as reference points
- Check spelling of city names

### Internet Connection Issues
**Problem**: Can't connect to weather service.

**Solution**:
- Check your internet connection
- Try again in a few minutes (the service might be busy)
- Make sure your firewall isn't blocking the program

## Quick Reference Card

Cut this out and keep it handy!

```
┌─ WEATHER CLI QUICK REFERENCE ─┐
│                               │
│ Current Weather:              │
│ Windows: weather.bat current  │
│ Mac/Linux: ./weather.sh       │
│                               │
│ Forecast:                     │
│ Windows: weather.bat forecast │
│ Mac/Linux: ./weather.sh       │
│                               │
│ Examples:                     │
│ current "London"              │
│ forecast "Paris" 5            │
│                               │
│ Help:                         │
│ Windows: weather.bat help     │
│ Mac/Linux: ./weather.sh help  │
└───────────────────────────────┘
```

## Getting Help

If you run into problems:

1. **Try the help command**:
   - Windows: `weather.bat help`
   - Mac/Linux: `./weather.sh help`

2. **Check your internet connection** - the program needs internet to get weather data

3. **Make sure you're in the right folder** - the one with the weather files

4. **Double-check your API key** - make sure it was copied correctly

## What's Next?

Once you're comfortable with the basics:

- Try different cities around the world
- Check forecasts for your weekend plans
- Set up shortcuts on your desktop for quick access
- Share weather info with friends and family
- Enjoy your new weather tool :D