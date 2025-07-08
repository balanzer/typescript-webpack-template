import "../css/style.css";
import { DataLayerDevice } from "./data/device";
import { Logger } from "./logger/logger";
import { DataStore } from "./store/state-manager/state-manager";

const logger = new Logger("Main-App");
logger.log("This is a debug message.");

//create store

const store = new DataStore();

// Subscribe to state changes
store.subscribe((state) => {
  logger.log("State changed:", state);
});

// Subscribe to state changes
const unsc = store.subscribe((state) => {
  logger.log("State changed 2 :", state);
});

const deviceTest = new DataLayerDevice();

const deviceData = deviceTest.get();

const stateUpdates = {
  device: deviceData,
};

store.setState(stateUpdates);

deviceTest.setProperty("platform", "Apple Updates");
const deviceData2 = deviceTest.get();
const stateUpdates2 = {
  device: deviceData2,
};
store.setState(stateUpdates2);
