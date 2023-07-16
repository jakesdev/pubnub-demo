import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAutoFocusInput]',
    standalone: true
})
export class AutoFocusInputDirective implements OnInit {
    private _isEnableFocus: boolean = false;

    @Input() inputOrder: number = 1;
    @Input() timeout: number = 500;

    @Input()
    get isEnableFocus(): boolean {
        return this._isEnableFocus;
    }

    set isEnableFocus(value: boolean) {
        this._isEnableFocus = value;
        // enable focus anytime
        if (value) {
            this.focusInput();
        }
    }

    @Input() isFocusWhenActive: boolean = true;
    @Input() isClickEnabled: boolean = false;

    constructor(private element: ElementRef) {
    }

    ngOnInit(): void {
        // default focus when Component is active
        if (this.isFocusWhenActive) {
            this.focusInput();
        }
    }

    focusInput() {
        setTimeout(() => {
            const inputs = this.element.nativeElement.querySelectorAll('input:not([type="hidden"]), textarea, select');
            if (inputs.length) {
                let inputIndex = this.inputOrder - 1;
                if (inputIndex < 0) {
                    inputIndex = 0;
                }
                inputs[inputIndex].focus();
                //
                if (this.isClickEnabled) {
                    inputs[inputIndex].click();
                }
            }
        }, this.timeout);
    }
}
