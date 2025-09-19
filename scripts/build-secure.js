#!/usr/bin/env node

/**
 * Build script for creating secure executables with embedded encrypted API keys
 * This script compiles TypeScript, embeds encrypted API key, and creates executables
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import the crypto utilities (we'll compile them first)
function loadCryptoUtils() {
    try {
        // Ensure temp directory exists
        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // Create temp utils directory
        const tempUtilsDir = path.join(tempDir, 'utils');
        if (!fs.existsSync(tempUtilsDir)) {
            fs.mkdirSync(tempUtilsDir, { recursive: true });
        }
        
        // Compile the crypto utils first
        execSync('npx tsc src/utils/crypto.ts --outDir temp --target ES2020 --module commonjs --moduleResolution node --esModuleInterop true', { stdio: 'inherit' });
        
        const cryptoPath = path.join(process.cwd(), 'temp/crypto.js');
        if (!fs.existsSync(cryptoPath)) {
            throw new Error(`Crypto module not found at ${cryptoPath}`);
        }
        
        const { ApiKeyCrypto } = require(cryptoPath);
        return ApiKeyCrypto;
    } catch (error) {
        console.error('❌ Failed to compile crypto utilities:', error.message);
        process.exit(1);
    }
}

/**
 * Test encryption/decryption before embedding
 */
function testEncryption(ApiKeyCrypto, apiKey) {
    try {
        console.log('🧪 Testing encryption/decryption...');
        const encrypted = ApiKeyCrypto.encryptApiKey(apiKey);
        const decrypted = ApiKeyCrypto.decryptApiKey(encrypted);
        
        if (decrypted === apiKey) {
            console.log('✅ Encryption test passed');
            return true;
        } else {
            console.error('❌ Encryption test failed: decrypted key does not match original');
            return false;
        }
    } catch (error) {
        console.error('❌ Encryption test failed:', error.message);
        return false;
    }
}

/**
 * Embed encrypted API key into the source code
 */
function embedApiKey(apiKey) {
    try {
        console.log('🔐 Encrypting API key...');
        
        const ApiKeyCrypto = loadCryptoUtils();
        
        // Test encryption before proceeding
        if (!testEncryption(ApiKeyCrypto, apiKey)) {
            throw new Error('Encryption test failed');
        }
        
        const encryptedKey = ApiKeyCrypto.encryptApiKey(apiKey);
        const obfuscatedParts = ApiKeyCrypto.obfuscateEncryptedKey(encryptedKey);
        
        console.log('📦 Embedding encrypted key into source...');
        
        const embeddedKeyPath = path.join(process.cwd(), 'src/utils/embedded-key.ts');
        const buildTime = new Date().toISOString();
        const version = require(path.join(process.cwd(), 'package.json')).version;
        
        const embeddedKeyContent = `/**
 * Embedded encrypted API key parts
 * This file was automatically generated during build process
 * Build time: ${buildTime}
 * DO NOT MODIFY MANUALLY
 */

// Obfuscated encrypted API key parts
export const EMBEDDED_API_KEY_PARTS = {
    part1: '${obfuscatedParts.part1}',
    part2: '${obfuscatedParts.part2}',
    part3: '${obfuscatedParts.part3}'
};

// Build metadata for verification
export const BUILD_METADATA = {
    buildTime: '${buildTime}',
    version: '${version}',
    hasEmbeddedKey: true
};`;

        fs.writeFileSync(embeddedKeyPath, embeddedKeyContent);
        console.log('✅ API key successfully embedded');
        
        return true;
    } catch (error) {
        console.error('❌ Failed to embed API key:', error.message);
        return false;
    }
}

/**
 * Clean up temporary files
 */
function cleanup() {
    try {
        if (fs.existsSync('temp')) {
            fs.rmSync('temp', { recursive: true });
        }
    } catch (error) {
        console.warn('⚠️  Warning: Failed to clean temporary files:', error.message);
    }
}

/**
 * Main build process
 */
function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
🔨 WAIT Secure Build Tool

Usage: node build-secure.js [options]

Options:
  --api-key <key>     API key to embed (can also use WEATHER_API_KEY env var)
  --skip-pkg          Only compile TypeScript, don't create executables
  --help, -h          Show this help message

Environment Variables:
  WEATHER_API_KEY     API key to embed in the executable

Examples:
  # Build with API key from environment variable
  WEATHER_API_KEY="your_key_here" node build-secure.js
  
  # Build with API key parameter
  node build-secure.js --api-key "your_key_here"
  
  # Just compile without creating executables
  node build-secure.js --skip-pkg
        `);
        return;
    }

    console.log('🚀 Starting secure build process...');
    
    try {
        // Get API key from argument or environment
        let apiKey = null;
        const apiKeyIndex = args.indexOf('--api-key');
        if (apiKeyIndex !== -1 && args[apiKeyIndex + 1]) {
            apiKey = args[apiKeyIndex + 1];
        } else {
            apiKey = process.env.WEATHER_API_KEY;
        }
        
        if (!apiKey) {
            console.log('ℹ️  No API key provided, building without embedded key...');
            
            // Reset embedded key file to empty state
            const embeddedKeyPath = path.join(process.cwd(), 'src/utils/embedded-key.ts');
            const emptyKeyContent = `/**
 * Embedded encrypted API key parts
 * This file will be automatically generated during build process
 * DO NOT MODIFY MANUALLY
 */

// These values will be replaced during the build process
export const EMBEDDED_API_KEY_PARTS = {
    part1: '',
    part2: '',
    part3: ''
};

// Build metadata for verification
export const BUILD_METADATA = {
    buildTime: '${new Date().toISOString()}',
    version: '${require(path.join(process.cwd(), 'package.json')).version}',
    hasEmbeddedKey: false
};`;
            fs.writeFileSync(embeddedKeyPath, emptyKeyContent);
        } else {
            // Validate API key format before embedding
            if (!apiKey || apiKey.length < 10) {
                console.error('❌ Invalid API key provided. API key must be at least 10 characters long.');
                process.exit(1);
            }
            
            // Embed the API key
            if (!embedApiKey(apiKey)) {
                process.exit(1);
            }
        }
        
        // Compile TypeScript
        console.log('🔧 Compiling TypeScript...');
        execSync('npm run build', { stdio: 'inherit' });
        
        // Create executables unless --skip-pkg is specified
        if (!args.includes('--skip-pkg')) {
            console.log('📦 Creating executables...');
            execSync('npm run build:pkg', { stdio: 'inherit' });
            console.log('✅ Executables created successfully');
        }
        
        console.log('🎉 Build completed successfully!');
        
    } catch (error) {
        console.error('❌ Build failed:', error.message);
        process.exit(1);
    } finally {
        cleanup();
    }
}

// Handle cleanup on exit
process.on('exit', cleanup);
process.on('SIGINT', () => {
    cleanup();
    process.exit(0);
});

if (require.main === module) {
    main();
}

module.exports = { embedApiKey, cleanup };