import { getHash, injectStyle, getShadowRoot } from "./utils";
import { StyledInjector } from "./types";

export default function styled(css: string): StyledInjector {
    const injectClassName = "rCS" + getHash(css);
    let injectCount = 0;
    let injectElement!: HTMLStyleElement;

    return {
        className: injectClassName,
        inject(el: HTMLElement | SVGElement) {
            const shadowRoot = getShadowRoot(el);
            const firstMount = injectCount === 0;
            let styleElement: HTMLStyleElement;

            if (shadowRoot || firstMount) {
                styleElement = injectStyle(injectClassName, css, shadowRoot);
            }
            if (firstMount) {
                injectElement = styleElement;
              }
            if (!shadowRoot) {
                ++injectCount;
            }
            return {
                destroy() {
                    if (shadowRoot) {
                        el.removeChild(styleElement);
                        styleElement = null;
                    } else {
                        if (injectCount > 0) {
                            --injectCount;
                        }
                        if (injectCount === 0 && injectElement) {
                            injectElement.parentNode!.removeChild(injectElement);
                            injectElement = null;
                        }
                    }
                },
            };
        },
    };
}

export * from "./types";
