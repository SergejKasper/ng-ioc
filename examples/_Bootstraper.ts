
import * as angular from "angular";
import {ngIOC} from "../src/ngIOC";

export default (()=>{
  let app = angular.module('app',
  ['app.components',"app.views"].map((mod:string)=>{angular.module(mod, []); return mod;})
  .concat(
  [/*"ui.router",
  "ngAnimate",
  "ngCookies",
  "ngMessages",
  "ngResource"*/]));
  ngIOC.angular = angular;
  ngIOC.defaultModule = app;
  return app;
})();
