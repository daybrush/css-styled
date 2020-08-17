import * as React from "react";
import { IObject } from "@daybrush/utils";

export interface StyledInterface<T = HTMLElement | SVGElement> extends React.Component<IObject<any>> {
    getElement(): T;
}
