import { Component } from "react-simple-compat";
import { IObject } from "@daybrush/utils";
import { StyledInjector, InjectResult } from "css-styled";
export declare class StyledElement<T extends HTMLElement | SVGElement> extends Component<IObject<any>> {
    injector: StyledInjector;
    element: T;
    injectResult: InjectResult | null;
    tag: string;
    render(): any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getElement(): T;
}


export default function styled<T extends HTMLElement | SVGElement = HTMLElement>(tag: string, css: string): typeof StyledElement & (new (...args: any[]) => StyledElement<T>);
