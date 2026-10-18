import { Service } from '@angular/core';
import { COMPANY, WHATSAPP } from '../content/site-content';

/** Gera links `wa.me` com mensagens pré-preenchidas. */
@Service()
export class WhatsappService {
  readonly defaultUrl = this.build(WHATSAPP.defaultMessage);

  contactUrl(context: string): string {
    return this.build(WHATSAPP.contextMessage(context));
  }

  private build(message: string): string {
    return `https://wa.me/${COMPANY.phone}?text=${encodeURIComponent(message)}`;
  }
}
