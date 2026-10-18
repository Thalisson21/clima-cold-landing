import { Component, DOCUMENT, afterNextRender, inject, signal } from '@angular/core';
import { WhatsappService } from '../../core/whatsapp.service';

/** Botão flutuante do WhatsApp — aparece quando o vídeo do hero sai de cena. */
@Component({
  selector: 'app-whatsapp-fab',
  template: `
    <a
      class="fab"
      [href]="url"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale com a Clima Cold pelo WhatsApp (abre em nova aba)"
      [attr.tabindex]="visible() ? null : -1"
    >
      <span class="ring" aria-hidden="true"></span>
      <i class="ph-fill ph-whatsapp-logo" aria-hidden="true"></i>
    </a>
  `,
  host: {
    '[class.is-visible]': 'visible()',
    '(window:scroll)': 'onScroll()',
  },
  styles: `
    :host {
      position: fixed;
      right: max(1rem, env(safe-area-inset-right));
      bottom: max(1rem, env(safe-area-inset-bottom));
      z-index: 90;
      opacity: 0;
      visibility: hidden;
      transform: translateY(1.5rem) scale(0.8);
      transition:
        opacity 0.5s var(--ease-out),
        transform 0.6s var(--ease-out),
        visibility 0s linear 0.6s;
    }

    :host(.is-visible) {
      opacity: 1;
      visibility: visible;
      transform: none;
      transition-delay: 0s;
    }

    .fab {
      position: relative;
      display: grid;
      place-items: center;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background: #1f7a4c;
      color: #fff;
      font-size: 1.875rem;
      box-shadow: 0 14px 30px -10px rgb(11 37 64 / 0.5);
      transition: transform 0.4s var(--ease-out);

      &:hover {
        transform: scale(1.08) rotate(-6deg);
      }

      &:focus-visible {
        outline-offset: 4px;
        border-radius: 50%;
      }
    }

    .ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid #25d366;
      animation: ping 2.4s var(--ease-out) infinite;
    }

    @keyframes ping {
      from {
        opacity: 0.8;
        transform: scale(1);
      }

      to {
        opacity: 0;
        transform: scale(1.7);
      }
    }

    @media (min-width: 768px) {
      :host {
        right: 1.75rem;
        bottom: 1.75rem;
      }

      .fab {
        width: 3.75rem;
        height: 3.75rem;
      }
    }
  `,
})
export class WhatsappFab {
  protected readonly url = inject(WhatsappService).defaultUrl;
  protected readonly visible = signal(false);
  private readonly document = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => this.onScroll());
  }

  protected onScroll(): void {
    const hero = this.document.getElementById('inicio');
    const threshold = this.document.defaultView!.innerHeight * 0.6;
    this.visible.set(!hero || hero.getBoundingClientRect().bottom < threshold);
  }
}
