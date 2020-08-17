import { Component, createElement } from "react";
import { IObject } from "@daybrush/utils";
import { ref } from "framework-utils";
import cssStyled, { InjectResult } from "css-styled";

export default function styled<T extends HTMLElement | SVGElement = HTMLElement>(Tag: string, css: string) {
    const injector = cssStyled(css);

    return class Styled extends Component<IObject<any>> {
        public static injector = injector;
        public element!: T;
        public injectResult!: InjectResult | null;
        public render() {
            const {
                className = "",
                cspNonce,
                ...attributes
            } = this.props;
            const cssId = injector.className;
            return createElement(Tag, {
                "ref": ref(this, "element"),
                "data-styled-id": cssId,
                "className": `${className} ${cssId}`,
                ...attributes,
            });
        }
        public componentDidMount() {
            this.injectResult = injector.inject(this.element, {
                nonce: this.props.cspNonce,
            });
        }
        public componentWillUnmount() {
            this.injectResult!.destroy();
            this.injectResult = null;
        }
        public getElement() {
            return this.element;
        }
    };
}
