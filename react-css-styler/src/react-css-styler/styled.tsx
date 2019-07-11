import { Component, createElement } from "react";
import { findDOMNode } from "react-dom";
import { getHash, injectStyle } from "./utils";
import { StylerElement } from "./types";

export default function styled<T extends keyof JSX.IntrinsicElements = "div">(Tag: T, css: string) {
  const injectClassName = "rCS" + getHash(css);
  let injectCount = 0;
  let injectElement!: HTMLStyleElement;

  return class Styler extends Component<{
    [key: string]: any,
  }> {
    public element!: StylerElement<T>;
    constructor(props: any) {
      super(props);
    }
    public render() {
      const {
        className,
        ...attributes
      } = this.props;

      return createElement(Tag, {
        className: `${className} ${injectClassName}`,
        ...attributes,
      });
    }
    public componentDidMount() {
      if (injectCount === 0) {
        injectElement = injectStyle(injectClassName, css);
      }
      ++injectCount;
    }
    public componentWillUnmount() {
      --injectCount;

      if (injectCount === 0 && injectElement) {
        injectElement.parentNode!.removeChild(injectElement);
      }
    }
    public getElement() {
      return this.element || (this.element = findDOMNode(this) as StylerElement<T>);
    }
  }
}