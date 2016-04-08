/// <reference path="../typings/main/ambient/jquery/index.d.ts" />
/// <reference path="../typings/main/ambient/angular/index.d.ts" />
import {ngIOC} from "./ngIOC";
//export namespace ngDI {
class ngDI extends ngIOC implements IngDI {
  public bindModule: ng.IModule;
  public bindModuleRoot: ng.IModule;
  public injector: any;
  public componentName;
  public bindModuleName;
  public componentNamespace;
  constructor(componentNamespace: string) {
    super();
    var nsArr = componentNamespace.split(".");
    this.componentName = nsArr.pop();
    this.bindModuleName = nsArr.join(".");
    this.bindModule = ngIOC.bindModule(); //angular.module(this.bindModuleName);
  }
  public directive = (...values: any[]): any => {
    var decorated = (target: Function) => {
      return this.decoratorBuilder(values, target, INJECT_TYPE.Directive);
    }
    return decorated;
  };
  public service = (...values: any[]): any => {
    var decorated = (target: Function) => {
      return this.decoratorBuilder(values, target, INJECT_TYPE.Service);
    }
    return decorated;
  };
  private decoratorBuilder = (values: any[], target, injectType: INJECT_TYPE) => {
    const comp: Function = (...args: any[]): Object => {
      return ((classConstructor: Function, args: any[], ctor: any): Object => {
        ctor.prototype = classConstructor.prototype;
        ctor.componentName = this.componentName;
        const child: Object = new ctor;
        const result: Object = classConstructor.apply(child, args);
        return typeof result === "object" ? result : child;
      })(target, args, () => {
        return null;
      });
    };
    comp.$inject = values.map((dependency, index) => {
      if(typeof dependency === "undefined") return;
      if(typeof dependency === "function") {
        //this will enable us to properly assign the dependencies to the class properties
        if(!dependency.componentName) {
          console.error(`Function-Dependencies can only be injected if they are annotated Annotation.
            Can't inject an unknown dependency of ${this.componentName} on ${this.bindModuleName} dependency: ${JSON.stringify(dependency)} type: ${dependency.name}`);
        }
        var dependencyName = dependency.componentName;
        //if(!this.injector.has(dependencyName)){ throw `missing dependency ${dependencyName}`;} ;
        return dependencyName;
      }
      return dependency;
    });
    this.bindModule[injectType](this.componentName, comp);
    console.log(`registered ${this.componentName} on ${this.bindModuleName} as ${injectType}`)
    target.componentName = this.componentName;
    return target;
  };
  private static getInjectedName = function getName(inputClass) {
    var funcNameRegex = /function (.{1,})\(/,
      results = (funcNameRegex).exec((<any> inputClass).prototype.constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
  };
};
/*export class Configurator {
  constructor() { }
  public setDefaultModule = function setDefaultModule(module: ng.IModule) {
    ngDI.defaultModule = module;
  }
};*/
interface IngDI {
  directive(...values: any[]): any;
  service(...values: any[]): any;
}
enum INJECT_TYPE {
  Directive = <any>"directive",
  Service = <any>"service",
  Controller = <any>"controller",
}

export default (moduleString) => {return new ngDI(moduleString)};
//}
