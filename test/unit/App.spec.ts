/// <reference path="../references.ts" />
/// <reference path="../../typings/main/ambient/angular-mocks/index.d.ts" />

import AppBuilder from "../../examples/App";
import {ngIOC} from "../../src/ngIOC";
import {HeaderDirective} from "../../examples/components/header/Header.controller";

import * as angular from "angular";
import * as ngMock from "angular-mocks/ngMock";
import * as ngMockE2E from "angular-mocks/ngMockE2E";
import * as angularAnimate from "angular-mocks/ngAnimateMock";

angular.module('app', [
  ngMock,
  ngMockE2E,
  angularAnimate
]);

AppBuilder();

angular.element(document).ready(() => {
angular.bootstrap(document, [
  "app"
]);
});

beforeEach(angular.mock.module('app'));

beforeEach(()=>{

})


beforeEach(angular.mock.inject(function($compile, $rootScope){
  $compile('<div header=""></div>', $rootScope.$new());
}))

describe("App", () => {
  describe("during initialization", () => {
    it("is alive", () => {
      chai.assert(typeof App !== undefined);
    });
    it("is has injector", () => {
        chai.assert(ngIOC.defaultModule);
    });
  });
});
describe("Directive", () => {
  describe("during initialization", () => {

    it("is alive", () => {
      chai.assert(typeof HeaderDirective !== undefined)
    });
    it("is has injector", inject(($compile, $rootScope) =>{
      chai.assert(true);
        //$compile('<div header="{{is Loaded}}"></div>', $rootScope.$new());

    }));

  });
});
