interface ILogger {
  log(message: string, ...args: any[]): void;
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
  public log(message: any, ...args: any[]): void {
    const formattedMessage = this.formatName(message);

    if (!!args) {
      if (args.length === 0) {
        console.log(formattedMessage);
      } else if (args.length === 1) {
        console.log(formattedMessage, args[0]);
      } else if (args.length === 2) {
        console.log(formattedMessage, args[0], args[1]);
      } else {
        console.log(formattedMessage, args);
      }
    } else {
      console.log(formattedMessage, args);
    }
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
