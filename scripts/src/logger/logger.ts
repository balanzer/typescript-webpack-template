interface ILogger {
  log(message: string, ...args: any[]): void;
  logObjects(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export class Logger implements ILogger {
  private name: string;
  public constructor(name: string) {
    this.name = name;
  }
  private formatMessage(message: any, ...args: any[]): string {
    return `[${this.name}] ${message} ${args
      .map((arg) => JSON.stringify(arg))
      .join(" ")}`;
  }
  private formatName(message: any): string {
    return `[${this.name}] ${message}`;
  }
  public logObjects(message: any, ...args: any[]): void {
    const formattedMessage = this.formatName(message);
    console.log(formattedMessage, args);
  }
  public log(message: any, ...args: any[]): void {
    const formattedMessage = this.formatMessage(message, ...args);
    console.log(formattedMessage);
  }
  public info(message: any, ...args: any[]): void {
    const formattedMessage = this.formatMessage(message, ...args);
    console.info(formattedMessage);
  }

  public error(message: any, ...args: any[]): void {
    const formattedMessage = this.formatMessage(message, ...args);
    console.error(formattedMessage);
  }
}
