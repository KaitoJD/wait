# Installation Guide

> **New to programming?** Check out our [User Guide](USER_GUIDE.md) instead - it's written in plain English with step-by-step instructions for everyone!

This guide provides detailed installation instructions for developers and technical users.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Options](#installation-options)
3. [Option A: Pre-built Executables](#option-a-pre-built-executables)
4. [Option B: Build from Source](#option-b-build-from-source)
5. [Configuration](#configuration)
6. [Verification](#verification)
7. [Development Setup](#development-setup)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### For Pre-built Executables (Recommended):
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (glibc 2.17+)
- **Terminal**: Any modern terminal application
- **Internet Connection**: Required for weather data

### For Building from Source:
- **Node.js**: Version 18+ (recommended: latest LTS)
- **npm**: Comes with Node.js
- **Git**: For cloning the repository

## Installation Options

Choose the installation method that best fits your needs:

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **Pre-built Executables** | No dependencies, instant setup | Larger file size | End users |
| **Build from Source** | Latest features, customizable | Requires Node.js | Developers |

---

## Option A: Pre-built Executables

### 1. Download Executable

Download the appropriate executable for your platform:

- **Linux**: `wait-linux`
- **Windows**: `wait-win.exe`
- **macOS**: `wait-macos`

### 2. Make Executable (Linux/macOS only)

```bash
chmod +x wait-linux
# or
chmod +x wait-macos
```

### 3. Optional: Add to PATH

**Linux/macOS:**
```bash
sudo mv wait-linux /usr/local/bin/wait
# Now you can run 'wait' from anywhere
```

**Windows:**
1. Create a folder: `C:\Program Files\WAIT`
2. Move `wait-win.exe` to this folder
3. Add `C:\Program Files\WAIT` to your PATH environment variable

### 4. Configure API Key

See [Configuration](#configuration) section below.

---

## Option B: Build from Source

### 1. Clone the Repository

```bash
git clone https://github.com/KaitoJD/wait.git
cd wait
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your WeatherAPI.com API key:

```bash
WEATHER_API_KEY=your_api_key_here
WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
```

### 4. Build the Application

**For development:**
```bash
npm run build
```

**To create executables:**
```bash
npm run build:pkg
```

This creates executables in the `releases/` directory:
- `wait-linux` (Linux x64)
- `wait-win.exe` (Windows x64)
- `wait-macos` (macOS x64)

### 5. Run the Application

**Development mode:**
```bash
npm run dev
# or
npm start
```

**Built executable:**
```bash
./releases/wait-linux    # Linux
./releases/wait-macos    # macOS
releases/wait-win.exe    # Windows
```

---

## Configuration

### 1. Get API Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Go to your Dashboard
4. Copy your API key

### 2. Set Environment Variable

**Linux/macOS (Temporary):**
```bash
export WEATHER_API_KEY="your_api_key_here"
```

**Linux/macOS (Permanent):**
```bash
echo 'export WEATHER_API_KEY="your_api_key_here"' >> ~/.bashrc
# Reload your shell or run:
source ~/.bashrc
```

**Windows Command Prompt:**
```cmd
set WEATHER_API_KEY=your_api_key_here
```

**Windows PowerShell:**
```powershell
$env:WEATHER_API_KEY="your_api_key_here"
```

**Windows (Permanent):**
1. Open System Properties → Advanced → Environment Variables
2. Add new User variable: `WEATHER_API_KEY` = `your_api_key_here`

---

## Verification

### Test Your Installation

1. **Check API Key:**
   ```bash
   echo $WEATHER_API_KEY    # Linux/macOS
   echo %WEATHER_API_KEY%   # Windows CMD
   echo $env:WEATHER_API_KEY # Windows PowerShell
   ```

2. **Run WAIT:**
   ```bash
   ./wait-linux    # or your platform's executable
   npm start       # if built from source
   ```

3. **Test Functionality:**
   - Navigate to "1. Enter Location"
   - Enter a city name (e.g., "London")
   - Try "2. Current Weather"

### Expected Behavior

- **Success**: You should see weather information displayed
- **API Key Error**: Check the Settings menu for configuration help
- **Location Error**: Try a different city name format

---

## Development Setup

### IDE Recommendations

- **VS Code** with extensions:
  - TypeScript and JavaScript Language Features
  - ESLint
  - Prettier

### Available Scripts

```bash
npm run dev      # Start in development mode
npm run build    # Compile TypeScript
npm run build:pkg # Create executables
npm start        # Run compiled application
```

### Project Structure

```
src/
├── app.ts              # Main entry point
├── tui-app.ts          # TUI application class
├── types/              # TypeScript type definitions
├── ui/                 # User interface components
│   ├── components/     # UI component classes
│   ├── event-manager.ts # Event handling
│   └── screen.ts       # Screen management
├── services/           # Business logic services
└── utils/              # Utility functions
```

---

## Troubleshooting

### API Key Issues

**Problem**: "Missing or invalid WEATHER_API_KEY"

**Solutions:**
1. Verify environment variable is set:
   ```bash
   echo $WEATHER_API_KEY
   ```
2. Check API key format (should be 32 characters)
3. Ensure no extra spaces or quotes
4. Test API key at WeatherAPI.com dashboard

### Build Issues

**Problem**: `npm install` fails

**Solutions:**
1. Update Node.js to version 18+
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and `package-lock.json`, then retry
4. Check network connectivity

**Problem**: `npm run build:pkg` fails

**Solutions:**
1. Ensure TypeScript compilation works: `npm run build`
2. Check available disk space (executables are ~50MB each)
3. Verify pkg installation: `npm list pkg`

### Runtime Issues

**Problem**: Application crashes on startup

**Solutions:**
1. Check terminal compatibility (80x24 minimum size)
2. Verify executable permissions (Linux/macOS)
3. Run in development mode to see detailed errors: `npm run dev`

**Problem**: Terminal display appears broken

**Solutions:**
1. Use a modern terminal application
2. Ensure terminal supports UTF-8 encoding
3. Try resizing the terminal window

### Network Issues

**Problem**: "Failed to fetch weather data"

**Solutions:**
1. Check internet connection
2. Verify firewall isn't blocking outbound HTTPS
3. Test API directly: `curl "https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=London"`

---

## Getting Help

- **GitHub Issues**: Report bugs or ask questions
- **Documentation**: Check other files in `docs/` folder
- **WeatherAPI Support**: For API-related issues
- **Community**: Discussions on the project repository

## Next Steps

After installation:

1. Read the [User Guide](USER_GUIDE.md) for usage instructions
2. Check out [Examples](EXAMPLES.md) for common use cases
3. Review [Architecture](ARCHITECTURE.md) for technical details
4. See [Development Guide](DEVELOPMENT.md) for contributing