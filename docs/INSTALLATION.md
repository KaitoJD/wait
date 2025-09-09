# Installation Guide

> **New to programming?** Check out our [User Guide](USER_GUIDE.md) instead - it's written in plain English with step-by-step instructions for everyone!

This guide is for users with some technical experience who want detailed installation instructions.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup Steps](#setup-steps)
   - [1. Clone the Repository](#1-clone-the-repository)
   - [2. Install Dependencies](#2-install-dependencies)
   - [3. Configure Your API Key](#3-configure-your-api-key)
   - [4. Build the Application](#4-build-the-application)
3. [Verification](#verification)
4. [Environment Variables](#environment-variables)
5. [Troubleshooting](#troubleshooting)
   - [API Key Issues](#api-key-issues)
   - [Build Issues](#build-issues)
   - [Network Issues](#network-issues)

---

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)

## Setup Steps

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd weather-cli
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Your API Key
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API key
# Get a free API key at: https://www.weatherapi.com/
echo "WEATHER_API_KEY=your_actual_api_key_here" > .env
```

### 4. Build the Application
```bash
npm run build
```

## Verification

Test your installation by running:
```bash
npm run dev -- --help
```

You should see the CLI help output with available commands.

## Environment Variables

- `WEATHER_API_KEY` (required): Your WeatherAPI.com API key
- `WEATHER_API_BASE_URL` (optional): Custom API base URL (defaults to WeatherAPI.com)

## Troubleshooting

### API Key Issues
If you see API key errors:
1. Ensure your `.env` file exists in the project root
2. Verify your API key is valid at [WeatherAPI.com](https://www.weatherapi.com/)
3. Make sure there are no extra spaces in your `.env` file

### Build Issues
If the build fails:
1. Ensure you have Node.js 16 or higher: `node --version`
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Check for TypeScript errors: `npm run build`

### Network Issues
If API requests fail:
1. Check your internet connection
2. Verify the API endpoint is accessible
3. Try with a different location name