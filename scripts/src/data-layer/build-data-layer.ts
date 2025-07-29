import { DataSamples } from "../common/sample-json/test-data-import";
import { ObjectUtils } from "../common/utils/object-utils";
import { DeviceDataDetails } from "../data/device";
import { PageDataDetails } from "../data/page";
import { PrivacyDataDetails } from "../data/privacy";
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
  public processData(): void {
    const inputData = DataSamples.getHomePage();
    //this.logger.log("Input trackingJson Data :", inputData);

    // process data
    this.processDeviceData();
    this.processPrivacyData();
    this.processPageData(inputData);
  }

  /**
   * Processes and saves page data.
   */
  public processPageData(inputParamData: any = {}): void {
    const input = ObjectUtils.isNotEmpty(inputParamData) ? inputParamData : {};

    const pageData = new PageDataDetails();

    pageData.setProperty("type", input.applePage);

    pageData.setProperty("validationErrors", pageData.getDataErrors()); // data validation errors
    this.store.updatePageState(pageData.get());
  }
  public processDeviceData(): void {
    // save device data
    //device default data has all reqd properties
    //TODO - Read values from browser APIs

    const deviceData = new DeviceDataDetails();

    deviceData.setProperty("viewport", "");
    deviceData.setProperty("orientation", "");

    deviceData.setProperty("validationErrors", deviceData.getDataErrors()); // data validation errors
    this.store.updateDeviceState(deviceData.get());
  }
  public processPrivacyData(): void {
    // save privacy data
    //TODO - Read values from cookie
    const privacyData = new PrivacyDataDetails();

    privacyData.setProperty("notice_gdpr_prefs", ""); // Example value

    privacyData.setProperty("validationErrors", privacyData.getDataErrors()); // data validation errors
    this.store.updatePrivacyState(privacyData.get());
  }
}
