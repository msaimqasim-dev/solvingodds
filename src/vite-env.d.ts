/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional override for the public Web3Forms access key (safe to expose). */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
