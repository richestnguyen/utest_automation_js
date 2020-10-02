# Test assessment
### Installation

Requires [Node.js](https://nodejs.org/) run.

Install the dependencies and devDependencies.
```sh
$ cd utest_automation_js
$ npm install
```
Try running ```protractor --version``` to make sure protractor is installed.

Now start up a webdriver server with: ```webdriver-manager start```

To execute test, run the following command: 

For desktop browser: ```npm run test``` or ```protractor.conf.js```

To run specific test: ```protractor protractor.conf.js --spec=.\e2e\specs\desktop\first-test.spec.ts --grep="<suitename> <testname>"```

Example: ```protractor protractor.conf.js --spec=.\e2e\specs\desktop\first-test.spec.ts --grep="Verify invalid email format when creating an account"```
