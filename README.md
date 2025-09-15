# WAIT - Weather App In Terminal 🌤️

<div align="center">

[![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](https://github.com/KaitoJD/wait/releases)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-green.svg)](./LICENSE)
[![Summer of Making 2025](https://img.shields.io/badge/Summer%20of%20Making-2025-ff6b35.svg)](https://summerofmaking.com/)

</div>

A modern, interactive **TUI (Text User Interface)** weather application built with TypeScript and blessed. This project is participating in the **Summer of Making 2025** program.

## Documentation

- **[User Guide](docs/USER_GUIDE.md)** - **New users start here!** Simple, jargon-free setup guide
- **[Installation Guide](docs/INSTALLATION.md)** - Detailed setup instructions
- **[Usage Guide](docs/USAGE.md)** - Complete command reference
- **[Examples](docs/EXAMPLES.md)** - Command examples and output formats
- **[Development Guide](docs/DEVELOPMENT.md)** - Contributing and extending the CLI
- **[Architecture Documentation](docs/ARCHITECTURE.md)** - Technical architecture details

## Features

### TUI (Text User Interface) Mode
- **Interactive Menu System**: Navigate through options with arrow keys
- **Real-time Display**: Weather information updates in dedicated panels  
- **Keyboard Navigation**: ESC to go back, Enter to select, q to quit
- **Beautiful ASCII Interface**: Clean, bordered layout
- **Location Management**: Easy location entry with input validation

### Cross-Platform Executable
- **Standalone Executables**: No dependencies required after build
- **Multi-platform Support**: Windows, macOS, and Linux binaries
- **Single File Distribution**: Easy deployment and sharing

### Technical Features
- **TypeScript**: Fully typed for better development experience and code reliability
- **Modular Architecture**: Component-based UI system with separation of concerns
- **Event-Driven**: Robust event management system for user interactions
- **Error Handling**: Comprehensive error messages with helpful suggestions
- **Cross-Platform**: Support for Windows, macOS, and Linux executables
- **Environment Config**: Flexible configuration through environment variables

## API Integration

This application uses [WeatherAPI.com](https://www.weatherapi.com/) which provides:
- Current weather conditions
- Weather forecasts
- Global coverage
- Free tier with generous limits

Get your free API key at [WeatherAPI.com](https://www.weatherapi.com/)

## Contributing

Contributions are welcome! Please see my [Contributing Guide](docs/CONTRIBUTING.md) for details on:
- Development setup
- Coding guidelines  
- Pull request process
- Issue reporting

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).  
You are free to share and adapt the material for non-commercial purposes, as long as you give appropriate credit and distribute your contributions under the same license.  
See the [LICENSE](./LICENSE) file for details.

---

_**Note**: Remember to keep your API key secure and never commit it to version control. Always use environment variables for sensitive configuration._