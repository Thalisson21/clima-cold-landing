import {
  DOCUMENT,
  DestroyRef,
  ElementRef,
  Component,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { WhatsappService } from '../../core/whatsapp.service';
import { NAV_LINKS } from '../../content/site-content';
import { Logo } from '../../shared/logo';

@Component({
  selector: 'app-header',
  imports: [Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '[class.is-open]': 'menuOpen()',
    '[class.on-hero]': 'onHero()',
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onResize()',
    '(document:keydown.escape)': 'closeMenu(true)',
  },
})
export class Header {
  protected readonly links = NAV_LINKS;
  protected readonly whatsappUrl = inject(WhatsappService).defaultUrl;

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly activeId = signal<string | null>(null);
  /** Enquanto o cabeçalho está sobre o vídeo do hero, usa a variante clara. */
  private readonly overHero = signal(true);
  protected readonly onHero = computed(() => this.overHero() && !this.menuOpen());

  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => this.document.body.classList.toggle('is-locked', this.menuOpen()));

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.onScroll();
      if (typeof IntersectionObserver === 'undefined') return;

      // Destaca no menu a seção visível no centro da tela.
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.activeId.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const { id } of this.links) {
        const section = this.document.getElementById(id);
        if (section) observer.observe(section);
      }
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (restoreFocus) this.toggleButton().nativeElement.focus();
  }

  protected onScroll(): void {
    this.scrolled.set(this.document.defaultView!.scrollY > 12);
    const hero = this.document.getElementById('inicio');
    this.overHero.set(!!hero && hero.getBoundingClientRect().bottom > 72);
  }

  protected onResize(): void {
    if (this.document.defaultView!.innerWidth >= 960) this.closeMenu();
  }
}
