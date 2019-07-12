import { Component } from "preact";
import { IObject } from "@daybrush/utils";

export interface StylerInterface extends JSX.ElementClass {
    props: IObject<any>;
    getElement(): HTMLElement | SVGElement;
}