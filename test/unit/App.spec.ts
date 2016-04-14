/// <reference path="../references.ts" />
/// <reference path="../../typings/main/ambient/angular-mocks/index.d.ts" />
import * as angular from "angular";

import {ngIOC, Resolver} from "../../src/ngIOC";
import HeaderDirective from "../../examples/components/header/Header.directive";
import HomeController from "../../examples/views/home/Home.controller";
import BaseRun from "../../examples/run/base.run";
import BaseConfig from "../../examples/config/base.config";


import * as ngMock from "angular-mocks/ngMock";
import * as ngMockE2E from "angular-mocks/ngMockE2E";
import * as ngAnimateMock from "angular-mocks/ngAnimateMock";

var scope, createController;

BaseRun;
BaseConfig;

angular.module("app", [
  Resolver.registerModule("views"),
  Resolver.registerModule("components.data"),
  Resolver.registerModule("components.header"),
  ngMock,
  ngMockE2E,
  ngAnimateMock
]);

beforeEach(() => {
  window.console.log("--------- new Test -------")
  angular.mock.module("app");
  angular.element(document).ready(() => {
    angular.bootstrap(document, [
      "app"
    ]);
  });
});

beforeEach(inject(function($controller, $rootScope) {
  scope = $rootScope.$new();
  createController = function() {
    return $controller('HomeController', {
      '$scope': scope
    });
  };
}));

describe("App", () => {
  describe("during initialization", () => {
    it("is has injector", () => {
      chai.assert(Resolver.module);
    });
  });
});
describe("Directive", () => {
  describe("during initialization", () => {

    it("is alive", () => {
      chai.assert(typeof HeaderDirective !== undefined)
    });
    it("is has injector", angular.mock.inject(function($compile, $rootScope) {
      var element = $compile('<div header=""></div>')($rootScope);
      $rootScope.$digest();
      // Check that the compiled element contains the templated content
      expect(element.html()).to.contain("<div> @directive works! </div>");
    }));

  });
});
describe("Controller", () => {
  describe("during initialization", () => {
    it("is alive", () => {
      chai.assert(typeof HomeController !== undefined)
    });
    it("is has injector", angular.mock.inject(function($compile, $rootScope) {
      $rootScope.$digest();
      var controller = createController();
      expect(scope.itworks).to.equal("@controller works!");
    }));
  });
});
