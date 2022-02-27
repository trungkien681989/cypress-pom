# Cypress Automation

### Installation

If you want to run any of the tests locally, you will need to install a few
things first:

- Node.js

- Cypress

From within the repo on your machine, you can do a clean install of the latest packages:

```angular2html
npm install cleanInstall
```

## Running Cypress

- for localized testing with the Cypress Runner GUI

| Command | Environment |
| ------- | ----------- |
| ./node_modules/yarn/bin/yarn run prod:test  | PROD  |

- for localized headless testing without the Cypress Runner GUI

| Command | Environment |
| ------- | ----------- |
| ./node_modules/yarn/bin/yarn run prod:run  | PROD  |

  
## Core Packages
```angular2html
    "cypress": "7.7.0",
    "cypress-cucumber-preprocessor": "4.1.4",
    "cypress-tags": "0.2.0",
    "lodash": "4.17.21",
    "yarn": "^1.22.10"
```

### Dev Dependencies
```angular2html
    "eslint": "^7.27.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-plugin-chai-friendly": "^0.7.1",
    "eslint-plugin-cypress": "^2.11.3",
    "eslint-plugin-import": "^2.23.3"
```

### Alternative Testing Modes
Different Viewports:
- mobile
- tablet

We can utilize Cypress to do responsive mode testing of the UI in the previously
mentioned viewports allowing us flexibility and coverage for our application. Cypress 
comes with a variety of viewport settings.

| Command | Environment |
| ------- | ----------- |
| ./node_modules/yarn/bin/yarn run prod:test:iphone  | PROD  |
* these run in the Cypress Runner GUI in their current configuration
