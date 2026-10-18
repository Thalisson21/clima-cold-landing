import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../core/whatsapp.service';
import { FINAL_CTA } from '../../content/site-content';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-final-cta',
  imports: [Reveal],
  template: `
    <section id="contato" class="section" aria-labelledby="cta-title">
      <div class="container">
        <div class="panel on-dark" appReveal>
          <span class="aurora" aria-hidden="true"></span>
          <span class="snow" aria-hidden="true"><i class="ph ph-snowflake"></i></span>

          <p class="eyebrow">{{ content.eyebrow }}</p>
          <h2 id="cta-title" class="title">{{ content.title }}</h2>
          <p class="section-lead">{{ content.description }}</p>
          <a class="btn btn--accent" [href]="url" target="_blank" rel="noopener noreferrer">
            <i class="ph ph-whatsapp-logo" aria-hidden="true"></i>
            {{ content.button }}
            <span class="visually-hidden">(abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .panel {
      position: relative;
      isolation: isolate;
      display: grid;
      justify-items: center;
      gap: 1.25rem;
      padding: clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem);
      border-radius: var(--radius-lg);
      background: var(--c-navy);
      color: var(--c-on-dark);
      text-align: center;
      overflow: hidden;
    }

    .aurora {
      position: absolute;
      inset: -50%;
      z-index: -1;
      background: conic-gradient(
        from 0deg at 50% 50%,
        transparent 0deg,
        rgb(142 230 255 / 0.28) 60deg,
        transparent 120deg,
        rgb(29 111 216 / 0.4) 200deg,
        transparent 280deg
      );
      filter: blur(60px);
      animation: spin 18s linear infinite;
    }

    .snow {
      position: absolute;
      right: -2.5rem;
      top: -2.5rem;
      z-index: -1;
      font-size: 14rem;
      line-height: 1;
      color: rgb(142 230 255 / 0.07);
      animation: spin 60s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(1turn);
      }
    }

    .title {
      max-width: 40rem;
      font-size: clamp(2rem, 5vw, 3.5rem);
    }

    .section-lead {
      max-width: 34rem;
    }

    .btn {
      margin-top: 0.75rem;
    }
  `,
})
export class FinalCta {
  protected readonly content = FINAL_CTA;
  protected readonly url = inject(WhatsappService).contactUrl(FINAL_CTA.context);
}
