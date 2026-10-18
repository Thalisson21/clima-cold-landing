import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

/**
 * Revela o elemento com fade/blur quando ele entra na viewport.
 * Uso: `<div appReveal>` ou `<div appReveal="150">` (atraso em ms).
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.is-visible]': 'visible()',
    '[style.--reveal-delay]': 'delay()',
  },
})
export class Reveal {
  readonly appReveal = input(0, { transform: (value: unknown) => numberAttribute(value, 0) });

  protected readonly visible = signal(false);
  protected readonly delay = computed(() => `${this.appReveal()}ms`);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible.set(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );

      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
