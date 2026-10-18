import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TEAM } from '../../content/site-content';
import { Reveal } from '../../shared/reveal.directive';

@Component({
  selector: 'app-team',
  imports: [NgOptimizedImage, Reveal],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  protected readonly members = TEAM;
}
