//import {Log} from "../../src/log";
import {ngIOC} from "../../../src/ngIOC";
import Data from "../data/DataService";

@ngIOC("header").directive("$location", "$rootScope", Data)
export default class Header implements ng.IDirective {
  public template = "<div> @directive works! </div>";
  //TODO: Mock HttpBackendService for templateUrl
  //public templateUrl:string = "src/components/header/header.html";
  public restrict: string = "EA";
  public scope: Object = {
    //header: "="
  };
  public isLoaded: boolean = false;
  public componentName;
  public link: Function = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes): void => {
    console.info('Header Directive loaded with Element:' + element);
    scope.$watch("test", () => {
      return null;
    });
  };
  constructor(private $location: ng.ILocationService, $rootScope: ng.IRootScopeService, dataService: Data) {
    dataService.calledIn("Header Directive");
  }
}
