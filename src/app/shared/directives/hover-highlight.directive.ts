import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[AppHoverHighlight]'
})
export class HoverHighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#CCE4F6'); // Cambia el color cuando el mouse entra 48A088
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null); // Restablece el color de fondo cuando el mouse sale
  }

  private highlight(colorA: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', colorA);
  }
}

