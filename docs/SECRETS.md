# Secrets checklist

Add these under **Settings → Secrets and variables → Actions**:

| Secret | Example (demo only) |
| --- | --- |
| `TEST_USERNAME` | `tomsmith` |
| `TEST_PASSWORD` | `SuperSecretPassword!` |
| `API_KEY` | `your-real-api-key` |
| `LOGIN_URL` | optional — defaults to the-internet login |

For a real app, point `LOGIN_URL` at your login page and use non-demo credentials.

Never commit `.env`.
