import {
    Directive, ElementRef, Input, OnChanges, Sanitizer, SecurityContext,
    SimpleChanges
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Sets the element's innerHTML to a sanitized version of [safeHtml]
@Directive({ selector: '[safeHtml]' })
export class HtmlDirective implements OnChanges {
    @Input() safeHtml: string;

    constructor(private elementRef: ElementRef, private sanitizer: Sanitizer, private _sanitizer: DomSanitizer) { }

    ngOnChanges(changes: SimpleChanges): any {
        if ('safeHtml' in changes) {
            this.elementRef.nativeElement.innerHTML =
                this._sanitizer.bypassSecurityTrustHtml(this.safeHtml);
        }
    }
}