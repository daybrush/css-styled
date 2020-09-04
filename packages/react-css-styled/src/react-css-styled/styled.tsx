import cssStyled from "css-styled";
import { StyledElement } from "./StyledElement";

export default function styled<T extends HTMLElement | SVGElement = HTMLElement>(
    tag: string, css: string): typeof StyledElement & (new (...args: any[]) => StyledElement<T>) {
    const injector = cssStyled(css);

    return class Styled extends StyledElement<T> {
        public injector = injector;
        public tag = tag;
    };
}
