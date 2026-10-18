import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../core/whatsapp.service';
import { SERVICES } from '../../content/site-content';
import { Reveal } from '../../shared/reveal.directive';
import { Spotlight } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-services',
  imports: [Reveal, Spotlight],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private readonly whatsapp = inject(WhatsappService);

  protected readonly services = SERVICES.map((service, index) => ({
    ...service,
    number: String(index + 1).padStart(2, '0'),
    url: this.whatsapp.contactUrl(service.context),
  }));
}
