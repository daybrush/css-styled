import { Component } from "preact";
import { IObject } from "@daybrush/utils";

export interface StylerInterface<T = HTMLElement | SVGElement> extends Component<IObject<any>, IObject<any>> {
    getElement(): T;
}