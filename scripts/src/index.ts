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

let appleToSell;

function sellApple(appleToSell: string | undefined): number {
  if (appleToSell) {
    logger.log("Selling apple: " + appleToSell);
  } else {
    logger.warn("No apple to sell");
  }
  if (true) {
    return 0;
    console.log("This will never be executed");
  }
}

const stringBuilderExample: boolean = false;
