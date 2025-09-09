# Documentation Index

Welcome to the Weather CLI documentation! This directory contains comprehensive guides for using, developing, and contributing to the Weather CLI application.

## Table of Contents

1. [Documentation Structure](#documentation-structure)
   - [Getting Started](#getting-started)
   - [Development](#development)
2. [Quick Links](#quick-links)
3. [Reading Order](#reading-order)
   - [For New Users (Non-Programmers)](#for-new-users-non-programmers)
   - [For End Users (Some Technical Experience)](#for-end-users-some-technical-experience)
   - [For Developers](#for-developers)
4. [Quick Reference](#quick-reference)
   - [Essential Commands](#essential-commands)
   - [Project Structure](#project-structure)
5. [Getting Help](#getting-help)
6. [Documentation Updates](#documentation-updates)

---

## Documentation Structure

### Getting Started
- **[User Guide](USER_GUIDE.md)** - **Start here if you're new!** Simple guide for non-programmers
- **[Installation Guide](INSTALLATION.md)** - Complete setup instructions with troubleshooting
- **[Usage Guide](USAGE.md)** - Command reference and usage examples
- **[Examples](EXAMPLES.md)** - Real command examples with expected output

### Development
- **[Development Guide](DEVELOPMENT.md)** - Contributing code and extending functionality
- **[Contributing Guide](CONTRIBUTING.md)** - Community guidelines and contribution process
- **[Architecture Documentation](ARCHITECTURE.md)** - Technical architecture and design patterns

## Quick Links

| Document | Purpose | Audience |
|----------|---------|----------|
| [USER_GUIDE.md](USER_GUIDE.md) | Simple setup for everyone | New users, non-programmers |
| [INSTALLATION.md](INSTALLATION.md) | Setup and configuration | End users, developers |
| [USAGE.md](USAGE.md) | Command reference | End users |
| [EXAMPLES.md](EXAMPLES.md) | Command examples and output | End users |
| [DEVELOPMENT.md](DEVELOPMENT.md) | Extending the application | Developers |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contributing guidelines | Contributors |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical deep-dive | Developers, architects |

## Reading Order

### For New Users (Non-Programmers)
1. [User Guide](USER_GUIDE.md) - Start here! Simple setup in plain English
2. Practice with the examples in the User Guide
3. [Examples](EXAMPLES.md) - See more examples when ready

### For End Users (Some Technical Experience)
1. [Installation Guide](INSTALLATION.md) - Get up and running
2. [Usage Guide](USAGE.md) - Learn the commands  
3. [Examples](EXAMPLES.md) - See real examples

### For Developers
1. [Installation Guide](INSTALLATION.md) - Set up development environment
2. [Architecture Documentation](ARCHITECTURE.md) - Understand the codebase
3. [Development Guide](DEVELOPMENT.md) - Learn to extend the application
4. [Contributing Guide](CONTRIBUTING.md) - Contribute to the project

## Quick Reference

### Essential Commands
```bash
# Install and setup
npm install
cp .env.example .env  # Add your API key

# Development
npm run dev current "London"
npm run dev forecast "Paris" 5

# Production
npm run build
node dist/app.js current "London"
```

### Project Structure
```
docs/
├── README.md          # This file - Documentation index
├── USER_GUIDE.md      # Simple guide for everyone
├── INSTALLATION.md    # Setup guide
├── USAGE.md           # Command reference
├── EXAMPLES.md        # Example outputs
├── DEVELOPMENT.md     # Developer guide
├── CONTRIBUTING.md    # Contribution guide
└── ARCHITECTURE.md    # Technical architecture
```

## Getting Help

- **Technical Issues**: Check [INSTALLATION.md](INSTALLATION.md) troubleshooting section
- **Usage Questions**: See [USAGE.md](USAGE.md) and [EXAMPLES.md](EXAMPLES.md)
- **Development Help**: Read [DEVELOPMENT.md](DEVELOPMENT.md)
- **Contributing**: Follow [CONTRIBUTING.md](CONTRIBUTING.md)

## Documentation Updates

This documentation is maintained alongside the codebase. When contributing:
- Update relevant documentation with code changes
- Add new examples for new features
- Keep installation instructions current
- Test all documented commands