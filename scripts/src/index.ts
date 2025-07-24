import "../css/style.css";
import { DeviceDataDetails } from "./data/device";
import { Logger } from "./logger/logger";
import { DataStore } from "./store/state-manager/state-manager";

const logger = new Logger("Main-App");
logger.log("This is a debug message.");

//create store

const store = new DataStore();

// Subscribe to state changes
store.subscribe((state) => {
  logger.log("State changed from subscribe 1:", state);
});

// Subscribe to state changes
const unsc = store.subscribe((state) => {
  logger.log("State changed from subscribe 2 :", state);
});

const deviceTest = new DeviceDataDetails();

deviceTest.setProperty("orientation", "My Device");
deviceTest.setProperty("battery", "100%");

const deviceDataToSave = deviceTest.get();

logger.log("Updated Device data :", deviceDataToSave);

store.updateDeviceState(deviceDataToSave);

/*
const stateUpdates1 = {
  device: deviceData,
};
logger.log("Device state saving :", deviceData);
store.setDevice(stateUpdates1);
*/
