export interface CommonData {
  validationErrors: string[]; // Array to hold validation errors
}

export abstract class BaseData {
  protected abstract getDefaultValues(): any; // Abstract method, must be implemented by subclasses
  public abstract get(): any; // Abstract method, must be implemented by subclasses
  public abstract set(newData: Partial<any>): void;
  public abstract getDataErrors(): string[];

  // Helper for format message validation errors
  protected formatMessage = (
    property: string,
    message: string,
    value: any
  ): string => {
    const outputValue = `{${property}(${value})}-${message}`;
    return outputValue;
  };
}
