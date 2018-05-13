import { Component, Input, OnInit } from '@angular/core';
import { Hero } from './hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';

@Component({
    selector: 'app-hero-detail',
    template: `
    <div *ngIf="hero">
    <h2>{{ hero.name | uppercase }} Details</h2>
        <div><span>id: </span>{{hero.id}}</div>
            <div>
                <label>name:
                    <input [(ngModel)]="hero.name" placeholder="name"/>
                </label>
            </div>
        <button (click)="goBack()">go back</button>
    </div>
    `,
    styles: [ `
        /* HeroDetailComponent's private CSS styles */
label {
    display: inline-block;
    width: 3em;
    margin: .5em 0;
    color: #607D8B;
    font-weight: bold;
  }
  input {
    height: 2em;
    font-size: 1em;
    padding-left: .4em;
  }
  button {
    margin-top: 20px;
    font-family: Arial;
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer; cursor: hand;
  }
  button:hover {
    background-color: #cfd8dc;
  }
  button:disabled {
    background-color: #eee;
    color: #ccc;
    cursor: auto;
  }
    `]
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    constructor(private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getHero();
    }
    goBack(): void {
        this.location.back();
    }

    getHero(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.heroService.getHero(id)
            .subscribe(hero => this.hero = hero);
    }
}
