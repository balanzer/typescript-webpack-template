import { Logger } from "../logger/logger";

interface DeviceData {
  userAgent: string; // The full user agent string
  screenWidth: number; // Device screen width in pixels
  screenHeight: number; // Device screen height in pixels
  viewportWidth: number; // Browser viewport width in pixels
  viewportHeight: number; // Browser viewport height in pixels
  platform: string; // The operating system platform (e.g., "Win32", "MacIntel")
  orientation: "portrait" | "landscape" | "unknown";
  viewport: "xsmall" | "large" | "small" | "media" | "unknown";
  [key: string]: any;
}

abstract class DeviceDataBase {
  protected abstract getDefaultValues(): any; // Abstract method, must be implemented by subclasses
  public abstract get(): any; // Abstract method, must be implemented by subclasses
  public abstract set(newData: Partial<any>): void;
  public abstract validateAndCollectErrors(): string[];
}

export class DataLayerDevice extends DeviceDataBase {
  private _data: DeviceData;
  private logger = new Logger("device-data");
  public constructor(initialData?: Partial<DeviceData>) {
    super();

    this._data = this.getDefaultValues();

    // Merge any initial data provided by the user
    if (initialData) {
      this.set(initialData);
    }
  }

  /**
   * Provides default values for device properties.
   */
  protected getDefaultValues(): DeviceData {
    return {
      userAgent: "unknown",
      screenWidth: 0,
      screenHeight: 0,
      viewportWidth: 0,
      viewportHeight: 0,
      platform: "unknown",
      orientation: "unknown",
      viewport: "unknown",
    };
  }

  /**
   * Gets the current device data object.
   * Returns a deep copy to prevent external modification.
   * @returns A copy of the DeviceData object.
   */
  public get(): DeviceData {
    return JSON.parse(JSON.stringify(this._data));
  }

  /**
   * Sets (updates) specific device properties.
   * @param newData A partial DeviceData object with properties to update.
   */
  public set(newData: Partial<DeviceData>): void {
    // Basic validation: ensure newData is an object
    if (typeof newData !== "object" || newData === null) {
      return;
    }
    this._data = { ...this._data, ...newData };
  }

  /**
   * Retrieves a specific device property by key.
   * @param key The key of the property to retrieve.
   * @returns The value of the property, or undefined if not found.
   */
  public getProperty<K extends keyof DeviceData>(key: K): DeviceData[K] {
    return this._data[key];
  }

  /**
   * Sets a specific device property by key.
   * @param key The key of the property to set.
   * @param value The value to set for the property.
   */
  public setProperty<K extends keyof DeviceData>(
    key: K,
    value: DeviceData[K]
  ): void {
    this._data[key] = value;
  }

  /**
   * Validates all properties of the internal DeviceData object.
   * Checks for presence, basic types, and logical validity for known properties.
   * Logs warnings for any invalid data found.
   *
   * @returns `string[]` errors all properties are invalid, `null` otherwise.
   */

  public validateAndCollectErrors(): string[] {
    const data = this._data; // Use a local reference

    // Helper for logging validation errors
    const logInvalid = (
      property: string,
      message: string,
      value: any
    ): void => {
      this.logger.log(
        `Invalid property "${property}": ${message}. Value: ${JSON.stringify(
          value
        )}`
      );
    };

    // --- Validate Required String Properties ---
    const stringProps: Array<keyof DeviceData> = [
      "userAgent",
      "platform",
      "viewport",
      "orientation",
    ];
    stringProps.forEach((prop: any): void => {
      if (
        typeof prop !== "string" ||
        typeof data[prop] !== "string" ||
        data[prop].trim() === ""
      ) {
        logInvalid(prop, "Expected a non-empty string.", data[prop]);
      }
    });

    // --- Validate Numeric Properties ---
    const numericProps: Array<keyof DeviceData> = [
      "screenWidth",
      "screenHeight",
      "viewportWidth",
      "viewportHeight",
    ];
    numericProps.forEach((prop: any) => {
      if (
        typeof prop !== "string" ||
        typeof data[prop] !== "number" ||
        data[prop] <= 0 ||
        isNaN(data[prop])
      ) {
        logInvalid(prop, "Expected a non-negative number.", data[prop]);
      }
    });

    const errors: string[] = ["123"];

    return errors;
  }
}
