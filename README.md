# Angular JS Typescript Dependency Injection with annotations

## Why?

- Use all the goodies of Typescript-Classes for your Directives, Services, Controllers, Config-Blocks, Run-Blocks
- Manage your DI cleanly, easily and predictably in an es6-module environment
- Leverage all the advantages of angular-typings

## Important!

- This repo is in alpha state. Though the functionality works as described, the api is subject to change
- Config and Run-Blocks are executed multiple times on the module

## Examples

For a directive such as ```<my-directive>```:

```
import {ngIOC} from "bower_components/ng-ioc/src/ngIOC";
import MyService from "../myService";

@ngIOC("MyDirective").directive("$location", MyService)
export default class My implements ng.IDirective {
  public templateUrl:string = "mytemplate.html";
  ...
  constructor(private $location: ng.ILocationService, private myService: MyService) {
    //this.$location
  }
}
```
For a service, controller, config- or run-block the convention is the same (Facories and Providers coming soon):
```
...
@ngIOC("AppRun").run(LogService)
export default class BaseConfig {
  constructor(private logService: LogService) {
    logService.clog("we're up!");
  }
}

```
The Dependency-Resolver of ng-ioc needs to be declared as a dependency on your app like this:
```
import {Resolver} from "bower_components/ng-ioc/src/ngIOC";

angular.module("app", [
  Resolver.module.name
]);  
```

## Get started

Install through bower:

        bower install ng-ioc

Take a look at the section above and consider how stuff is included in the tests.



To see the example passing tests clone this project and run in the folder:

        npm install
        jspm dl-loader
        gulp build

##Thanks!
[b091's](https://github.com/b091) work on the [ts-skeleton](https://github.com/b091/ts-skeleton) was absolutely crucial for this repo to get going.
## Roadmap

- Extended ngModule support up soon
- Annotations for Providers and Factories are coming
- Better Testcoverage and app-example

## License

- License is MIT
