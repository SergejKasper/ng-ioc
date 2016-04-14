/// <reference path="../typings/main/ambient/jquery/index.d.ts" />
/// <reference path="../typings/main/ambient/angular/index.d.ts" />
"use strict";
export function ngIOC(moduleString): Resolver {
  return /*() => { return */ new Resolver(moduleString) /*}*/;
};

abstract class AbstractResolver {
    private static defaultModule: ng.IModule = angular.module("ngIOC", []);
    protected static modules: { [key:string]: {ngModule: ng.IModule, onLoad?: Function[] }} = {"ngIOC": {"ngModule": AbstractResolver.defaultModule, "onLoad":[]}};
    public static registerModule(name: string, ngModule?: ng.IModule):string {
      var ngModule = ngModule || angular.module(name, []);
      var IOCModulePrefix = ngModule.name;
      var IOCmodule =  AbstractResolver.modules[IOCModulePrefix];
      if(!IOCmodule) IOCmodule = AbstractResolver.modules[IOCModulePrefix] = {ngModule : ngModule};
      IOCmodule.ngModule = ngModule;
      if(IOCmodule.onLoad)IOCmodule.onLoad.forEach((registerWhenLoaded) => { registerWhenLoaded();});
      return ngModule.name;
    }
}

export class Resolver extends AbstractResolver {
  public componentName;
  private bindModuleName;
  constructor(componentNamespace: string) {
    super();
    var nsArr: any[] = componentNamespace.split(".");
    this.componentName = nsArr.pop();
    this.bindModuleName = nsArr.join(".") || "ngIOC";
    /*if(!AbstractResolver.modules.hasOwnProperty(bindModuleName)){
      console.error(`no such module registered: ${bindModuleName} !
        Use Resolver.registerModule(module:ngModule)`);
    }*/
    if(!AbstractResolver.modules[this.bindModuleName]){
      AbstractResolver.modules[this.bindModuleName] = {ngModule: null, onLoad: []};
    }
  }
  private registerComponent(values, target, registerAs){
    var createComponentWith = [this.componentName, this.decoratorBuilder(values, target)]
    if(registerAs === "run" || registerAs === "config" ) createComponentWith.shift();
    if(this.getCurrentModule().ngModule){
      this.getCurrentModule().ngModule[registerAs].apply(this, createComponentWith);
    } else {
      this.getCurrentModule().onLoad.push(() => this.getCurrentModule().ngModule[registerAs].apply(this, createComponentWith))
    }
    target.componentName = this.componentName;
    return target;
  }
  public directive(...values: any[]): any {
      return (target: ngIOCFunction) => this.registerComponent(values, target, "directive");
  }
  public service(...values: any[]): any {
    return (target: ngIOCFunction) => this.registerComponent(values, target, "service");
  }
  public controller(...values: any[]): any {
    return (target: ngIOCFunction) => this.registerComponent(values, target, "controller");
  }
  public run(...values: any[]): any {
      return (target: ngIOCFunction) => this.registerComponent(values, target, "run");
  }
  public config(...values: any[]): any {
      return (target: ngIOCFunction) => this.registerComponent(values, target, "config");
  }
  private decoratorBuilder(values: any[], target: Function): any {
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
      if (typeof dependency === "undefined") return;
      if (typeof dependency === "function") {
        //this will enable us to properly assign the dependencies to the class properties
        if (!dependency.componentName) {
          console.error(`Function-Dependencies can only be injected if they are annotated Annotation.
            Can't inject an unknown dependency of ${this.componentName} on ${this.bindModuleName}
            dependency: ${JSON.stringify(dependency) } type: ${dependency.name}`);
        }
        var dependencyName = dependency.componentName;
        return dependencyName;
      }
      return dependency;
    });
    return comp;
  }
  private getCurrentModule(){
    return AbstractResolver.modules[this.bindModuleName];
  }
};
export interface ngIOCFunction extends Function {
  componentName: string;
  $inject: string[];
}
