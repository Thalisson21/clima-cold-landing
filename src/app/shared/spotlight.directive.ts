import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Expõe a posição do ponteiro como `--mx`/`--my` para criar um brilho
 * que acompanha o cursor (estilizado via CSS no componente).
 */
@Directive({
  selector: '[appSpotlight]',
  host: {
    '(pointermove)': 'track($event)',
  },
})
export class Spotlight {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected track(event: PointerEvent): void {
    const rect = this.element.getBoundingClientRect();
    this.element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.element.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
