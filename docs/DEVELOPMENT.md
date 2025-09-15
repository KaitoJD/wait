# WAIT - Development Guide

## Development Setup

**Scripts:**
- `npm run dev` - Run in development mode
- `npm run build` - Build TypeScript code
- `npm start` - Run built application

**Workflow:**
1. Edit files in `src/`
2. Test with `npm run dev`
3. Build with `npm run build`

## Adding Features

**UI Components:** Create in `src/ui/components/`, export in `index.ts`, add menu option in `menu.ts`
**Services:** Add to `src/services/`, define types in `src/types/index.ts`
**Utilities:** Add helper functions in `src/utils/`

## Code Style

- Use strict TypeScript with interfaces
- PascalCase for classes, camelCase for functions
- One class per file
- Handle errors gracefully with specific messages

## Testing (Future)

Unit tests in `tests/` directory with Jest framework.

## Debugging

**Common Issues:**
- API key: Check `.env` file and key validity
- Build errors: Run `npm run build` for details
- Network: Test connectivity and API endpoints

**Logging:** Use `Logger` from `src/utils/logger.ts`

## Performance & Security

**Performance:**
- Cache API responses
- Use HTTP timeouts
- Clean up resources

**Security:**
- Store API keys in `.env` only
- Validate all user inputs
- Never commit secrets to git