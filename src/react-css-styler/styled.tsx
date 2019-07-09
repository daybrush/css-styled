import React from "react";
import ReactDOM from "react-dom";
import { getHash, injectStyle } from "./utils";
import { StylerElement } from "./types";

export default function styled(Tag: keyof JSX.IntrinsicElements = "div", css: string) {
  const injectClassName = "rCS" + getHash(css);
  let injectCount = 0;
  let injectElement!: HTMLStyleElement;

  return class Styler extends React.Component<{
    [key: string]: any,
  }> {
    public element!: StylerElement<typeof Tag>;
    constructor(props: any) {
      super(props);
    }
    public render() {
      const {
        className,
        ...attributes
      } = this.props;

      return <Tag className={className + " " + injectClassName} {...attributes} />;
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
    public getElement(): StylerElement<typeof Tag> {
        return this.element || (this.element = ReactDOM.findDOMNode(this) as StylerElement<typeof Tag>);
    }
  }
}