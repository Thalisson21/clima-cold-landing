import {
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { WhatsappService } from '../../core/whatsapp.service';
import { HERO } from '../../content/site-content';
import { HeroMedia } from './hero-media';

/**
 * Hero com rolagem coreografada: o vídeo ocupa a tela e, conforme o usuário
 * rola, o conteúdo surge por cima dele. O progresso (0–1) é exposto como `--p`
 * e cada elemento define no CSS a faixa em que aparece.
 */
@Component({
  selector: 'app-hero',
  imports: [HeroMedia],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly content = HERO;
  protected readonly words = HERO.title.split(' ');
  protected readonly whatsappUrl = inject(WhatsappService).defaultUrl;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly window = inject(DOCUMENT).defaultView!;
  private target = 0;
  private current = 0;
  private frame = 0;

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Listener passivo nativo: evita disparar detecção de mudanças a cada rolagem.
      const update = () => this.measure();
      this.window.addEventListener('scroll', update, { passive: true });
      this.window.addEventListener('resize', update, { passive: true });
      this.measure(true);

      destroyRef.onDestroy(() => {
        this.window.removeEventListener('scroll', update);
        this.window.removeEventListener('resize', update);
        cancelAnimationFrame(this.frame);
      });
    });
  }

  /** Ao navegar por teclado, rola até o ponto em que o conteúdo já está visível. */
  protected revealForFocus(): void {
    if (this.current >= 0.75) return;
    const rect = this.host.getBoundingClientRect();
    const distance = rect.height - this.window.innerHeight;
    this.window.scrollTo({
      top: this.window.scrollY + rect.top + distance * 0.75,
      behavior: 'instant',
    });
    this.measure(true);
  }

  private measure(immediate = false): void {
    const rect = this.host.getBoundingClientRect();
    const distance = rect.height - this.window.innerHeight;
    this.target = distance > 0 ? Math.min(Math.max(-rect.top / distance, 0), 1) : 1;

    if (immediate) {
      this.current = this.target;
      this.apply();
    } else if (!this.frame) {
      this.frame = requestAnimationFrame(this.tick);
    }
  }

  /** Interpola suavemente até o alvo para um movimento mais fluido que a rolagem crua. */
  private readonly tick = () => {
    const delta = this.target - this.current;
    this.current = Math.abs(delta) < 0.0005 ? this.target : this.current + delta * 0.14;
    this.apply();
    this.frame = this.current === this.target ? 0 : requestAnimationFrame(this.tick);
  };

  private apply(): void {
    this.host.style.setProperty('--p', this.current.toFixed(4));
  }
}
