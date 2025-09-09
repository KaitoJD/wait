@echo off
REM Weather CLI Wrapper Script for Windows
REM This script provides an easier way to use the Weather CLI application

setlocal enabledelayedexpansion

REM Check if we're in the project root
if not exist "package.json" (
    echo [ERROR] This script must be run from the project root directory
    echo [INFO] Please run: cd C:\path\to\weather-cli && weather.bat
    exit /b 1
)

REM Function to display help
if "%1"=="help" goto :show_help
if "%1"=="--help" goto :show_help
if "%1"=="-h" goto :show_help
if "%1"=="" goto :show_help

REM Function to check prerequisites
call :check_prerequisites
if errorlevel 1 exit /b 1

REM Handle commands
if "%1"=="setup" goto :setup_project
if "%1"=="build" goto :build_project
if "%1"=="current" goto :run_current
if "%1"=="now" goto :run_current
if "%1"=="forecast" goto :run_forecast
if "%1"=="fc" goto :run_forecast

echo [ERROR] Unknown command '%1'
echo.
goto :show_help

:show_help
echo Weather CLI - Easy Usage Script (Windows)
echo.
echo Usage: weather.bat [command] [options]
echo.
echo Commands:
echo   current ^<location^>        Get current weather for a location
echo   now ^<location^>            Alias for current
echo   forecast ^<location^> [days] Get weather forecast (1-10 days, default: 3^)
echo   fc ^<location^> [days]      Alias for forecast
echo   setup                     Run initial setup (install deps, create .env^)
echo   build                     Build the TypeScript project
echo   help                      Show this help message
echo.
echo Examples:
echo   weather.bat current "London"
echo   weather.bat now "New York, NY"
echo   weather.bat forecast "Paris" 5
echo   weather.bat fc "Tokyo" 3
echo.
echo Setup:
echo   weather.bat setup        # First time setup
echo   weather.bat build        # Build the project
echo.
echo Note: Make sure to set your WEATHER_API_KEY in .env file
echo Get a free API key at: https://www.weatherapi.com/
exit /b 0

:check_prerequisites
REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed
    echo [INFO] Please install Node.js ^(version 16 or higher^) from https://nodejs.org/
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed
    echo [INFO] Please install npm
    exit /b 1
)
exit /b 0

:setup_project
echo [INFO] Setting up Weather CLI...

REM Install dependencies
echo [INFO] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    exit /b 1
)
echo [SUCCESS] Dependencies installed successfully

REM Create .env file if it doesn't exist
if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo [SUCCESS] Created .env file from .env.example
        echo [WARNING] Please edit .env file and add your WEATHER_API_KEY
        echo [INFO] Get a free API key at: https://www.weatherapi.com/
    ) else (
        echo [WARNING] .env.example not found, creating basic .env file
        echo WEATHER_API_KEY=your_api_key_here > .env
        echo WEATHER_API_BASE_URL=https://api.weatherapi.com/v1 >> .env
    )
) else (
    echo [SUCCESS] .env file already exists
)

REM Build the project
echo [INFO] Building TypeScript project...
call npm run build
if errorlevel 1 (
    echo [ERROR] Failed to build project
    exit /b 1
)
echo [SUCCESS] Project built successfully

echo [SUCCESS] Setup complete!
echo.
echo Next steps:
echo 1. Edit .env file and add your WeatherAPI.com API key
echo 2. Test with: weather.bat current "London"
exit /b 0

:build_project
echo [INFO] Building TypeScript project...
call npm run build
if errorlevel 1 (
    echo [ERROR] Failed to build project
    exit /b 1
)
echo [SUCCESS] Project built successfully
exit /b 0

:check_setup
REM Check if node_modules exists
if not exist "node_modules" (
    echo [ERROR] Dependencies not installed
    echo [INFO] Run: weather.bat setup
    exit /b 1
)

REM Check if .env exists
if not exist ".env" (
    echo [ERROR] .env file not found
    echo [INFO] Run: weather.bat setup
    exit /b 1
)

REM Check if dist directory exists
if not exist "dist" (
    echo [INFO] Project not built yet, building now...
    call :build_project
    if errorlevel 1 exit /b 1
)
exit /b 0

:run_current
if "%2"=="" (
    echo [ERROR] Location is required
    echo [INFO] Usage: weather.bat %1 "^<location^>"
    exit /b 1
)
call :check_setup
if errorlevel 1 exit /b 1
call npm run dev -- %1 %2
exit /b 0

:run_forecast
if "%2"=="" (
    echo [ERROR] Location is required
    echo [INFO] Usage: weather.bat %1 "^<location^>" [days]
    exit /b 1
)

call :check_setup
if errorlevel 1 exit /b 1

if "%3"=="" (
    call npm run dev -- %1 %2
) else (
    REM Basic validation for days parameter
    if %3 LSS 1 (
        echo [ERROR] Days must be between 1 and 10
        exit /b 1
    )
    if %3 GTR 10 (
        echo [ERROR] Days must be between 1 and 10
        exit /b 1
    )
    call npm run dev -- %1 %2 %3
)
exit /b 0
