# objective-part1




Setup inst:
npm install playwright
provide git access
install the browser dependencies


Steps for run the project:
npx playwright test ./part1/example.spec.js --project=chromium


Report Generation:
npx playwright show-report


"Data Configuration:

    Create a data.json file containing:
        Website URLs
        Search terms
    Import this file into your project for reference.

Testing and Logging:

    Each test step will be logged to test-logs.txt.
    Screenshots will be captured for both successful and failed test cases and saved in the screenshots folder."

