import { Logger } from "../../logger/logger";

export class SaveDataBrowser {
  public static saveData(data: any): void {
    const logger = new Logger("save-data-browser");
    logger.log("Saving data :", data);
    (window as any).myAppData = data;
  }
}
