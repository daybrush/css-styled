export interface StyledInjector {
    className: string;
    inject(el: HTMLElement): InjectResult;
}
export interface InjectResult {
    destroy(): void;
}
