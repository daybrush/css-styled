import React from "react";

export type StylerElement<T extends keyof JSX.IntrinsicElements>
    = JSX.IntrinsicElements[T] extends
        React.DetailedHTMLProps<React.HTMLAttributes<infer U>, infer U> | React.SVGProps<infer U>
    ? U : never;

export interface StylerInterface<T = HTMLElement | SVGElement> {
    getElement(): T;
}