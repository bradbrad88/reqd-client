export const measureDomNode = (
  node: HTMLElement,
  enhanceMeasurableNode = (e: HTMLElement) => e
) => {
  const container = document.createElement("div");

  container.setAttribute(
    "style",
    "display: inline-block; position: absolute; visibility: hidden; z-index: -1;"
  );
  const clonedNode = node?.cloneNode(true) as HTMLElement;
  const content = enhanceMeasurableNode(clonedNode);

  container.appendChild(content);

  node.parentElement!.appendChild(container);

  const height = container.clientHeight;
  const width = container.clientWidth;

  container.parentNode!.removeChild(container);
  return { height, width };
};
