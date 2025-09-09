# Contributing Guide

Thank you for your interest in contributing to Weather CLI! This guide will help you get started.

## Table of Contents

1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Setting Up Development Environment](#setting-up-development-environment)
2. [Development Workflow](#development-workflow)
   - [Making Changes](#making-changes)
   - [Development Guidelines](#development-guidelines)
3. [Types of Contributions](#types-of-contributions)
   - [Bug Fixes](#bug-fixes)
   - [New Features](#new-features)
   - [Documentation](#documentation)
   - [Performance Improvements](#performance-improvements)
4. [Adding New Features](#adding-new-features)
   - [New Commands](#new-commands)
   - [New Services](#new-services)
   - [New Utilities](#new-utilities)
5. [Code Review Process](#code-review-process)
   - [Before Submitting PR](#before-submitting-pr)
   - [PR Requirements](#pr-requirements)
   - [Review Criteria](#review-criteria)
6. [Issue Reporting](#issue-reporting)
   - [Bug Reports](#bug-reports)
   - [Feature Requests](#feature-requests)
7. [Development Tips](#development-tips)
   - [Debugging](#debugging)
   - [Common Pitfalls](#common-pitfalls)
   - [Best Practices](#best-practices)
8. [Community Guidelines](#community-guidelines)
   - [Code of Conduct](#code-of-conduct)
   - [Communication](#communication)
9. [Recognition](#recognition)
10. [Getting Help](#getting-help)

---

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Git
- A WeatherAPI.com API key for testing

### Setting Up Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/yourusername/weather-cli.git
   cd weather-cli
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Add your API key to .env
   ```

## Development Workflow

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** following the guidelines below

3. **Test your changes**:
   ```bash
   npm run build
   npm run dev -- current "London"  # Test functionality
   ```

4. **Commit your changes**:
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request** on GitHub

### Development Guidelines

#### Code Style
- Follow existing TypeScript conventions
- Use meaningful variable and function names
- Add JSDoc comments for public methods
- Maintain consistent indentation (2 spaces)

#### File Organization
- One class per file
- Use PascalCase for classes, camelCase for functions
- Group related functionality in services
- Keep utilities pure and stateless

#### Error Handling
- Use specific, helpful error messages
- Provide suggestions when possible
- Handle edge cases gracefully
- Validate inputs early

#### Testing
- Test your changes manually with various inputs
- Ensure error cases are handled properly
- Test with different location formats
- Verify help commands work correctly

## Types of Contributions

### Bug Fixes
- Fix reported issues
- Improve error handling
- Address edge cases

### New Features
Examples of welcome features:
- New weather data types (air quality, UV index)
- Additional output formats (JSON, XML)
- Caching for API responses
- Configuration file support
- Weather alerts and notifications

### Documentation
- Improve existing documentation
- Add more usage examples
- Create tutorials
- Fix typos and clarity issues

### Performance Improvements
- Optimize API calls
- Improve response parsing
- Reduce memory usage
- Faster startup times

## Adding New Features

### New Commands
1. Create command class in `src/commands/`
2. Implement `execute()` method
3. Add proper error handling
4. Register in `src/commands/index.ts`
5. Add documentation and examples

### New Services
1. Create service in `src/services/`
2. Define interfaces in `src/types/`
3. Implement with proper error handling
4. Add unit tests (future)

### New Utilities
1. Add to appropriate file in `src/utils/`
2. Keep functions pure when possible
3. Document function purpose and parameters
4. Consider reusability

## Code Review Process

### Before Submitting PR
- [ ] Code builds without errors
- [ ] Manual testing completed
- [ ] Documentation updated if needed
- [ ] Commit messages are descriptive

### PR Requirements
- Clear description of changes
- Reference any related issues
- Include testing instructions
- Update documentation if needed

### Review Criteria
- Code quality and consistency
- Proper error handling
- Performance implications
- Documentation completeness
- Backward compatibility

## Issue Reporting

### Bug Reports
Please include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node.js version)
- Error messages if any

### Feature Requests
Please include:
- Description of the feature
- Use case and rationale
- Proposed implementation (if any)
- Examples of similar features

## Development Tips

### Debugging
- Use `Logger` utility for consistent logging
- Test with various location formats
- Check API responses manually
- Use TypeScript compiler for error detection

### Common Pitfalls
- Not handling API rate limits
- Missing input validation
- Inconsistent error messages
- Breaking existing functionality

### Best Practices
- Write self-documenting code
- Keep functions focused and small
- Use proper TypeScript types
- Handle async operations properly

## Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers learn
- Focus on technical merit

### Communication
- Use clear, descriptive commit messages
- Comment code when necessary
- Ask questions if unsure
- Provide helpful PR descriptions

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors list
- Release notes for significant contributions

## Getting Help

If you need help:
- Check existing documentation
- Look at similar implementations
- Open a discussion issue
- Ask questions in PR comments

Thank you for contributing to Weather CLI!