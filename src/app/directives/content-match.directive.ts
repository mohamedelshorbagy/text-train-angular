import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
    selector: '[appContentMatch]'
})
export class ContentMatchDirective implements OnInit {
    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnInit() {
        this.renderer.setStyle(this.el.nativeElement, 'width', this.el.nativeElement.getBoundingClientRect().width + 'px');
    }

}