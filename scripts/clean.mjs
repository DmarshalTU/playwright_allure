import { rmSync, existsSync } from "node:fs";

const args = new Set(process.argv.slice(2));
const resultsOnly = args.has("--results-only");
const reportOnly = args.has("--report-only");

let targets;
if (resultsOnly) {
  targets = ["allure-results"];
} else if (reportOnly) {
  targets = ["allure-report"];
} else {
  targets = [
    "allure-results",
    "allure-report",
    "test-results",
    "playwright-report",
    "blob-report",
  ];
}

for (const dir of targets) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
    console.log(`removed ${dir}/`);
  }
}

console.log("clean done");
