import {
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { HERO } from '../../content/site-content';

/**
 * Camada de fundo do hero: vídeo em loop (ou fundo provisório animado) e o véu
 * que escurece conforme o progresso de rolagem `--p` herdado do hero.
 */
@Component({
  selector: 'app-hero-media',
  template: `
    @if (hasVideo) {
      <video
        #player
        class="layer"
        [attr.poster]="video.poster"
        muted
        loop
        playsinline
        preload="auto"
        aria-hidden="true"
      >
        @for (source of video.sources; track source.src) {
          <source [src]="source.src" [type]="source.type" />
        }
      </video>
    } @else {
      <div class="layer fallback">
        <span class="blob blob--1"></span>
        <span class="blob blob--2"></span>
        <span class="blob blob--3"></span>
      </div>
    }
    <span class="shade"></span>
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0;
      z-index: -1;
      display: block;
      overflow: hidden;
      background: var(--c-navy);
    }

    .layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(calc(1.14 - 0.14 * min(var(--p, 0) / 0.6, 1)));
      will-change: transform;
    }

    .fallback {
      background:
        radial-gradient(ellipse at 70% 20%, rgb(29 111 216 / 0.45), transparent 55%),
        linear-gradient(160deg, var(--c-navy-2), var(--c-navy) 60%, #071a2e);
    }

    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      animation: drift 20s var(--ease-in-out) infinite alternate;

      &--1 {
        width: 40rem;
        height: 40rem;
        top: -14rem;
        right: -10rem;
        background: radial-gradient(circle, rgb(142 230 255 / 0.45), transparent 70%);
      }

      &--2 {
        width: 34rem;
        height: 34rem;
        bottom: -14rem;
        left: -10rem;
        background: radial-gradient(circle, rgb(29 111 216 / 0.55), transparent 70%);
        animation-duration: 26s;
        animation-direction: alternate-reverse;
      }

      &--3 {
        width: 22rem;
        height: 22rem;
        top: 35%;
        left: 40%;
        background: radial-gradient(circle, rgb(142 230 255 / 0.3), transparent 70%);
        animation-duration: 16s;
      }
    }

    @keyframes drift {
      to {
        transform: translate3d(-5rem, 4rem, 0) scale(1.2);
      }
    }

    /* Véu: quase transparente no início, escurece para dar contraste ao conteúdo */
    .shade {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgb(11 37 64 / 0.88), rgb(11 37 64 / 0.72));
      opacity: calc(0.15 + 0.85 * min(var(--p, 0) / 0.4, 1));

      @media (min-width: 960px) {
        background: linear-gradient(
          90deg,
          rgb(11 37 64 / 0.92) 0%,
          rgb(11 37 64 / 0.7) 55%,
          rgb(11 37 64 / 0.5)
        );
      }

      /* Degradê inferior fixo para a legibilidade da abertura */
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(0deg, rgb(11 37 64 / 0.7), transparent 45%);
      }
    }
  `,
})
export class HeroMedia {
  protected readonly video = HERO.video;
  readonly hasVideo = HERO.video.sources.length > 0;
  /** `true` quando o vídeo está pausado (pelo usuário, por movimento reduzido ou bloqueio de autoplay). */
  readonly paused = signal(false);

  private readonly player = viewChild<ElementRef<HTMLVideoElement>>('player');
  private userPaused = false;

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const window = inject(DOCUMENT).defaultView;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const video = this.player()?.nativeElement;
      if (!video) return;
      video.muted = true;

      if (window?.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        this.userPaused = true;
        this.paused.set(true);
        return;
      }

      // Pausa o vídeo fora da tela para poupar CPU/bateria.
      if (typeof IntersectionObserver === 'undefined') {
        this.play();
        return;
      }
      const observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting && !this.userPaused) this.play();
        else video.pause();
      });
      observer.observe(host);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  toggle(): void {
    const video = this.player()?.nativeElement;
    if (!video) return;
    this.userPaused = !video.paused;
    if (this.userPaused) {
      video.pause();
      this.paused.set(true);
    } else {
      this.play();
    }
  }

  private play(): void {
    const video = this.player()?.nativeElement;
    if (!video) return;
    this.paused.set(false);
    video.play().catch(() => this.paused.set(true));
  }
}
