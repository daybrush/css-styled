import { Component } from "preact";
import { IObject } from "@daybrush/utils";

export interface StyledInterface<T = HTMLElement | SVGElement> extends Component<IObject<any>, IObject<any>> {
    getElement(): T;
}