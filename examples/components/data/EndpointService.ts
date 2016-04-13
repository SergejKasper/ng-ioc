import {ngIOC} from "../../../src/ngIOC";

@ngIOC("Endpoint").service()
export default class Endpoint {

  private loaded = false;
  constructor() {
    this.loaded = true;
  }
  public isLoaded() {
    return this.loaded;
  }
}
