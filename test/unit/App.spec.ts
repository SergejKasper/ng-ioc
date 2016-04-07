///// <reference path="../references.ts" />
import {App} from "../../examples/App";
import {ngIOC} from "../../src/ngIOC";
import {HeaderDirective} from "../../examples/components/header/Header.controller";

describe("App", () => {
  describe("during initialization", () => {
    it("is alive", () => {
      chai.assert(typeof App !== undefined)
    });
    it("is has injector", () => {
        chai.assert(ngIOC.defaultModule === angular.module("app"))
    });
  });
});
/*describe("Directive", () => {
  beforeEach(inject(function($compile, $rootScope){
    $compile('<div header="{{is Loaded}}"></div>', $rootScope.$new());
  }))
  describe("during initialization", () => {
    it("is alive", () => {
      chai.assert(typeof HeaderDirective !== undefined)
    });
    //it("is has injector", () => {
    //    chai.assert(HeaderDirective.isLoaded);
    //});
  });
});*/
