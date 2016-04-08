//import {Log} from "../../src/log";
import ngDI from "../../../src/ngDI";
import Data from "../data/DataService";

//@Log()
@ngDI("app.components.Header")().directive("$location", "$rootScope", Data)
export default class Header implements ng.IDirective {

  //public templateUrl:string = "src/components/header/header.html";
  public template = "<div> @directive works </div>";
  public restrict:string = "EA";
  public scope:Object = {
   //header: "="
  };
  public isLoaded:boolean = false;

  public link:Function = (scope:ng.IScope, element:ng.IAugmentedJQuery, attrs:ng.IAttributes):void => {
    // console.info(scope, element, attrs, this.$location);
    scope.$watch("test", () => {
      return null;
    });
  };
  constructor($location:ng.ILocationService, $rootScope: ng.IRootScopeService, dataService:Data){ //

    //
    dataService.sayHallo();
    //this.isLoaded = true;
  }
}
