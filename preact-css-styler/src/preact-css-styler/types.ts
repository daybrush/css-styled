import { Component } from "preact";
import { IObject } from "@daybrush/utils";

export interface StylerInterface extends Component<IObject<any>> {
    getElement(): HTMLElement | SVGElement;
}