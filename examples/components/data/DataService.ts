import Endpoint from "./EndpointService";
import {ngIOC} from "../../../src/ngIOC";

@ngIOC("app.components.Data").service(Endpoint)
export default class DataService {
  private static referers: string[] = [];
  constructor(private endpointService: Endpoint) {
    console.log("Is the Endpoint Service loaded: " + endpointService.isLoaded());
  }
  public calledIn(referer: string) {
    DataService.referers.push(referer);
    console.log("DataService called in: " + DataService.referers.join(" | "));
  }

}
