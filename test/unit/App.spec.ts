/// <reference path="../references.ts" />
/// <reference path="../../typings/main/ambient/angular-mocks/index.d.ts" />
import * as angular from "angular";

//import _Bootstraper from "../../examples/_Bootstraper";
import {ngIOC} from "../../src/ngIOC";
import HeaderDirective from "../../examples/components/header/Header.directive";

import * as ngMock from "angular-mocks/ngMock";
import * as ngMockE2E from "angular-mocks/ngMockE2E";
import * as ngAnimateMock from "angular-mocks/ngAnimateMock";

beforeEach(() =>{

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
      "app", "app.components","app.views"
    ]);
  });

});

describe("App", () => {
  describe("during initialization", () => {
    it("is has injector", () => {
        chai.assert(ngIOC.defaultModule);
    });
  });
});
describe("Directive", () => {
  HeaderDirective();
  describe("during initialization", () => {

    it("is alive", () => {
      chai.assert(typeof HeaderDirective !== undefined)
    });
    it("is has injector", angular.mock.inject(function($compile, $rootScope){
      var element = $compile('<div header=""></div>')($rootScope);
      $rootScope.$digest();
        // Check that the compiled element contains the templated content
      expect(element.html()).to.contain("<div> @directive works </div>");
    }));

  });
});
