import "../css/style.css";
import { Logger } from "./logger/logger";
import { createHeading } from "./greetings";

const heading = createHeading("Hello, World!");
document.body.appendChild(heading);

const logger = new Logger("Main-App");
logger.debug("This is a debug message.");
