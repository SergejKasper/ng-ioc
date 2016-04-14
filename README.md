# Angular JS Typescript Dependency Injection with annotations

## Why?

- Use all the goodies of Typescript-Classes for your Directives, Services, Controllers, Config-Blocks, Run-Blocks
- Manage your DI cleanly, easily and predictably in an es6-module environment
- Lazyload dependencies on multiple modules with ease
- Leverage all the advantages of angular-typings

## Important!

- This repo is in alpha state. Though the functionality works as described, the api is subject to change
- Config and Run-Blocks are executed multiple times on the module

## Get started

Install through bower:

        bower install ng-ioc

Take a look at the section below (or consider how stuff is included in the tests and in the ```example``` subfolder).

## Examples

For a directive such as ```<my-directive>```:

```js
import {ngIOC} from "bower_components/ng-ioc/src/ngIOC";
import MyService from "../myService";

@ngIOC("app.components.MyDirective").directive("$location", MyService)
export default class My implements ng.IDirective {
  public templateUrl:string = "mytemplate.html";
  ...
  constructor(private $location: ng.ILocationService, private myService: MyService) {
    //this.$location
  }
}
```
For a service, controller, config- or run-block the convention is the same (Facories and Providers coming soon):
```js

@ngIOC("app.services.AppRun").run(LogService)
export default class BaseConfig {
  constructor(private logService: LogService) {
    logService.clog("we're up!");
  }
}

```
The Dependency-Resolver of ng-ioc needs to be declared as a dependency on your app like this:
```js
import {Resolver} from "bower_components/ng-ioc/src/ngIOC";

angular.module("app", [
  Resolver.registerModule("app.components"), // creates and decorates corresponding angular.module
  Resolver.registerModule("app.services", myServiceMockModule) //uses existing angular.module
 ]);  
```

##Contribute

To develop on the project and see the example passing tests clone it, ```cd``` in there and run:

        npm install
        jspm dl-loader
        gulp build

##Thanks!
[b091's](https://github.com/b091) work on the [ts-skeleton](https://github.com/b091/ts-skeleton) was absolutely crucial for this repo to get going.
## Roadmap

- Extended ngModule support up soon <span style="color: green"> DONE! </span>
- Annotations for Providers and Factories are coming
- Better Testcoverage and app-example

## License

- License is MIT
