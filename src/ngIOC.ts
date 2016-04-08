export abstract class ngIOC{
  public static defaultModule: ng.IModule = angular.module("ngIOC", []);
  public static modules: ng.IModule[] = [];
  public static angular: any;
  public static bindModule(module?:string):ng.IModule{
     return ngIOC.defaultModule;
  }
};
