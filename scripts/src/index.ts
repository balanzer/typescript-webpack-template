import "../css/style.css";
import { Logger } from "./logger/logger";
import { DataStore } from "./store/state-manager/state-manager";

const logger = new Logger("Main-App");
logger.debug("This is a debug message.");

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

store.setState({ userName: "test" });
store.setState({ userName: "test123" });

unsc(); // Unsubscribe the second listener

const Aple = "test";
