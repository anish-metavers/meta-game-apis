import { createCipheriv, createDecipheriv } from 'crypto';

const ENCRYPT_KEY = process.env.ENCRYPT_KEY;
const ENCRYPT_IV = process.env.ENCRYPT_IV;

export function encrypt(text: any) {
    const cipher = createCipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPT_KEY, 'hex'),
        Buffer.from(ENCRYPT_IV, 'hex'),
    );
    let encryptedText = cipher.update(text, 'utf-8', 'hex');
    encryptedText += cipher.final('hex');
    return encryptedText.toString();
}

export function decrypt(text: any) {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = createDecipheriv(
        'aes-256-cbc',
        Buffer.from(ENCRYPT_KEY, 'hex'),
        Buffer.from(ENCRYPT_IV, 'hex'),
    );
    const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);
    return decryptedText.toString();
}
