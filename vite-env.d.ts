declare module '*.vue';

interface EncryptedRoute {
  path: string;
  password: string;
}

declare const __ENCRYPTED_ROUTES__: EncryptedRoute[];
