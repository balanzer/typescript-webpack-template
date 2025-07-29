import { DataSamples } from "../common/sample-json/test-data-import";
import { ObjectUtils } from "../common/utils/object-utils";
import { DeviceDataDetails } from "../data/device";
import { PageDataDetails } from "../data/page";
import { PrivacyDataDetails } from "../data/privacy";
import { Logger } from "../logger/logger";
import { DataStore } from "../store/state-manager/state-manager";

/**
 * The BuildDataLayer class is responsible for building the data layer
 * by processing device, privacy, and page data.
 * It initializes a data store and subscribes to state changes.
 */
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

  public processSampleData(): void {
    const inputData = DataSamples.getHomePage();
    this.processApplicationData(inputData);
  }

  /**
   * Processes and saves the data layer.
   * This method collects input data, processes device, privacy, and page data,
   * and updates the respective states in the store.
   *
   */
  public processApplicationData(inputData: any = {}): void {
    this.logger.log("Input trackingJson data :", inputData);

    // process data
    this.processDeviceData();
    this.processPrivacyData();
    this.processPageData(inputData);
    /**
     * send data-ready event to notify that the data layer is ready
     * This can be used by other components to trigger actions
     */
    this.store.publishEvent("data-ready");
  }

  /**
   *  Processes and saves page data.
   *  This method initializes a PageDataDetails object,
   *  sets properties like type and validationErrors,
   *  and updates the page state in the store.
   *  It uses the inputParamData parameter to set the page type.
   * @param inputParamData
   */
  public processPageData(inputParamData: any = {}): void {
    const input = ObjectUtils.isNotEmpty(inputParamData) ? inputParamData : {};

    const pageData = new PageDataDetails();

    pageData.setProperty("type", input.applePage);

    pageData.setProperty("validationErrors", pageData.getDataErrors()); // data validation errors
    this.store.updatePageState(pageData.get());
  }
  /**
   * Processes and saves device data.
   * This method initializes a DeviceDataDetails object,
   * sets properties like viewport and orientation,
   * and updates the device state in the store.
   * It also includes a placeholder for reading values from browser APIs.
   * The validation errors are collected and set in the device data.
   */
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

  /**
   * Processes and saves privacy data.
   * This method initializes a PrivacyDataDetails object,
   * sets properties like notice_gdpr_prefs, and validationErrors,
   * and updates the privacy state in the store.
   * It includes a placeholder for reading values from cookies.
   * The validation errors are collected and set in the privacy data.
   */
  public processPrivacyData(): void {
    // save privacy data
    //TODO - Read values from cookie
    const privacyData = new PrivacyDataDetails();

    privacyData.setProperty("notice_gdpr_prefs", ""); // Example value

    privacyData.setProperty("validationErrors", privacyData.getDataErrors()); // data validation errors
    this.store.updatePrivacyState(privacyData.get());
  }
}
