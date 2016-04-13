# Angular JS Typescript Dependency Injection with annotations

## Why?

- Use all the goodies of Typescript-Classes for your Directives, Services, Controllers, Config-Blocks, Run-Blocks
- Manage your DI cleanly, easily and predictably in an es6-module environment
- Leverage all the advantages of angular-typings

## Important!

- This repo is in beta state, stuff works mostly though api changes

## Examples

For a directive such as ```<my-directive>```:

```
//

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

@ngIOC("AppRun").run(LogService)
export default class BaseConfig {
  constructor(private logService: LogService) {
    logService.clog("we're up!");
  }
}

```

## Get started

Install through bower:

        bower install ng-ioc

Take a look at the example folder and see how stuff is included in the tests.


To see the example passing tests clone this project and run in the folder:

        npm install
        jspm dl-loader
        gulp build

## Roadmap

- Extended ngModule support up soon.
- Annotations for Providers and Factories.
- Better Testcoverage and app-example

## License

- License is MIT
