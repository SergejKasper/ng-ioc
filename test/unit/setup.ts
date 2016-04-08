/// <reference path="../../typings/main/ambient/jquery/index.d.ts" />
/// <reference path="../../typings/main/ambient/angular/index.d.ts" />
/// <reference path="../../typings/main/ambient/angular-ui-router/index.d.ts" />
/// <reference path="../../typings/main/ambient/angular-mocks/index.d.ts" />


import * as angular from "angular";
import * as ngMock from "angular-mocks/ngMock";
import * as ngMockE2E from "angular-mocks/ngMockE2E";
import * as ngAnimateMock from "angular-mocks/ngAnimateMock";
import {ngIOC} from "../../src/ngIOC";

var app = angular.module('app',
['app.components',"app.views"].map((mod:string)=>{angular.module(mod, []); return mod;})
.concat(
["ui.router",
"ngAnimate",
"ngCookies",
"ngMessages",
"ngResource",
ngMock,
ngMockE2E,
ngAnimateMock]));
ngIOC.angular = angular;
ngIOC.defaultModule = app;

angular.element(document).ready(() => {
  angular.bootstrap(document, [
    "app"
  ]);
});

export default app;
