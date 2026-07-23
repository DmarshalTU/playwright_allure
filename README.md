# Playwright + Allure demo

Friendly Playwright starter with **Allure** reports, **secrets-based login**, and GitHub Actions that run **once a day** or **manually** (including **multi-branch**).

## Quick start (local)

```bash
npm run setup
cp .env.example .env   # credentials / API key
npm run test:green     # green suite
npm run test:auth      # login + API key tests
npm run report         # open Allure
```

## Secrets

| Name | Used by | Notes |
| --- | --- | --- |
| `TEST_USERNAME` | Login UI test | Required for `@login` |
| `TEST_PASSWORD` | Login UI test | Never logged in clear text |
| `API_KEY` | API auth test | Sent as Bearer token |
| `LOGIN_URL` | Optional | Defaults to the-internet login page |

**Local:** copy `.env.example` → `.env` (gitignored).

**GitHub:** Settings → Secrets and variables → Actions → New repository secret.

If CI secrets are missing, the workflow falls back to the public [the-internet](https://the-internet.herokuapp.com/login) demo account so the starter still runs. Replace those with real secrets for your app.

## Everyday commands

| What you want | Command |
| --- | --- |
| Green suite | `npm run test:green` |
| Auth / login only | `npm run test:auth` / `npm run test:login` |
| Smoke | `npm run test:smoke` |
| Regression | `npm run test:regression` |
| One file | `npm run test:file -- tests/auth/login.spec.ts` |
| By tag | `npm run test:grep -- "@api"` |
| Allure report | `npm run report` |

### Tags

- `@smoke` `@regression` `@docs` `@auth` `@login` `@api`
- `@demo-fail` — intentional failure (excluded by default)

## GitHub Actions

Workflow: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)

| Trigger | Behavior |
| --- | --- |
| **Schedule** | Every day at **06:00 UTC** on `main` |
| **Manual** | Actions → *Playwright + Allure* → *Run workflow* |

### Manual inputs

| Input | Purpose |
| --- | --- |
| **branches** | Comma-separated list, e.g. `main,develop,feature/login` |
| **suite** | `all` / `smoke` / `auth` / `regression` / `docs` / `custom` |
| **grep** | Custom filter when suite=`custom` |
| **project** | Browser(s) |
| **shards** | Parallel shards **per branch** |
| **include_demo_fail** | Optional failure showcase |

Each branch gets its own Allure artifact: `allure-report-<branch>`. GitHub Pages publishes the **first** branch in the list.

### Reports in Actions

1. Open the run → **Summary**
2. Download **Artifacts** → `allure-report-<branch>`
3. Optional live site after enabling Pages (see [`docs/GITHUB_PAGES.md`](docs/GITHUB_PAGES.md))

```bash
npx allure open ./allure-report
```

## Project layout

```
tests/
  auth/           # @login / @api (secrets)
  smoke/
  regression/
  demo/           # @demo-fail
  helpers/secrets.ts
.env.example
.github/workflows/playwright.yml
```

## Requirements

- Node.js 18+
- No Java — Allure via npm CLI
