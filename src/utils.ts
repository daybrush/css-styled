import stringHash from "string-hash";
import { splitComma } from "@daybrush/utils";

export function getHash(str: string) {
  return stringHash(str).toString(36);
}
export function getShadowRoot(parentElement: HTMLElement | SVGElement) {
    if (parentElement.getRootNode) {
        const rootNode = parentElement.getRootNode();

        if (rootNode.nodeType === 11) {
            return rootNode;
        }
    }
    return;
}
export function injectStyle(className: string, css: string, shadowRoot?: Node) {
  const style = document.createElement("style");

  style.setAttribute("type", "text/css");
  style.innerHTML = css.replace(/([^}{]*){/mg, (all, selector) => {
    return splitComma(selector).map(subSelector => {
      if (subSelector.indexOf(":global") > -1) {
        return subSelector.replace(/\:global/g, "");
      } else if (subSelector.indexOf(":host") > -1) {
        return `${subSelector.replace(/\:host/g, `.${className}`)}`;
      }
      return `.${className} ${subSelector}`;
    }).join(", ") + "{";
  });

  (shadowRoot || document.head || document.body).appendChild(style);
  return style;
}
