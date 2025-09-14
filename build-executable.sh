#!/bin/bash

echo "🔨 Building WAIT - Weather TUI Application..."

# Build TypeScript
echo "📦 Compiling TypeScript..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed during TypeScript compilation"
    exit 1
fi

# Create releases directory
mkdir -p releases

echo "📦 Creating executables..."

# Build executables for different platforms using npx
npx pkg package.json --out-path releases/

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Executables created in ./releases/"
    echo ""
    echo "📁 Available executables:"
    ls -la releases/
    echo ""
    echo "🚀 You can now run:"
    echo "   ./releases/wait-weather-linux    (Linux)"
    echo "   ./releases/wait-weather-macos    (macOS)"  
    echo "   ./releases/wait-weather-win.exe  (Windows)"
else
    echo "❌ Failed to create executables"
    exit 1
fi