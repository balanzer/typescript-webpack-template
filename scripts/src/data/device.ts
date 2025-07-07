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

export class DataLayerDevice {
  private _data: DeviceData;

  public constructor(initialData?: Partial<DeviceData>) {
    this._data = this.getDefaultDeviceData();

    // Merge any initial data provided by the user
    if (initialData) {
      this.set(initialData);
    }
  }

  /**
   * Provides default values for device properties.
   */
  private getDefaultDeviceData(): DeviceData {
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
}
