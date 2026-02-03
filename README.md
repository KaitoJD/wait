# WAIT - Weather App In Terminal

A terminal weather app with interactive TUI, built with **TypeScript** and **Blessed.js**.

## Quick Start

### Download & Run

1. Download the executable for your platform from [Releases](https://github.com/KaitoJD/wait/releases):
   - **Linux**: `wait-linux`
   - **macOS**: `wait-macos`  
   - **Windows**: `wait-win.exe`

2. Make it executable (Linux/macOS only):
   ```bash
   chmod +x wait-linux   # or wait-macos
   ```

3. Run it:
   ```bash
   ./wait-linux          # Linux
   ./wait-macos          # macOS
   wait-win.exe          # Windows
   ```

**No API key setup required** — pre-built executables have an encrypted API key embedded.

## How to Use

### Keyboard Controls

| Key | Action |
|-----|--------|
| `↑` `↓` | Navigate menu / Scroll |
| `Enter` | Select |
| `Tab` | Change focus |
| `Escape` | Go back |
| `q` | Quit |

### Menu Options

1. **Enter Location** — Set your city (e.g., `London`, `New York, NY`, `Paris, France`)
2. **Current Weather** — View current temperature, humidity, wind, etc.
3. **Air Quality** — View air quality index (AQI) for your location
4. **Weather Forecast** — 3-day forecast with highs/lows
5. **Settings** — Check API key status
6. **Exit** — Quit the app

### Location Formats

- City name: `London`, `Tokyo`
- City + State: `Austin, TX`
- City + Country: `Paris, France`
- Coordinates: `40.7128,-74.0060`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Please set location first" | Use menu option 1 to enter a location |
| "Failed to fetch weather data" | Check internet connection; try different location format |
| Display looks broken | Resize terminal to at least 80×24; use monospaced font |
| App won't start (Linux/macOS) | Run `chmod +x` on the executable |
| Security warning (macOS) | Allow in System Preferences → Security & Privacy |

## Development

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for contributing and development setup.

For technical architecture, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

### Quick Dev Setup

```bash
git clone https://github.com/KaitoJD/wait.git
cd wait
npm install
export WEATHER_API_KEY="your_key"   # Get free key at weatherapi.com
npm run dev
```

### Build Commands

```bash
npm run build        # Compile TypeScript
npm run build:pkg    # Create executables
```

## License

[CC BY-NC-SA 4.0](./LICENSE) — Free for non-commercial use with attribution.