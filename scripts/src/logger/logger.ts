interface ILogger {
  debug(message: string, ...args: any[]): void;
  log(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export class Logger implements ILogger {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  private formatMessage(message: string, ...args: any[]): string {
    return `[${this.name}] ${message} ${args
      .map((arg) => JSON.stringify(arg))
      .join(" ")}`;
  }
  debug(message: string, ...args: any[]): void {
    const formattedMessage = this.formatMessage(message, ...args);
    console.debug(formattedMessage);
  }
  log(message: string, ...args: any[]): void {
    const formattedMessage = this.formatMessage(message, ...args);
    console.info(formattedMessage);
  }
  info(message: string, ...args: any[]): void {
    const formattedMessage = this.formatMessage(message, ...args);
    console.info(formattedMessage);
  }

  warn(message: string, ...args: any[]): void {
    const formattedMessage = this.formatMessage(message, ...args);
    console.warn(formattedMessage);
  }

  error(message: string, ...args: any[]): void {
    const formattedMessage = this.formatMessage(message, ...args);
    console.error(formattedMessage);
  }
}
