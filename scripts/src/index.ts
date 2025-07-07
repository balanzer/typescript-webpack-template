import "../css/style.css";
import { Logger } from "./logger/logger";
import { createHeading } from "./greetings";
import { DataStore } from "./data/state-manager/state-manager";

const heading = createHeading("Hello, World!");
document.body.appendChild(heading);

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
