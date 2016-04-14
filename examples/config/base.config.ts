import {ngIOC} from "../../src/ngIOC";
import Data from "../components/data/DataService";

/*TODO: Support Provider, Constant and Factory annotations*/
@ngIOC("views.BaseConfig").config("$windowProvider")
export default class BaseConfig {
  constructor(private $windowProvider: ng.IWindowService) {
    $windowProvider.$get().console.log("$windowProvider logs: Config Block is run");

    /*$routeProvider
      .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainCtrl'
    }).otherwise({
      redirectTo: '/'
    });*/
  }
}
