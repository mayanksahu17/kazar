
import crypto from 'crypto';
const algorithm = 'aes-256-ctr';
const secretKey = crypto.createHash('sha256').update(process.env.ENCRYPTION_SECRET!).digest('base64').substr(0, 32); // Hashes and slices to ensure 32 bytes

 export function decrypt(encryptedData: { iv: string, content: string }) {
  const iv = Buffer.from(encryptedData.iv, 'hex');
  const encryptedContent = Buffer.from(encryptedData.content, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  const decrypted = Buffer.concat([decipher.update(encryptedContent), decipher.final()]);

  return decrypted.toString();
}
