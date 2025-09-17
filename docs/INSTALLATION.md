# WAIT - Installation Guide

> **New to programming?** Check out [User Guide](USER_GUIDE.md) for step-by-step instructions.

## Prerequisites

- **Pre-built**: Windows 10+, macOS 10.15+, or Linux with modern terminal
- **Build from source**: Node.js 18+, npm, Git

## Option 1: Pre-built Executables

1. Download for your platform: `wait-linux`, `wait-win.exe`, or `wait-macos`
2. Make executable (Linux/macOS): `chmod +x wait-linux`
3. Optionally add to PATH for global access

## Option 2: Build from Source

```bash
git clone https://github.com/KaitoJD/wait.git
cd wait
npm install
npm run build        # Development build
npm run build:pkg    # Create executables in releases/
npm start            # Run application
```

## Configuration

1. Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
2. Set environment variable:
   - **Linux/macOS**: `export WEATHER_API_KEY="your_key"`
   - **Windows**: `set WEATHER_API_KEY=your_key`

## Quick Test

1. Run the application: `./wait-linux` or `npm start`
2. Enter a location and check current weather

## Development

- Use VS Code with TypeScript and ESLint extensions
- Available scripts: `npm run dev`, `npm run build`, `npm run build:pkg`
- See [DEVELOPMENT.md](DEVELOPMENT.md) for details

## Troubleshooting

Common issues and solutions:

- **API Key Error**: Verify `WEATHER_API_KEY` environment variable is set correctly
- **Build Fails**: Update to Node.js 18+, clear npm cache with `npm cache clean --force`
- **Terminal Issues**: Ensure modern terminal with UTF-8 support, minimum 80x24 size
- **Network Error**: Check internet connection and firewall settings

For more help, see GitHub Issues or other documentation in the `docs/` folder.