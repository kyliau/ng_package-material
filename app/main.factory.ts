// @angular/bazel doesn't automatically:
//   - switch to the AoT .ngfactory
//   - adjust the platformBrowser[Dynamic]
//   so we manually import it

// import './polyfills';

import {platformBrowser} from '@angular/platform-browser';

import {enableProdMode} from '@angular/core';
// If Prod mode is not enabled material complains about:
// "Could not find Angular Material core theme. Most Material components may not work as expected."
enableProdMode();

import {AppModuleNgFactory} from './app.module.ngfactory';

platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.log(err));
