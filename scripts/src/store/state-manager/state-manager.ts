import { DeviceData, DeviceDataDetails } from "../../data/device";
import { Logger } from "../../logger/logger";
import { SaveDataBrowser } from "../../common/save-data/save-data";
import { PrivacyData, PrivacyDataDetails } from "../../data/privacy";
import { PageData, PageDataDetails } from "../../data/page";
import { ArrayUtils } from "../../common/utils/array-utils";

// Define the shape of your application data state
interface DataState {
  device: DeviceData;
  page: PageData;
  privacy: PrivacyData;
  user: any; // Placeholder for user data, can be defined later
  errors: any; // Placeholder for error data, can be defined later
  marketing: any; // Placeholder for marketing data, can be defined later
  search: any; // Placeholder for search data, can be defined later
  hotelDetails: any; // Placeholder for hotel details data, can be defined later
  roomAndRates: any; // Placeholder for room and rates data, can be defined later
  cart: any; // Placeholder for cart data, can be defined later
  transaction: any; // Placeholder for transaction data, can be defined later
  validationErrors: string[]; // Optional array for validation errors
}

enum StateSection {
  all = "all",
  device = "device",
  page = "page",
  privacy = "privacy",
  user = "user",
  errors = "errors",
  marketing = "marketing",
  search = "search",
  hotelDetails = "hotelDetails",
  roomAndRates = "roomAndRates",
  cart = "cart",
  transaction = "transaction",
}

// Define the type for a listener function
// It receives the current state as an argument
//type StateListener = (state: DataState) => void; //this is for entire state
type StateListener = (state: any) => void; //this is for event message

// Define the initial state

const initalDeviceData = new DeviceDataDetails();
const initalPageData = new PageDataDetails();
const initalPrivacyData = new PrivacyDataDetails();

const DEFAULT_INITIAL_STATE: DataState = {
  device: initalDeviceData.get(),
  page: initalPageData.get(),
  privacy: initalPrivacyData.get(),
  user: {},
  errors: {},
  marketing: {},
  search: {},
  hotelDetails: {},
  roomAndRates: {},
  cart: {},
  transaction: {},
  validationErrors: [], // Initialize with an empty array
};

/**
 * Data store state management store with publisher-subscriber pattern.
 */
export class DataStore {
  private state: DataState;
  private listeners: StateListener[] = [];
  private logger = new Logger("save-data");

  public constructor(initialState: DataState = DEFAULT_INITIAL_STATE) {
    this.state = { ...initialState }; // Initialize state with a copy
    //this.logger.log("Store initialized with state:", this.state);
  }

  /**
   * Get the current state.
   * @returns The current AppState.
   */
  public getState(): DataState {
    return { ...this.state }; // Return a copy to prevent direct modification
  }

  /**
   * Update the state and notify all listeners.
   * Merges the new partial state with the current state.
   * @param newState A partial DataState object to merge.
   */
  private setState(newState: Partial<DataState>): void {
    const oldState = { ...this.state }; // Capture old state before update
    this.state = { ...this.state, ...newState }; // Merge new state
    this.logger.log("State updated:", oldState, " -> ", this.state);
    this.saveDataAndPublish(StateSection.all); // Notify all listeners
  }

  /**
   * Update device section of the state and notify all listeners.
   * Merges the new partial state with the current state.
   * @param newState A partial DataState object to merge.
   */
  public updateDeviceState(
    newState: Partial<DeviceData>,
    notifyListeners: boolean = false
  ): void {
    const oldState = { ...this.state.device }; //get old state before update
    this.state.device = { ...this.state.device, ...newState }; // Merge new state
    this.logger.log(
      "Device State updated:",
      oldState,
      " -> ",
      this.state.device
    );
    this.saveDataAndPublish(StateSection.device, notifyListeners); // Notify all listeners if reqd
  }

  /**
   * Update page section of the state and notify all listeners.
   * Merges the new partial state with the current state.
   * @param newState A partial DataState object to merge.
   */
  public updatePageState(
    newState: Partial<PageData>,
    notifyListeners: boolean = false
  ): void {
    const oldState = { ...this.state.page }; //get old state before update
    this.state.page = { ...this.state.page, ...newState };
    this.logger.log("Page State updated:", oldState, " -> ", this.state.page);
    this.saveDataAndPublish(StateSection.page, notifyListeners);
  }

  /**
   * Update privacy section of the state and notify all listeners.
   * Merges the new partial state with the current state.
   * @param newState A partial DataState object to merge.
   */
  public updatePrivacyState(
    newState: Partial<PrivacyData>,
    notifyListeners: boolean = false
  ): void {
    const oldState = { ...this.state.page }; //get old state before update
    this.state.privacy = { ...this.state.privacy, ...newState };
    this.logger.log(
      "Privacy State updated:",
      oldState,
      " -> ",
      this.state.privacy
    );
    this.saveDataAndPublish(StateSection.privacy, notifyListeners);
  }
  /**
   * Update validation error state.
   * Merges the new validation errors with the current state.
   * @param validationErrors
   */
  public updateValidationErrorState(newState: string[]): void {
    const oldState = this.state.validationErrors; //get old state and merge if reqd

    if (ArrayUtils.isEmpty(oldState)) {
      this.state.validationErrors = [...newState];
    } else {
      this.state.validationErrors = ArrayUtils.unique([
        ...oldState,
        ...newState,
      ]);
    }
    //const mergedState = oldState.concat(newState);
    // this.state.dataLayerErrors = { ...mergedState };
  }

  /**
   * Subscribe a listener function to state changes.
   * @param listener The function to be called when state changes.
   * @returns A function to unsubscribe the listener.
   */
  public subscribe(listener: StateListener): () => void {
    this.listeners.push(listener);
    /**
    this.logger.log(
      "Listener subscribed. Total listeners:",
      this.listeners.length
    ); */

    // Return an unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
      this.logger.log(
        "Listener unsubscribed. Total listeners:",
        this.listeners.length
      );
    };
  }

  public publishEvent(
    message: string,
    sectionGotUpdated: StateSection = StateSection.all
  ): void {
    // Call each listener
    this.listeners.forEach((listener) => {
      try {
        const eventMessage = {
          message: message,
          section: sectionGotUpdated,
        };
        listener(eventMessage); // event message
      } catch (error) {
        this.logger.error("Error in state listener:", error);
      }
    });
  }

  /**
   * Notify all subscribed listeners with the current state.
   * This is a private method, called internally by setState.
   */
  private saveDataAndPublish(
    sectionGotUpdated: StateSection,
    notifyListeners: boolean = false
  ): void {
    //save data to browser
    SaveDataBrowser.saveData(this.getState());
    // Call each listener
    if (notifyListeners === true) {
      this.publishEvent("data-updated", sectionGotUpdated);
    }
  }
}
