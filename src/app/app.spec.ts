import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { NAV_LINKS } from './content/site-content';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the hero title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('próximo passo');
  });

  it('should point every nav link to an existing section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    for (const { id } of NAV_LINKS) {
      expect(compiled.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  it('should build WhatsApp links with the configured phone and an encoded message', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(
      compiled.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]'),
    );
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.href).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+/);
      expect(link.rel).toContain('noopener');
    }
  });
});
