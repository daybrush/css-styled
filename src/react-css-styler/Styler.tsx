import React from "react";

export default function styled(Tag: keyof JSX.IntrinsicElements = "div", css: string) {
  let injectClassName = "";
  let isInject = false;

  return class Styler extends React.Component<{
    [key: string]: any,
  }> {
    private isInject = false;
    constructor(props: any) {
      super(props);

      if (isInject === false) {
        isInject = true;
        this.isInject = true;
      }
    }
    public getInjectClassName() {
      return injectClassName;
    }
    public render() {
      const {
        className,
        ...attributes
      } = this.props;

      return <Tag {...attributes} />;
    }
    public componentWillUnmount() {
      if (this.isInject) 
    }
  }
}