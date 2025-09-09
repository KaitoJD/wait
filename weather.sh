#!/bin/bash

# Weather CLI Wrapper Script
# This script provides an easier way to use the Weather CLI application

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if we're in the project root
if [[ ! -f "$SCRIPT_DIR/package.json" ]]; then
    echo -e "${RED}Error: This script must be run from the project root directory${NC}"
    echo -e "${YELLOW}Please run: cd /path/to/weather-cli && ./weather.sh${NC}"
    exit 1
fi

# Function to display help
show_help() {
    echo -e "${BLUE}Weather CLI - Easy Usage Script${NC}"
    echo
    echo "Usage: ./weather.sh [command] [options]"
    echo
    echo -e "${GREEN}Commands:${NC}"
    echo "  current <location>        Get current weather for a location"
    echo "  now <location>            Alias for current"
    echo "  forecast <location> [days] Get weather forecast (1-10 days, default: 3)"
    echo "  fc <location> [days]      Alias for forecast"
    echo "  setup                     Run initial setup (install deps, create .env)"
    echo "  build                     Build the TypeScript project"
    echo "  help                      Show this help message"
    echo
    echo -e "${GREEN}Examples:${NC}"
    echo "  ./weather.sh current \"London\""
    echo "  ./weather.sh now \"New York, NY\""
    echo "  ./weather.sh forecast \"Paris\" 5"
    echo "  ./weather.sh fc \"Tokyo\" 3"
    echo
    echo -e "${GREEN}Setup:${NC}"
    echo "  ./weather.sh setup        # First time setup"
    echo "  ./weather.sh build        # Build the project"
    echo
    echo -e "${YELLOW}Note: Make sure to set your WEATHER_API_KEY in .env file${NC}"
    echo -e "${YELLOW}Get a free API key at: https://www.weatherapi.com/${NC}"
}

# Function to check prerequisites
check_prerequisites() {
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js is not installed${NC}"
        echo -e "${YELLOW}Please install Node.js (version 16 or higher) from https://nodejs.org/${NC}"
        exit 1
    fi

    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    REQUIRED_VERSION="16.0.0"
    if [[ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]]; then
        echo -e "${RED}Error: Node.js version $NODE_VERSION is too old${NC}"
        echo -e "${YELLOW}Please upgrade to Node.js version 16 or higher${NC}"
        exit 1
    fi

    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}Error: npm is not installed${NC}"
        echo -e "${YELLOW}Please install npm${NC}"
        exit 1
    fi
}

# Function to setup the project
setup_project() {
    echo -e "${BLUE}Setting up Weather CLI...${NC}"
    
    # Check prerequisites
    check_prerequisites
    
    # Install dependencies
    echo -e "${YELLOW}Installing dependencies...${NC}"
    if npm install; then
        echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
    else
        echo -e "${RED}✗ Failed to install dependencies${NC}"
        exit 1
    fi
    
    # Create .env file if it doesn't exist
    if [[ ! -f ".env" ]]; then
        if [[ -f ".env.example" ]]; then
            cp .env.example .env
            echo -e "${GREEN}✓ Created .env file from .env.example${NC}"
            echo -e "${YELLOW}⚠ Please edit .env file and add your WEATHER_API_KEY${NC}"
            echo -e "${YELLOW}  Get a free API key at: https://www.weatherapi.com/${NC}"
        else
            echo -e "${YELLOW}⚠ .env.example not found, creating basic .env file${NC}"
            echo "WEATHER_API_KEY=your_api_key_here" > .env
            echo "WEATHER_API_BASE_URL=https://api.weatherapi.com/v1" >> .env
        fi
    else
        echo -e "${GREEN}✓ .env file already exists${NC}"
    fi
    
    # Build the project
    echo -e "${YELLOW}Building TypeScript project...${NC}"
    if npm run build; then
        echo -e "${GREEN}✓ Project built successfully${NC}"
    else
        echo -e "${RED}✗ Failed to build project${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Setup complete!${NC}"
    echo
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Edit .env file and add your WeatherAPI.com API key"
    echo "2. Test with: ./weather.sh current \"London\""
}

# Function to build the project
build_project() {
    echo -e "${YELLOW}Building TypeScript project...${NC}"
    if npm run build; then
        echo -e "${GREEN}✓ Project built successfully${NC}"
    else
        echo -e "${RED}✗ Failed to build project${NC}"
        exit 1
    fi
}

# Function to check if project is set up
check_setup() {
    # Check if node_modules exists
    if [[ ! -d "node_modules" ]]; then
        echo -e "${RED}Error: Dependencies not installed${NC}"
        echo -e "${YELLOW}Run: ./weather.sh setup${NC}"
        exit 1
    fi
    
    # Check if .env exists
    if [[ ! -f ".env" ]]; then
        echo -e "${RED}Error: .env file not found${NC}"
        echo -e "${YELLOW}Run: ./weather.sh setup${NC}"
        exit 1
    fi
    
    # Check if dist directory exists
    if [[ ! -d "dist" ]]; then
        echo -e "${YELLOW}Project not built yet, building now...${NC}"
        build_project
    fi
}

# Function to run weather commands
run_weather_command() {
    local cmd="$1"
    shift
    
    check_setup
    
    # Run the command
    npm run dev -- "$cmd" "$@"
}

# Main script logic
case "$1" in
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    "setup")
        setup_project
        ;;
    "build")
        build_project
        ;;
    "current"|"now")
        if [[ -z "$2" ]]; then
            echo -e "${RED}Error: Location is required${NC}"
            echo -e "${YELLOW}Usage: ./weather.sh $1 \"<location>\"${NC}"
            exit 1
        fi
        run_weather_command "$1" "$2"
        ;;
    "forecast"|"fc")
        if [[ -z "$2" ]]; then
            echo -e "${RED}Error: Location is required${NC}"
            echo -e "${YELLOW}Usage: ./weather.sh $1 \"<location>\" [days]${NC}"
            exit 1
        fi
        if [[ -n "$3" ]]; then
            # Validate days parameter
            if ! [[ "$3" =~ ^[0-9]+$ ]] || [[ "$3" -lt 1 ]] || [[ "$3" -gt 10 ]]; then
                echo -e "${RED}Error: Days must be a number between 1 and 10${NC}"
                exit 1
            fi
            run_weather_command "$1" "$2" "$3"
        else
            run_weather_command "$1" "$2"
        fi
        ;;
    *)
        echo -e "${RED}Error: Unknown command '$1'${NC}"
        echo
        show_help
        exit 1
        ;;
esac
