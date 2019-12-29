import { Component, createElement } from "react";
import { IObject } from "@daybrush/utils";
import { ref } from "framework-utils";
import cssStyled, { InjectResult } from "css-styled";


export default function styled<T extends HTMLElement | SVGElement = HTMLElement>(Tag: string, css: string) {
  const injector = cssStyled(css);

  return class Styled extends Component<IObject<any>> {
    public element!: T;
    public injectResult!: InjectResult | null;
    public render() {
      const {
        className = "",
        ...attributes
      } = this.props;

      return createElement(Tag, {
        ref: ref(this, "element"),
        className: `${className} ${injector.className}`,
        ...attributes,
      });
    }
    public componentDidMount() {
      this.injectResult = injector.inject(this.element);
    }
    public componentWillUnmount() {
      this.injectResult!.destroy();
      this.injectResult = null;
    }
    public getElement() {
      return this.element;
    }
  }
}