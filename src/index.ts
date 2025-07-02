import "./css/style.css";
import { Logger } from "./scripts/logger/logger";
import { createHeading } from "./greetings";

const heading = createHeading("Hello, World!");
document.body.appendChild(heading);

const logger = new Logger("AppLogger");
logger.info("Application started successfully.");

const apple = "a";
console.log(apple);

var banana = "b";
console.log(banana);
let cherry = "c";
console.log(cherry);

if (cherry == banana) {
  console.log("cherry is equal to banana");
}
