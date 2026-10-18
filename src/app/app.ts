import { Component } from '@angular/core';
import { Header } from './sections/header/header';
import { Hero } from './sections/hero/hero';
import { Marquee } from './sections/marquee/marquee';
import { Services } from './sections/services/services';
import { About } from './sections/about/about';
import { Results } from './sections/results/results';
import { Team } from './sections/team/team';
import { Testimonials } from './sections/testimonials/testimonials';
import { FinalCta } from './sections/final-cta/final-cta';
import { Footer } from './sections/footer/footer';
import { WhatsappFab } from './sections/whatsapp-fab/whatsapp-fab';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Marquee,
    Services,
    About,
    Results,
    Team,
    Testimonials,
    FinalCta,
    Footer,
    WhatsappFab,
  ],
  template: `
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <app-header />
    <main id="conteudo" tabindex="-1">
      <app-hero />
      <app-marquee />
      <app-services />
      <app-about />
      <app-results />
      <app-team />
      <app-testimonials />
      <app-final-cta />
    </main>
    <app-footer />
    <app-whatsapp-fab />
  `,
  styleUrl: './app.scss',
})
export class App {}
