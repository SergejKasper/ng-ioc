import {ngIOC} from "../../../src/ngIOC";
import Data from "../../components/data/DataService";

@ngIOC("app.HomeController").controller("$scope", Data)
export default class HomeController {
   controllerAs: "HomeController";
   constructor(private $scope: any, dataService: Data) {
     $scope.itworks = '@controller works!';
     dataService.calledIn("HomeController");
   }
}
