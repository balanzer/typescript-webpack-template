export function createHeading(text: string): HTMLHeadingElement {
  const unusedVariable = "This variable is not used";
  const heading = document.createElement("h1");
  heading.textContent = text;
  return heading;
}
