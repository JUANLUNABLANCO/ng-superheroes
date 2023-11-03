import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, map } from 'rxjs';

import { Superhero } from '../../models/superhero.model';

import { SuperheroesService } from '../../services/superheroes.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

const BASE_THUMBNAILS_URL = environment.BASE_THUMBNAILS_URL;
const BASE_POSTERS_URL = environment.BASE_POSTERS_URL;
const NO_IMAGE_NAME = environment.NO_IMAGE_NAME;

@Component({
  selector: 'app-superhero-detail',
  templateUrl: './superhero-detail.component.html',
  styleUrls: ['./superhero-detail.component.css']
})
export class SuperheroDetailComponent implements OnInit, OnDestroy {
  superheroId: number;
  private subscription: Subscription;
  protected thumbnailsUrl: string = BASE_THUMBNAILS_URL;
  protected postersUrl: string = BASE_POSTERS_URL;
  protected noImageName: string = NO_IMAGE_NAME;

  superhero: Superhero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private superheroesService: SuperheroesService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe(params => {
      this.superheroId = parseInt(params['id']);
      this.superheroesService.getSuperhero(this.superheroId).pipe(
        map((superhero: Superhero) => {
          if (superhero) {
            console.log('## Component: superheroe encontrado');
            this.superhero = superhero;
            console.log('## Component: image', this.superhero.image);
            if (this.superhero.image) {
              this.thumbnailsUrl = `${BASE_THUMBNAILS_URL}/${this.superhero.image}.png`;
              this.postersUrl = `${BASE_POSTERS_URL}/${this.superhero.image}.jpg`;
              console.log('thumbnails image', this.thumbnailsUrl);
              console.log('posters image', this.postersUrl);
            } else {
              console.log('## NO VIENE IMAGEN');
              this.thumbnailsUrl = `${BASE_THUMBNAILS_URL}/${this.noImageName}.png`;
              this.postersUrl = `${BASE_POSTERS_URL}/${this.noImageName}.jpg`;
            }
            return this.superhero;
          } else {
            console.log('## Component: NO ENCONTRADO');
            return null;
          }
        })
      ).subscribe()
    });
  }

  deleteSuperhero() {
    this.superheroesService.deleteSuperhero(Number(this.superheroId))?.subscribe();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
