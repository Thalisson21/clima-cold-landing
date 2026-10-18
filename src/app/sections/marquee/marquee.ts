import { Component } from '@angular/core';
import { MARQUEE } from '../../content/site-content';

/** Faixa de palavras-chave em rolagem contínua (decorativa; a lista acessível fica na seção de serviços). */
@Component({
  selector: 'app-marquee',
  template: `
    <div class="track" aria-hidden="true">
      @for (copy of copies; track copy) {
        <ul class="group">
          @for (item of items; track item) {
            <li><i class="ph ph-snowflake"></i>{{ item }}</li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      overflow: hidden;
      padding-block: 1.375rem;
      border-block: 1px solid var(--c-line);
      background: var(--c-surface);
      mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
    }

    .track {
      display: flex;
      width: max-content;
      animation: scroll 40s linear infinite;
    }

    :host(:hover) .track {
      animation-play-state: paused;
    }

    .group {
      display: flex;
      flex-shrink: 0;
    }

    li {
      display: inline-flex;
      align-items: center;
      gap: 1.5rem;
      padding-right: 1.5rem;
      font-size: clamp(1.125rem, 2.2vw, 1.5rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      color: var(--c-navy);
      white-space: nowrap;
    }

    .ph {
      font-size: 0.875em;
      color: var(--c-blue);
    }

    @keyframes scroll {
      to {
        transform: translateX(-50%);
      }
    }
  `,
})
export class Marquee {
  protected readonly items = MARQUEE;
  protected readonly copies = [0, 1];
}
