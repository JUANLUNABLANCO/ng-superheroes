import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../share/components/dialog/dialog.component';

import { Superhero } from '../../models/superhero.model';

import { SuperheroesService } from '../../services/superheroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const BASE_THUMBNAILS_URL = environment.BASE_THUMBNAILS_URL;
const BASE_POSTERS_URL = environment.BASE_POSTERS_URL;
const NO_IMAGE_NAME = environment.NO_IMAGE_NAME;

@Component({
  selector: 'app-superhero-edit',
  templateUrl: './superhero-edit.component.html',
  styleUrls: ['./superhero-edit.component.css']
})
export class SuperheroEditComponent  implements OnInit, OnDestroy{
  superheroId: number;
  private subscription: Subscription;
  protected thumbnailsUrl: string = BASE_THUMBNAILS_URL;
  protected postersUrl: string = BASE_POSTERS_URL;
  protected noImageName: string = NO_IMAGE_NAME;

  superhero: Superhero;

  formEdit: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private superheroesService: SuperheroesService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.actualiceParams();
    this.createForm();
  }

  actualiceParams(){
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
  createForm() {
    this.formEdit = this.fb.group({
      name: [this.superhero.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      alias: [this.superhero.alias, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      city: [this.superhero.city, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      // powers: [null, [Validators.required]],
      // enemies: [null, [Validators.required]],
      bio: [ this.superhero.bio, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
    });
  }
  // # getters
  get nameField() {
    return this.formEdit.get('name');
  }
  get aliasField() {
    return this.formEdit.get('alias');
  }
  get cityField() {
    return this.formEdit.get('city');
  }
  get bioField() {
    return this.formEdit.get('bio');
  }
  saveSuperhero() {
    // grabar
  }

  cancelCreate() {
    // cancelar
  }
  showDialogCancel(): void {
    this.dialog.open(DialogComponent, {
      data: "¿Etás seguro perderás la información?"
    })
    .afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // do something actualizar los datos anteriroes
      }
      else {
        // do nothing
        return;
      }
    });
  }

  onSubmit(form: FormGroup) {
    if(this.formEdit.invalid) {
      return;
    }
    this.superheroesService.createSuperhero(this.formEdit.value)
    .subscribe({
      next: (token) => {
        // if (token) this.router.navigate(['']);
      },
      error: (err: any) => {
        console.error('Error controlado: ', err);
      },
      complete: () => {
        console.log(' complete');
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
