import { Component } from '@angular/core';
import { RESULTS } from '../../content/site-content';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-results',
  imports: [Reveal],
  template: `
    <section id="resultados" class="section on-dark" aria-labelledby="results-title">
      <span class="glow" aria-hidden="true"></span>
      <div class="container">
        <header class="section-head section-head--center">
          <p class="eyebrow" appReveal>Resultados</p>
          <h2 id="results-title" class="section-title" appReveal="80">
            Números que refletem a nossa dedicação.
          </h2>
          <p class="note" appReveal="160">
            <i class="ph ph-info" aria-hidden="true"></i>
            Indicadores provisórios — serão substituídos por dados verificáveis.
          </p>
        </header>

        <dl class="grid">
          @for (result of results; track result.label; let i = $index) {
            <div class="item" [appReveal]="i * 120">
              <dt class="label">{{ result.label }}</dt>
              <dd class="value">{{ result.value }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
  styles: `
    .section {
      isolation: isolate;
      overflow: hidden;
      background: var(--c-navy);
      color: var(--c-on-dark);
    }

    .glow {
      position: absolute;
      inset: auto -20% -60% -20%;
      z-index: -1;
      height: 80%;
      background: radial-gradient(ellipse at center, rgb(142 230 255 / 0.22), transparent 65%);
      animation: breathe 8s var(--ease-in-out) infinite alternate;
    }

    @keyframes breathe {
      to {
        opacity: 0.5;
        transform: scale(1.1);
      }
    }

    .note {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.875rem;
      border: 1px dashed rgb(142 230 255 / 0.5);
      border-radius: 999px;
      font-size: 0.8125rem;
      color: var(--c-ice);
    }

    .grid {
      display: grid;
      margin: 0;

      @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .item {
      display: flex;
      flex-direction: column-reverse;
      gap: 0.5rem;
      padding: 2rem 1rem;
      text-align: center;
      border-top: 1px solid rgb(255 255 255 / 0.12);

      @media (min-width: 768px) {
        border-top: 0;
        border-left: 1px solid rgb(255 255 255 / 0.12);

        &:first-child {
          border-left: 0;
        }
      }
    }

    .value {
      margin: 0;
      font-size: clamp(2.75rem, 6vw, 4.25rem);
      font-weight: 700;
      line-height: 1;
      letter-spacing: -0.04em;
      background: linear-gradient(180deg, #fff 30%, var(--c-ice));
      background-clip: text;
      color: transparent;
    }

    .label {
      color: var(--c-on-dark-muted);
      font-weight: 500;
    }
  `,
})
export class Results {
  protected readonly results = RESULTS;
}
