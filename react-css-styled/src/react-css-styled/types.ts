import * as React from "react";
import { IObject } from "@daybrush/utils";

export type StylerElement<T extends keyof JSX.IntrinsicElements>
    = JSX.IntrinsicElements[T] extends
        React.DetailedHTMLProps<React.HTMLAttributes<infer U>, infer U> | React.SVGProps<infer U>
    ? U : never;

export interface StylerInterface<T = HTMLElement | SVGElement> extends React.Component<IObject<any>> {
    getElement(): T;
}