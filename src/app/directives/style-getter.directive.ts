import { Directive, ElementRef, EventEmitter, OnInit, Input } from '@angular/core';

@Directive({
    selector: '[styleGetter]',
})

export class StyleGetter implements OnInit {
    @Input() styleGetter;
    constructor(public el: ElementRef) { }

    ngOnInit() {
        let styles = getComputedStyle(this.el.nativeElement);
        let posTop = (parseFloat(styles.top) + parseFloat(this.styleGetter));
        this.el.nativeElement.style.top = posTop + 'px';
    }
}