export interface StyledInjector {
    className: string;
    inject(el: HTMLElement | SVGElement): InjectResult;
}
export interface InjectResult {
    destroy(): void;
}
