import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';
@Directive({
  selector: '[Tooltip]',
  standalone: true
})
export class TooltipDirective implements OnInit {
  @Input() tooltip: string = '';
  @Input() placement: any = 'top';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    new Tooltip(this.el.nativeElement, {
      title: this.tooltip,
      placement: this.placement,
    });
  }
}
