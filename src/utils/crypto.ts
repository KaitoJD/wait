import * as crypto from 'crypto';

/**
 * Secure API key encryption and decryption utilities
 * Uses AES-256-CBC with application-specific key derivation
 */
export class ApiKeyCrypto {
    private static readonly ALGORITHM = 'aes-256-cbc';
    private static readonly KEY_LENGTH = 32;
    private static readonly IV_LENGTH = 16;

    /**
     * Derive an encryption key from application metadata
     * This creates a deterministic key based on app properties
     */
    private static deriveKey(): Buffer {
        const appMetadata = [
            'wait-weather-app',
            process.version,
            process.platform,
            'som2025'
        ].join('|');

        return crypto.scryptSync(appMetadata, 'weather-api-salt', this.KEY_LENGTH);
    }

    /**
     * Encrypt an API key for embedding in the executable
     */
    static encryptApiKey(apiKey: string): string {
        try {
            const key = this.deriveKey();
            const iv = crypto.randomBytes(this.IV_LENGTH);
            const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
            
            let encrypted = cipher.update(apiKey, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            
            // Combine IV + encrypted data
            const combined = Buffer.concat([
                iv,
                Buffer.from(encrypted, 'hex')
            ]);

            return combined.toString('base64');
        } catch (error) {
            throw new Error(`Failed to encrypt API key: ${error}`);
        }
    }

    /**
     * Decrypt an embedded API key at runtime
     */
    static decryptApiKey(encryptedData: string): string {
        try {
            const key = this.deriveKey();
            const combined = Buffer.from(encryptedData, 'base64');
            
            // Extract components
            const iv = combined.slice(0, this.IV_LENGTH);
            const encrypted = combined.slice(this.IV_LENGTH);
            
            const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
            
            let decrypted = decipher.update(encrypted, undefined, 'utf8');
            decrypted += decipher.final('utf8');
            
            return decrypted;
        } catch (error) {
            throw new Error('Failed to decrypt embedded API key');
        }
    }

    /**
     * Obfuscate encrypted data by splitting into multiple parts
     */
    static obfuscateEncryptedKey(encryptedKey: string): { part1: string; part2: string; part3: string } {
        const keyBuffer = Buffer.from(encryptedKey, 'base64');
        const third = Math.floor(keyBuffer.length / 3);
        
        return {
            part1: keyBuffer.slice(0, third).toString('base64'),
            part2: keyBuffer.slice(third, third * 2).toString('base64'),
            part3: keyBuffer.slice(third * 2).toString('base64')
        };
    }

    /**
     * Reconstruct obfuscated encrypted key
     */
    static reconstructEncryptedKey(part1: string, part2: string, part3: string): string {
        const buffer1 = Buffer.from(part1, 'base64');
        const buffer2 = Buffer.from(part2, 'base64');
        const buffer3 = Buffer.from(part3, 'base64');
        
        return Buffer.concat([buffer1, buffer2, buffer3]).toString('base64');
    }
}