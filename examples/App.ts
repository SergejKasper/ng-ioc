
/// <reference path="../typings/main/ambient/jquery/index.d.ts" />
/// <reference path="../typings/main/ambient/angular/index.d.ts" />
/// <reference path="../typings/main/ambient/angular-ui-router/index.d.ts" />
/// <reference path="../typings/main/ambient/angular-mocks/index.d.ts" />
/*
import * as angular from "angular";
import ngDI from "../src/ngDI";
import {ngIOC} from "../src/ngIOC";

import * as ngMock from "angular-mocks/ngMock";
import * as ngMockE2E from "angular-mocks/ngMockE2E";
import * as angularAnimate from "angular-mocks/ngAnimateMock";

var App = (function (){
  const ng:ng.IAngularStatic = angular;
  var dependencies = ["app.components","app.views"].map((mod:string)=>{
    angular.module(mod, []);
    return mod;
  }).concat(["ui.router",
  "ngAnimate",
  "ngCookies",
  "ngMessages",
  "ngResource",
  "ngMock"]);
  var appModule:ng.IModule = angular.module("app", dependencies);

  angular.element(document).ready(() => {
    angular.bootstrap(document, [
      "app"
    ]);
  });

  return ng;
})();
*/
export default () =>  {};
