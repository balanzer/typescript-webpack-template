import { BuildDataLayer } from "../data-layer/build-data-layer";
import { Logger } from "../logger/logger";

export class CollectData {
  public static collectInputJson(): void {
    const logger = new Logger("collect-data");

    /**
     * Add a text area to collect trackingJson input
     * and a button to save the data.
     */

    const textArea = document.createElement("textarea");
    textArea.id = "trackingJson";
    textArea.placeholder =
      "copy and paste application trackingJson data here...";
    textArea.style.width = "100%";
    textArea.style.height = "200px";
    document.body.appendChild(textArea);

    /**
     * processButton to process the trackingJson data
     */

    const processButton = document.createElement("button");
    processButton.textContent = "Process Tracking Data";
    processButton.onclick = (): void => {
      const trackingJson = textArea.value;
      if (trackingJson) {
        try {
          const parsedData = JSON.parse(trackingJson);

          const buildData = new BuildDataLayer();
          buildData.processApplicationData(parsedData);

          //logger.log("Processed Tracking Data:", parsedData);
        } catch (error) {
          logger.error("Failed to parse trackingJson data:", error);
        }
      } else {
        logger.log("No trackingJson data provided.");
      }
    };
    document.body.appendChild(processButton);
  }
}
