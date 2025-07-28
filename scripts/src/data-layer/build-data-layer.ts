import { PageDataDetails } from "../data/page";
import { Logger } from "../logger/logger";
import { DataStore } from "../store/state-manager/state-manager";

export class BuildDataLayer {
  private logger = new Logger("build-data");
  //create store
  private store = new DataStore();
  public constructor() {
    this.logger.log("BuildDataLayer initialized.");

    // Subscribe to state changes
    this.store.subscribe((state) => {
      //anon function, replace with feature function later
      this.logger.log("State changed from subscriber 1:", state);
    });

    // Subscribe to state changes
    // const unsc = store.subscribe() // Example of unsubscribing
    this.store.subscribe((state) => {
      //anon function, replace with feature function later
      this.logger.log("State changed from subscriber 2 :", state);
    });
    // Example of unsubscribing
    //unsc.unsubscribe(); // Unsubscribe from the second subscriber
  }
  public buildData(): void {
    // save device data
    //device default data has all reqd properties

    // save privacy data
    //TODO - Read values from cookie

    //save page data
    const pageData = new PageDataDetails();
    pageData.setProperty("type", location.pathname);
    pageData.setProperty("title", document.title);
    pageData.setProperty("url", location.href);
    this.store.updatePageState(pageData, true);
  }
}
