import { DataLayerDevice, DeviceData } from "../../data/device";
import { Logger } from "../../logger/logger";
import { SaveDataBrowser } from "../../utils/save-data";

// Define the shape of your application data state
interface DataState {
  device: DeviceData;
  myAppData: any;
}

// Define the type for a listener function
// It receives the current state as an argument
type StateListener = (state: DataState) => void;

// Define the initial state

const initalDeviceData = new DataLayerDevice();

const DEFAULT_INITIAL_STATE: DataState = {
  myAppData: { appName: "local-test", version: "1.0.12" },
  device: initalDeviceData.get(),
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
    this.logger.log("Store initialized with state:", this.state);
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
  public setState(newState: Partial<DataState>): void {
    const oldState = { ...this.state }; // Capture old state before update
    this.state = { ...this.state, ...newState }; // Merge new state
    this.logger.log("State updated:", oldState, " -> ", this.state);
    this.publish(); // Notify all listeners
  }

  /**
   * Subscribe a listener function to state changes.
   * @param listener The function to be called when state changes.
   * @returns A function to unsubscribe the listener.
   */
  public subscribe(listener: StateListener): () => void {
    this.listeners.push(listener);
    this.logger.log(
      "Listener subscribed. Total listeners:",
      this.listeners.length
    );

    // Return an unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
      this.logger.log(
        "Listener unsubscribed. Total listeners:",
        this.listeners.length
      );
    };
  }

  /**
   * Notify all subscribed listeners with the current state.
   * This is a private method, called internally by setState.
   */
  private publish(): void {
    //save data to browser
    SaveDataBrowser.saveData(this.getState());
    // Call each listener with the *current* state
    this.listeners.forEach((listener) => {
      try {
        listener(this.getState()); // Pass a copy of the state
      } catch (error) {
        this.logger.error("Error in state listener:", error);
      }
    });
  }
}
