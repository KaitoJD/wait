# WAIT - Development Guide

## Setup

```bash
git clone https://github.com/KaitoJD/wait.git
cd wait
npm install
```

Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/) and set it:

```bash
export WEATHER_API_KEY="your_key"   # Linux/macOS
$env:WEATHER_API_KEY="your_key"     # Windows PowerShell
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Run in development mode |
| `npm run build` | Compile TypeScript |
| `npm run build:pkg` | Create executables |
| `npm run build:secure` | Build with embedded encrypted API key |

## Project Structure

```
src/
├── app.ts              # Entry point
├── tui-app.ts          # TUI initializer
├── services/           # API integration
├── types/              # TypeScript interfaces
├── ui/                 # Terminal UI (Blessed.js)
│   └── components/     # UI components
└── utils/              # Helpers (config, validation, formatting)
```

## Adding Features

**UI Components:** Create in `src/ui/components/`, export in `index.ts`, add menu option in `menu.ts`

**Services:** Add to `src/services/`, define types in `src/types/index.ts`

**Utilities:** Add helper functions in `src/utils/`

## Code Style

- Strict TypeScript with interfaces
- PascalCase for classes, camelCase for functions
- Handle errors with user-friendly messages
- Use `Logger` from `src/utils/logger.ts` (not console.log)
- Validate all inputs via `validator.ts`

## Contributing

1. Fork and clone the repo
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make changes and test: `npm run build && npm run dev`
4. Commit with clear messages
5. Open a Pull Request

**PR Checklist:**
- [ ] Code builds without errors
- [ ] Manual testing completed
- [ ] Documentation updated if needed

## Debugging

- **API key issues:** Check env var is set correctly
- **Build errors:** Run `npm run build` for details
- **Network issues:** Test API connectivity

Enable verbose logging:
```bash
DEBUG=* npm run dev
```