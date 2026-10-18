import { Component } from '@angular/core';
import { TESTIMONIALS } from '../../content/site-content';
import { Reveal } from '../../shared/reveal.directive';
import { Spotlight } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-testimonials',
  imports: [Reveal, Spotlight],
  template: `
    <section id="depoimentos" class="section" aria-labelledby="testimonials-title">
      <div class="container">
        <header class="section-head section-head--center">
          <p class="eyebrow" appReveal>Depoimentos</p>
          <h2 id="testimonials-title" class="section-title" appReveal="80">
            O que dizem nossos clientes.
          </h2>
          <p appReveal="160">
            <span class="placeholder-badge">
              <i class="ph ph-info" aria-hidden="true"></i> Exemplos ilustrativos — aguardando
              depoimentos reais
            </span>
          </p>
        </header>

        <ul class="grid">
          @for (item of testimonials; track $index; let i = $index) {
            <li [appReveal]="i * 140">
              <figure class="card" appSpotlight>
                <i class="ph-fill ph-quotes quote-icon" aria-hidden="true"></i>
                <blockquote class="quote">
                  <p>{{ item.quote }}</p>
                </blockquote>
                <figcaption class="author">
                  <span class="avatar" aria-hidden="true"><i class="ph ph-user"></i></span>
                  <span>
                    <strong class="author-name">{{ item.author }}</strong>
                    <span class="author-company">{{ item.company }}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .section {
      background: var(--c-surface);
    }

    .grid {
      display: grid;
      gap: 1.25rem;
      max-width: 62rem;
      margin-inline: auto;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .card {
      position: relative;
      isolation: isolate;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      height: 100%;
      margin: 0;
      padding: clamp(1.75rem, 4vw, 2.5rem);
      border: 1px solid var(--c-line);
      border-radius: var(--radius-lg);
      background: var(--c-bg);
      overflow: hidden;
      transition:
        transform 0.6s var(--ease-out),
        box-shadow 0.6s var(--ease-out);

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: radial-gradient(
          20rem circle at var(--mx, 50%) var(--my, 0%),
          rgb(142 230 255 / 0.3),
          transparent 60%
        );
        opacity: 0;
        transition: opacity 0.5s ease;
      }

      &:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-lg);

        &::before {
          opacity: 1;
        }

        .quote-icon {
          transform: translateY(-4px) rotate(-6deg);
        }
      }
    }

    .quote-icon {
      font-size: 2.5rem;
      color: var(--c-blue);
      transition: transform 0.6s var(--ease-out);
    }

    .quote {
      flex: 1;
      font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
      line-height: 1.55;
      color: var(--c-ink);
    }

    .author {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      padding-top: 1.25rem;
      border-top: 1px solid var(--c-line);
    }

    .avatar {
      display: grid;
      place-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: var(--c-navy);
      color: var(--c-ice);
      font-size: 1.25rem;
    }

    .author-name {
      display: block;
      color: var(--c-navy);
    }

    .author-company {
      font-size: 0.875rem;
      color: var(--c-muted);
    }
  `,
})
export class Testimonials {
  protected readonly testimonials = TESTIMONIALS;
}
