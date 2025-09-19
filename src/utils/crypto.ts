import * as crypto from 'crypto';

/**
 * Secure API key encryption and decryption utilities
 * Uses AES-256-CBC with application-specific key derivation
 */
export class ApiKeyCrypto {
    private static readonly ALGORITHM = 'aes-256-cbc';
    private static readonly KEY_LENGTH = 32;
    private static readonly IV_LENGTH = 16;
    private static readonly STATIC_SALT = 'wait-weather-app-som2025-salt';
    private static readonly APP_IDENTIFIER = 'wait-weather-app-v1.0.0-som2025';

    /**
     * Derive an encryption key from static application metadata
     * This creates a deterministic key that works across all environments
     */
    private static deriveKey(): Buffer {
        // Use static, environment-independent values for consistent key derivation
        return crypto.scryptSync(this.APP_IDENTIFIER, this.STATIC_SALT, this.KEY_LENGTH);
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
            
            // Create a payload with version info for debugging
            const payload = {
                version: '1.0.0',
                algorithm: this.ALGORITHM,
                encrypted: encrypted
            };
            
            // Combine IV + payload
            const payloadBuffer = Buffer.from(JSON.stringify(payload), 'utf8');
            const combined = Buffer.concat([
                iv,
                payloadBuffer
            ]);

            return combined.toString('base64');
        } catch (error) {
            throw new Error(`Failed to encrypt API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            const payloadBuffer = combined.slice(this.IV_LENGTH);
            
            let payload: any;
            try {
                payload = JSON.parse(payloadBuffer.toString('utf8'));
            } catch {
                // Fallback for old format - treat entire buffer as encrypted data
                const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
                let decrypted = decipher.update(payloadBuffer, undefined, 'utf8');
                decrypted += decipher.final('utf8');
                return decrypted;
            }
            
            // New format with payload
            if (!payload.encrypted) {
                throw new Error('Invalid encrypted data format');
            }
            
            const decipher = crypto.createDecipheriv(payload.algorithm || this.ALGORITHM, key, iv);
            let decrypted = decipher.update(Buffer.from(payload.encrypted, 'hex'), undefined, 'utf8');
            decrypted += decipher.final('utf8');
            
            return decrypted;
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to decrypt embedded API key: ${errorMsg}. The executable may have been built with a different version or the encrypted data is corrupted.`);
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