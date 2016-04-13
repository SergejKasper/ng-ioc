import {ngIOC} from "../../src/ngIOC";
import Data from "../components/data/DataService";

@ngIOC("BaseRun").run(Data)
export default class BaseConfig {
  constructor(private dataService: Data) {
    console.log("Run Block is run");
    dataService.calledIn("Run Block");
  }
}
