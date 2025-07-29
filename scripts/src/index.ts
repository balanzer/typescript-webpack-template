import "../css/style.css";
import { CollectData } from "./common/collect-data";
import { BuildDataLayer } from "./data-layer/build-data-layer";
import { Logger } from "./logger/logger";

const logger = new Logger("Data-App");

/**
 * for local development, process sample data
 * This will be replaced with actual data processing in production.
 */
const buildData = new BuildDataLayer();
buildData.processSampleData();
logger.log("Data Layer initialized and processed successfully.");
logger.log("dataLayer :", (window as any).dataLayer);

/**
 * collect and generate data layer from input
 */

CollectData.collectInputJson();
