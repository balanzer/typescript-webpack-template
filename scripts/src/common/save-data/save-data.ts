import { Logger } from "../../logger/logger";

export class SaveDataBrowser {
  public static saveData(data: any): void {
    const logger = new Logger("save-data-browser");
    //logger.log("->->Data Layer<-<- :", data);
    logger.log("save data to browser");
    (window as any).dataLayer = data;
  }
}
