# lasso-ignore-require

## This transform should not be used for server side rendering of modules.

Lasso.js transform that ignores specific required modules which my get included during the build phase but are not supported by browser.

This module should be used to avoid using nodejs-only  modules to be bundled in the browser. 

## Prerequisites

This transform requires Lasso v2+

## Installation

```bash
npm install lasso-ignore-require-transform --save
```

## Usage

Add the transform in the lasso-config. See example below. Following example ignores the `require('crypto')` and `require('vm')` calls in all javascript files.

```javascript
require('lasso').configure({
    require: {
      transforms: [{
        transform: 'lasso-ignore-require',
        config: {
          extensions: ['.js', '.es6'], // Enabled file extensions. Default: ['.js', '.es6']
          modules: ['crypto', 'vm']
        }
      }]
      }
      );

```

> All the `require` calls are replaced by `{}`. This module just replaces the require calls but does not guarantee any runtime behaviour. 

