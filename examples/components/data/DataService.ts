import Endpoint from "./EndpointService";
import {ngIOC} from "../../../src/ngIOC";

@ngIOC("components.data.Data").service(Endpoint)
export default class DataService {
  private referers: string[] = [];
  constructor(private endpointService: Endpoint) {
    console.log("Is the Endpoint Service loaded: " + endpointService.isLoaded());
  }
  public calledIn(referer: string) {
    this.referers.push(referer);
    console.log("DataService called in: " + this.referers.join(" | "));
  }

}
