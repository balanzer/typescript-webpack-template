import "../css/style.css";
import { Logger } from "./logger/logger";
import { createHeading } from "../greetings";

const heading = createHeading("Hello, World!");
document.body.appendChild(heading);

const logger = new Logger("AppLogger");
logger.info("Application started successfully.");

const apple = "a";
logger.log(apple);

var banana = "b";
logger.log(banana);
let cherry = "c";
logger.log(cherry);

if (cherry != null && cherry == banana) {
  logger.log("cherry is equal to banana");
}

const x: Array<string> = ["a", "b"];
const y: ReadonlyArray<string> = ["a", "b"];

if (false) {
  // @ts-ignore: Unreachable code error
  console.log("hello");
}
if (false) {
  /* @ts-ignore: Unreachable code error */
  console.log("hello");
}

const AppleMAN = "test";
