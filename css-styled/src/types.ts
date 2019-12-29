export interface StyledInjector {
    className: string;
    inject(el: HTMLElement): {
        destroy(): void;
    };
}
