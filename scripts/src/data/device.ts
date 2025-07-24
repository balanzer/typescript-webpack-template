import { Logger } from "../logger/logger";
import { BaseData } from "./base-data";

export interface DeviceData {
  userAgent: string; // The full user agent string
  screenWidth: number; // Device screen width in pixels
  screenHeight: number; // Device screen height in pixels
  viewportWidth: number; // Browser viewport width in pixels
  viewportHeight: number; // Browser viewport height in pixels
  platform: string; // The operating system platform (e.g., "Win32", "MacIntel")
  orientation: string;
  viewport: string;
  [key: string]: any;
}

export class DataLayerDevice extends BaseData {
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
    function getBrowserPlatform(): string {
      // 1. Try User-Agent Client Hints (modern, preferred, but limited support)
      if (
        (navigator as any).userAgentData &&
        (navigator as any).userAgentData.platform
      ) {
        return (navigator as any).userAgentData.platform;
      }

      // 2. Fallback to navigator.platform (deprecated, but widely supported for now)
      if ((navigator as any).platform) {
        return (navigator as any).platform;
      }

      // 3. Fallback to parsing User-Agent string (least reliable, but broadly available)
      const userAgent = navigator.userAgent;
      if (userAgent.includes("Win")) {
        return "Windows";
      }
      if (userAgent.includes("Mac")) {
        return "macOS";
      }
      // Android devices often contain "Linux" in their UA, so check for Android first
      if (userAgent.includes("Android")) {
        return "Android";
      }
      if (userAgent.includes("Linux")) {
        return "Linux";
      }
      if (
        userAgent.includes("iPhone") ||
        userAgent.includes("iPad") ||
        userAgent.includes("iPod")
      ) {
        return "iOS"; // Covers all Apple mobile devices
      }

      return "unknown";
    }

    function getViewportSize(width: number): string {
      const breakpoints = {
        xs: 0, // Extra small (less than 576px)
        sm: 576, // Small (576px and up)
        md: 768, // Medium (768px and up)
        lg: 1200, // Large (1200px and up)
      };

      if (width >= breakpoints.lg) {
        return "large";
      } else if (width >= breakpoints.md) {
        return "medium";
      } else if (width >= breakpoints.sm) {
        return "small";
      }
      return "xsmall";
    }

    const viewportWidth =
      window.innerWidth | document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight | document.documentElement.clientHeight;

    return {
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: viewportWidth,
      viewportHeight: viewportHeight,
      platform: getBrowserPlatform(),
      orientation: viewportWidth > viewportHeight ? "landscape" : "portrait",
      viewport: getViewportSize(viewportWidth),
    };
  }

  /**
   * Gets the current device data object.
   * Returns a deep copy to prevent external modification.
   * @returns A copy of the DeviceData object.
   */
  public get(): DeviceData {
    this.logger.log("Getting device data:", this._data);
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
    const validationErrors: string[] = [];

    const data = this._data; // Use a local reference

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
        data[prop].trim() === "" ||
        data[prop].trim().toLowerCase() === "unknown"
      ) {
        const errorMessage = this.formatMessage(prop, "invalid", data[prop]);
        validationErrors.push(errorMessage);
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
        const errorMessage = this.formatMessage(prop, "invalid", data[prop]);
        validationErrors.push(errorMessage);
      }
    });

    return validationErrors;
  }
}
