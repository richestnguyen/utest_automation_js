var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var reporter = new HtmlScreenshotReporter({
    dest: 'target/screenshots',
    filename: 'my-report.html'
});

exports.config = {
    directConnect: false,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    SELENIUM_PROMISE_MANAGER: false,
    allScriptsTimeout: 120000,
    getPageTimeout: 180000,
    maxSessions: 1,
    specs: ['./e2e/specs/desktop/*.spec.js'],
    suites: {
        //define test suite here
        full: ['./e2e-ts/tests/**/*.spec.ts']
    },
    baseUrl: 'https://www.utest.com/signup/personal',
    framework: 'jasmine',

    // Setup the report before any tests start
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },
    onPrepare: () => {
        const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));
        jasmine.getEnv().addReporter(reporter);
    },
    // Close the report after all tests finish
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
    multiCapabilities: [{
        browserName: 'chrome'
    }
    ],

    jasmineNodeOpts: {
        showColors: true,
        displaySpecDuration: true,
        // overrides jasmine's print method to report dot syntax for custom reports
        print: () => {},
        defaultTimeoutInterval: 600000
    }
};
