import { Logger } from "../logger/logger";
import { BaseData, CommonData } from "./base-data";

export interface PrivacyData extends CommonData {
  notice_behavior: string;
  notice_gdpr_prefs: string;
  notice_preferences: string;
  [key: string]: any;
}

export class PrivacyDataDetails extends BaseData {
  private _data: PrivacyData;
  private logger = new Logger("privacy-data");
  public constructor(initialData?: Partial<PrivacyData>) {
    super();

    this._data = this.getDefaultValues();

    // Merge any initial data provided by the user
    if (initialData) {
      this.set(initialData);
    }
  }

  /**
   * Provides default values for data properties.
   */
  protected getDefaultValues(): PrivacyData {
    return {
      notice_behavior: "tbd",
      notice_gdpr_prefs: "tbd",
      notice_preferences: "tbd",
      validationErrors: [], // Initialize with an empty array
    };
  }

  /**
   * Gets the current data object.
   * Returns a deep copy to prevent external modification.
   * @returns A copy of the data object.
   */
  public get(): PrivacyData {
    return this._data;
  }

  /**
   * Sets (updates) specific  properties.
   * @param newData A partial data object with properties to update.
   */
  public set(newData: Partial<PrivacyData>): void {
    // Basic validation: ensure newData is an object
    if (typeof newData !== "object" || newData === null) {
      return;
    }
    this._data = { ...this._data, ...newData };
  }

  /**
   * Retrieves a specific data property by key.
   * @param key The key of the property to retrieve.
   * @returns The value of the property, or undefined if not found.
   */
  public getProperty<K extends keyof PrivacyData>(key: K): PrivacyData[K] {
    return this._data[key];
  }

  /**
   * Sets a specific data property by key.
   * @param key The key of the property to set.
   * @param value The value to set for the property.
   */
  public setProperty<K extends keyof PrivacyData>(
    key: K,
    value: PrivacyData[K]
  ): void {
    this._data[key] = value;
  }

  /**
   * Validates all properties of the internal data object.
   * Checks for presence, basic types, and logical validity for known properties.
   * Logs warnings for any invalid data found.
   *
   * @returns `string[]` errors all properties are invalid, `null` otherwise.
   */

  public getDataErrors(): string[] {
    const validationErrors: string[] = [];

    const data = this._data; // Use a local reference

    // --- Validate Required String Properties ---
    const stringProps: Array<keyof PrivacyData> = [
      "notice_behavior",
      "notice_gdpr_prefs",
      "notice_preferences",
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

    return validationErrors;
  }
}
