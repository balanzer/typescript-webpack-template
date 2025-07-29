import { DeviceData, DeviceDataDetails } from "../../data/device";
import { Logger } from "../../logger/logger";
import { SaveDataBrowser } from "../../common/save-data/save-data";
import { PrivacyData, PrivacyDataDetails } from "../../data/privacy";
import { PageData, PageDataDetails } from "../../data/page";

// Define the shape of your application data state
interface DataState {
  device: DeviceData;
  page: PageData;
  privacy: PrivacyData;
}

enum StateSection {
  all = "all",
  device = "device",
  page = "page",
  privacy = "privacy",
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
