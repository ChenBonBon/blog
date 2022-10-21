import CryptoJS from 'crypto-js';

const AES_KEY = CryptoJS.enc.Utf8.parse('2022102018020000');
const AES_IV = CryptoJS.enc.Utf8.parse('1234567890000000');

export function entrypt(password: string) {
  const srcs = CryptoJS.enc.Utf8.parse(password);
  const encrypted = CryptoJS.AES.encrypt(srcs, AES_KEY, {
    iv: AES_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
}

export function decrypt(entrypted: string) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(entrypted);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, AES_KEY, {
    iv: AES_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
