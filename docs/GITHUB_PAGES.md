# GitHub Pages (for live Allure reports)

Enable once after the first push:

1. Repo → **Settings** → **Pages**
2. **Source**: GitHub Actions
3. Re-run the workflow (or push again)

The Allure report will be published to:
`https://<owner>.github.io/<repo>/`

If Pages is not enabled yet, you can still download the `allure-report` artifact from any workflow run.
