import { randomBytes, createHash } from 'crypto';

function generateRandomString() {
  const buffer = randomBytes(32);
  return buffer.toString('hex');
}

function base64URLEncode(str) {
  const base64 = Buffer.from(str).toString('base64');
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest();
}

export const generateCodeChallenge = () => {
  const codeVerifier = generateRandomString();
  const codeChallenge = base64URLEncode(sha256(codeVerifier));

};

