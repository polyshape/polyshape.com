export function isDev(): boolean {
  // Prefer Vite’s injected flag if available, else fall back to NODE_ENV
  return process.env.NODE_ENV !== "production";
}

export function getEnvVar(key: string): string | undefined {
  return process.env[key];
}
