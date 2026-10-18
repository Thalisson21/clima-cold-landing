import { Component, inject } from '@angular/core';
import { WhatsappService } from '../../core/whatsapp.service';
import { COMPANY, NAV_LINKS } from '../../content/site-content';
import { Logo } from '../../shared/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly company = COMPANY;
  protected readonly links = NAV_LINKS;
  protected readonly whatsappUrl = inject(WhatsappService).defaultUrl;
  protected readonly year = new Date().getFullYear();
}
