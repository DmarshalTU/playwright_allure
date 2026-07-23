/**
 * Central place for credentials / tokens.
 * Local: copy .env.example → .env
 * CI: set GitHub Actions secrets (see README)
 */

export type LoginSecrets = {
  username: string;
  password: string;
  loginUrl: string;
};

function read(name: string): string | undefined {
  const value = process.env[name];
  if (value == null) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function requireEnv(name: string): string {
  const value = read(name);
  if (!value) {
    throw new Error(
      `Missing secret: ${name}. ` +
        `Local: copy .env.example to .env. ` +
        `CI: add a repository secret named ${name}.`,
    );
  }
  return value;
}

export function maskSecret(value: string): string {
  if (value.length <= 4) return "****";
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

export function getLoginSecrets(): LoginSecrets {
  return {
    username: requireEnv("TEST_USERNAME"),
    password: requireEnv("TEST_PASSWORD"),
    loginUrl: read("LOGIN_URL") ?? "https://the-internet.herokuapp.com/login",
  };
}

export function getApiKey(): string {
  return requireEnv("API_KEY");
}

export function hasLoginSecrets(): boolean {
  return Boolean(read("TEST_USERNAME") && read("TEST_PASSWORD"));
}

export function hasApiKey(): boolean {
  return Boolean(read("API_KEY"));
}
