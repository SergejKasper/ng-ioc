import Endpoint from "./EndpointService";
import ngDI from "../../../src/ngDI";

@ngDI("app.components.Data").service(Endpoint)
export default class DataService {

  constructor(private endpointService: Endpoint) {
    console.log("Log URI: " + endpointService.baseUri);
  }
  public sayHallo() {
    console.log("Hey!");
  }

}
