# Contributing Guide

Thank you for your interest in contributing to WAIT (Weather App Interactive Terminal)!

## Getting Started

**Prerequisites:**
- Node.js 16+
- npm/yarn
- Git
- WeatherAPI.com API key

**Setup:**
1. Fork and clone the repository
2. `npm install`
3. Copy `.env.example` to `.env` and add your API key

## Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes following the guidelines below
3. Test: `npm run build && npm run dev`
4. Commit and push to your fork
5. Open a Pull Request

## Guidelines

**Code Style:**
- Follow TypeScript conventions
- Use meaningful names and JSDoc comments
- One class per file, PascalCase for classes
- Handle errors gracefully with helpful messages

**File Structure:**
- UI components: `src/ui/components/`
- Services: `src/services/`
- Types: `src/types/`
- Utilities: `src/utils/`

## Types of Contributions

**Welcome contributions:**
- Bug fixes and error handling improvements
- New weather data types (air quality, UV index, etc.)
- UI enhancements and new components
- Performance optimizations
- Documentation improvements
- Additional output formats (JSON, XML)

## Pull Request Checklist

- [ ] Code builds without errors
- [ ] Manual testing completed
- [ ] Documentation updated if needed
- [ ] Clear commit messages

## Issue Reporting

**Bug Reports:** Include description, steps to reproduce, environment details, and error messages.

**Feature Requests:** Describe the feature, use case, and proposed implementation.

## Development Tips

- Use the `Logger` utility for consistent logging
- Test with various location formats and edge cases
- Validate inputs early and handle API rate limits
- Keep functions focused and use proper TypeScript types

## Getting Help

- Check existing documentation
- Open a discussion issue
- Ask questions in PR comments