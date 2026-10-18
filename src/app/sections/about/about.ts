import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { WhatsappService } from '../../core/whatsapp.service';
import { ABOUT } from '../../content/site-content';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, Reveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly content = ABOUT;
  protected readonly contactUrl = inject(WhatsappService).contactUrl('os serviços da Clima Cold');
}
