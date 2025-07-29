import "../css/style.css";
import { BuildDataLayer } from "./data-layer/build-data-layer";
import { Logger } from "./logger/logger";

const logger = new Logger("Data-App");

const buildData = new BuildDataLayer();

buildData.processData();

logger.log("Data :", (window as any).appData);
