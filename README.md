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
- **Integrated API Key**: Pre-built executables include a securely embedded API key
- **Multi-platform Support**: Windows, macOS, and Linux binaries
- **Single File Distribution**: Easy deployment and sharing - just download and run!

### Technical Features
- **TypeScript**: Fully typed for better development experience and code reliability
- **Modular Architecture**: Component-based UI system with separation of concerns
- **Event-Driven**: Robust event management system for user interactions
- **Error Handling**: Comprehensive error messages with helpful suggestions
- **Cross-Platform**: Support for Windows, macOS, and Linux executables
- **Environment Config**: Flexible configuration through environment variables

## API Key Setup

### Pre-built Executables (Recommended)
**Good news!** The pre-built executables (`wait-linux`, `wait-macos`, `wait-win.exe`) come with a **securely embedded API key** built right in. This means:

- **No API key setup required** - Just download and run!
- **Encrypted & Secure** - The API key is encrypted using AES-256 encryption
- **Ready to Use** - Start checking weather immediately after download
- **Automatic Fallback** - Still accepts environment variables if you want to use your own key

**Simply download the executable for your platform and run it - no additional configuration needed!**

### For Development or Custom Builds

1. **Visit WeatherAPI.com**
   - Go to [https://www.weatherapi.com/](https://www.weatherapi.com/)
   - Click "Sign Up" (it's completely free!)

2. **Create Your Account**
   - Enter your email and create a password
   - Verify your email address

3. **Get Your API Key**
   - After logging in, go to your Dashboard
   - Copy your API key (it looks like: `abcd1234efgh5678ijkl9012`)

4. **For Development**: Set your API key as an environment variable
   ```bash
   export WEATHER_API_KEY="your_api_key_here"  # Linux/macOS
   # or
   set WEATHER_API_KEY="your_api_key_here"     # Windows Command Prompt
   # or
   $env:WEATHER_API_KEY="your_api_key_here"    # Windows PowerShell
   ```

5. **For Secure Executables**: Use the secure build process (see Building section below)

## Building Secure Executables

### Regular Build (Requires Environment Variable)
```bash
npm run build          # Compile TypeScript only
npm run build:pkg      # Compile and create executables
```

### Secure Build (Embeds Encrypted API Key)
```bash
# Build with embedded encrypted API key
WEATHER_API_KEY="your_key_here" npm run build:secure

# Or pass key as parameter
npm run build:secure -- --api-key "your_key_here"

# Just compile without creating executables
npm run build:secure:skip-pkg
```

### Security Features
- **AES-256 Encryption**: API keys are encrypted using AES-256-CBC
- **Key Obfuscation**: Encrypted keys are split into multiple parts
- **Runtime Decryption**: Keys are only decrypted in memory during runtime
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Fallback Support**: Environment variables take priority over embedded keys

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