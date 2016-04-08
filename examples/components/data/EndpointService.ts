import ngDI from "../../../src/ngDI";

@ngDI("app.components.Endpoint").service()
export default class Endpoint {

  constructor() {
    console.log("loaded")
  }

  public baseUri: string = "http://localhost:3000/api/";

  public getUrl(moduleName: string): string {
    return this.baseUri + moduleName + ".json";
  }

  public getUrlForId(moduleName: string, id: number): string {
    return this.getUrl(moduleName) + "/" + id;
  }
}
