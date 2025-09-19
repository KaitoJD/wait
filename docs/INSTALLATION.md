# WAIT - Installation Guide

> **New to programming?** Check out [User Guide](USER_GUIDE.md) for step-by-step instructions.

## Prerequisites

- **Pre-built**: Windows 10+, macOS 10.15+, or Linux with modern terminal
- **Build from source**: Node.js 18+, npm, Git

## Option 1: Pre-built Executables (Recommended)

**The easiest way to get started!** Our pre-built executables include a **securely embedded API key**.

1. Download for your platform: `wait-linux`, `wait-win.exe`, or `wait-macos`
2. Make executable (Linux/macOS): `chmod +x wait-linux`
3. **That's it!** No API key configuration needed - just run the app
4. Optionally add to PATH for global access

**No API key setup required** - The executable has an encrypted API key built-in!

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

### For Pre-built Executables
**No configuration needed!** The executable includes a securely embedded API key.

### For Development/Source Builds Only
1. Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
2. Set environment variable:
   - **Linux/macOS**: `export WEATHER_API_KEY="your_key"`
   - **Windows**: `set WEATHER_API_KEY=your_key`

**Note**: Environment variables take priority over embedded keys if both are present.

## Quick Test

1. Run the application: `./wait-linux` or `npm start`
2. Enter a location and check current weather

## Development

- Use VS Code with TypeScript and ESLint extensions
- Available scripts: `npm run dev`, `npm run build`, `npm run build:pkg`
- See [DEVELOPMENT.md](DEVELOPMENT.md) for details

## Troubleshooting

Common issues and solutions:

- **API Key Error (pre-built executables)**: This shouldn't happen as the key is embedded. Try re-downloading the executable.
- **API Key Error (source builds)**: Verify `WEATHER_API_KEY` environment variable is set correctly
- **Build Fails**: Update to Node.js 18+, clear npm cache with `npm cache clean --force`
- **Terminal Issues**: Ensure modern terminal with UTF-8 support, minimum 80x24 size
- **Network Error**: Check internet connection and firewall settings