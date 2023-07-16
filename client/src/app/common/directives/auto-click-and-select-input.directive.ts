import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[appAutoClickAndSelectInput]',
    standalone: true
})
export class AutoClickAndSelectInputDirective implements OnInit {
    @Input() timeout: number = 100;
    @Input() isClickAndSelectWhenActive: boolean = true;

    constructor(private element: ElementRef) {
    }

    ngOnInit(): void {
        if (this.isClickAndSelectWhenActive) {
            this.clickAndSelectInput();
        }
    }

    clickAndSelectInput() {
        setTimeout(() => {
            const input = this.element.nativeElement.querySelector('input:not([type="hidden"]), textarea, select');
            if (input) {
                input.click();
                input.select();
            }
        }, this.timeout);
    }
}
