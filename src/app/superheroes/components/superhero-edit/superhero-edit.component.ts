import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../share/components/dialog/dialog.component';

import { Superhero } from '../../models/superhero.model';

import { SuperheroesService } from '../../services/superheroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  selectedFile: File | null;

  superhero: Superhero;
  // Data, para los formularios
  availablePowers: string[];
  availableEnemies: string[];

  formEdit: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private superheroesService: SuperheroesService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.actualiceParams();
    this.getData();
    this.createForm();
    this.setSuperheroData();
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
  getData() {
    // obtener poderes y enemigos
    this.superheroesService.getPowers().subscribe((powersData)=>{
      this.availablePowers = powersData;
      // console.log('## Component: powers', this.availablePowers);
    });
    this.superheroesService.getEnemies().subscribe((enemiesData)=>{
      this.availableEnemies = enemiesData;
      // console.log('## Component: enemies', this.availableEnemies);
    });
  }
  createForm() {
    this.formEdit = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      alias: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      powers: [null, [Validators.required]],
      enemies: [null, [Validators.required]],
      bio: [ null, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
    });
  }
  // Darle valores a los campos del formulario
  setSuperheroData() {
    this.formEdit.patchValue({
      name: this.superhero.name,
      alias: this.superhero.alias,
      city: this.superhero.city,
      powers: this.superhero.powers,
      enemies: this.superhero.enemies,
      bio: this.superhero.bio
      // image: this.superhero.image
    });
    console.log('powers of superhero: ', this.superhero.powers);
    console.log('the formEdit powers: ', this.formEdit.get('powers')?.value);
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
  
  showDialogCancel(): void {
    this.dialog.open(DialogComponent, {
      data: "Are you sure, you'll lost all the new data for this superhero?"
    })
    .afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // this.router.navigate(['superheroes', 'detail', this.superhero.id]);
        this.setSuperheroData();
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
    this.superheroesService.updateSuperhero(this.superheroId, this.formEdit.value)
    .subscribe({
      next: (updatedSuperheroesFake: Superhero[]) => {
        this.snackMessage('Superhero updated correctly', 5, 'success');
        console.log('new superhero', updatedSuperheroesFake);
      },
      error: (err: any) => {
        console.error('Error controlado: ', err);
      },
      complete: () => {
        console.log(' complete');
      }
    });
  }
  // TODO  en caso de querer subir un fichero para la imagen
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // uploadFile() {
  //   if (this.selectedFile && this.formEdit.valid) {
  //     const formData = new FormData();
      
  //     formData.append('name', this.formEdit.get('name')?.value);
  //     formData.append('alias', this.formEdit.get('alias')?.value);
  //     formData.append('bio', this.formEdit.get('bio')?.value);
  //     // .... así con todos
  //     formData.append('file', this.formEdit.get('image')?.value);
      
  //     // Realiza una solicitud HTTP para cargar el archivo al servidor
  //     // Utiliza el servicio HttpClient para enviar la solicitud POST al endpoint del servidor
  //     // Aquí es donde especificas la URL del endpoint de carga en tu servidor
  //     // this.http.post('URL_DEL_ENDPOINT', formData).subscribe(response => {
  //     //   console.log('Archivo cargado exitosamente', response);
  //     // });
  //   } else {
  //     console.error('Any File selected yet.');
  //   }
  // }
  snackMessage(message: string, delayToClose: number, type: string) {
    this.snackBar.open(message, 'close', {
      duration: delayToClose * 1000,
      verticalPosition: 'bottom',
      panelClass: [`snackbar-type-fill-${type}`]
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
