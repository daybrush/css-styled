import stringHash from "string-hash";
import { splitComma } from "@daybrush/utils";
import { InjectOptions } from "./types";

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
export function injectStyle(className: string, css: string, options: Partial<InjectOptions>, shadowRoot?: Node) {
    const style = document.createElement("style");

    style.setAttribute("type", "text/css");
    style.setAttribute("data-styled-id", className);

    if (options.nonce) {
        style.setAttribute("nonce", options.nonce);
    }
    let styleCSS = css;
    if (!options.original) {
        styleCSS = css.replace(/([^}{]*){/mg, (all, selector) => {
            return splitComma(selector).map(subSelector => {
                if (subSelector.indexOf(":global") > -1) {
                    return subSelector.replace(/\:global/g, "");
                } else if (subSelector.indexOf(":host") > -1) {
                    return `${subSelector.replace(/\:host/g, `.${className}`)}`;
                }
                return `.${className} ${subSelector}`;
            }).join(", ") + "{";
        });
    }
    style.innerHTML = styleCSS;

    (shadowRoot || document.head || document.body).appendChild(style);
    return style;
}
