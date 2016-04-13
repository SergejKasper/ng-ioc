/// <reference path="../typings/main/ambient/jquery/index.d.ts" />
/// <reference path="../typings/main/ambient/angular/index.d.ts" />

export function ngIOC (moduleString): Resolver {
  return new Resolver(moduleString);
};

export class Resolver implements IResolver {
  public static module: ng.IModule = angular.module("ngIOC", []);
  public bindModuleRoot: ng.IModule;
  public injector: any;
  public componentName;
  public bindModuleName;
  public componentNamespace;
  constructor(componentNamespace: string) {
    var nsArr = componentNamespace.split(".");
    this.componentName = nsArr.pop();
    this.bindModuleName = nsArr.join(".");
  }
  public directive(...values: any[]): any {
    return (target: ngIOCFunction) => {
      var directive:ng.IDirectiveFactory = this.decoratorBuilder(values, target);
      Resolver.module.directive(this.componentName, directive);
      target.componentName = this.componentName;
      return target;
    }
  }
  public service(...values: any[]): any {
    return (target: ngIOCFunction) => {
      Resolver.module.service(this.componentName, this.decoratorBuilder(values, target));
      target.componentName = this.componentName;
      return target;
    }
  }
  public controller(...values: any[]): any {
    return (target: ngIOCFunction) => {
      Resolver.module.controller(this.componentName, this.decoratorBuilder(values, target));
      target.componentName = this.componentName;
      return target;
    }
  }
  public run(...values: any[]): any {
    return (target: ngIOCFunction) => {
      Resolver.module.run(this.decoratorBuilder(values, target));
      target.componentName = this.componentName;
      return target;
    }
  }
  public config(...values: any[]): any {
    return (target: ngIOCFunction) => {
      Resolver.module.config(this.decoratorBuilder(values, target));
      target.componentName = this.componentName;
      return target;
    }
  }
  private decoratorBuilder (values: any[], target: Function):any {
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
            Can't inject an unknown dependency of ${this.componentName} on ${this.bindModuleName} dependency: ${JSON.stringify(dependency) } type: ${dependency.name}`);
        }
        var dependencyName = dependency.componentName;
        return dependencyName;
      }
      return dependency;
    });
    return comp;
  };
};
export interface ngIOCFunction extends Function {
  componentName: string;
  $inject: string[];
}
export interface ngIOCDirective extends ngIOCFunction, ng.IDirectiveFactory {

}
interface IResolver {
  directive(...values: any[]): any;
  service(...values: any[]): any;
}
