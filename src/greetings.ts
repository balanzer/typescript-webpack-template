export function createHeading(text: string): HTMLHeadingElement {
  const heading = document.createElement("h1");
  heading.textContent = text;
  return heading;
}


