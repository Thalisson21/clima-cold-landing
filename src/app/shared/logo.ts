import { Component, input } from '@angular/core';

/** Marca provisória da Clima Cold (ícone + logotipo tipográfico). */
@Component({
  selector: 'app-logo',
  template: `
    <span class="mark" aria-hidden="true"><i class="ph ph-snowflake"></i></span>
    <span class="word">clima<span class="word-light">cold</span></span>
  `,
  host: {
    '[class.is-light]': "tone() === 'light'",
  },
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.625rem;
      color: var(--c-navy);
    }

    :host(.is-light) {
      color: var(--c-on-dark);
    }

    .mark {
      display: grid;
      place-items: center;
      width: 2.375rem;
      height: 2.375rem;
      border-radius: 0.75rem;
      background: linear-gradient(140deg, var(--c-navy-2), var(--c-navy) 60%);
      color: var(--c-ice);
      font-size: 1.375rem;
      box-shadow: inset 0 0 0 1px rgb(142 230 255 / 0.25);
      transition: transform 0.8s var(--ease-out);
    }

    :host(.is-light) .mark {
      background: var(--c-ice);
      color: var(--c-navy);
    }

    :host-context(a:hover) .mark {
      transform: rotate(60deg);
    }

    .word {
      font-size: 1.3125rem;
      font-weight: 700;
      letter-spacing: -0.04em;
    }

    .word-light {
      margin-left: 0.15em;
      font-weight: 400;
    }
  `,
})
export class Logo {
  readonly tone = input<'dark' | 'light'>('dark');
}
