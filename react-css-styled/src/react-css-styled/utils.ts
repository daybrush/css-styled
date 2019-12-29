import stringHash from "string-hash";
import { splitComma } from "@daybrush/utils";

export function getHash(str: string) {
  return stringHash(str).toString(36);
}
export function injectStyle(className: string, css: string) {
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

  (document.head || document.body).appendChild(style);
  return style;
}