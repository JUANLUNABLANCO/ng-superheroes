import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, map } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

import { Superhero } from '../../models/superhero.model';

import { SuperheroesService } from '../../services/superheroes.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

const BASE_THUMBNAILS_URL = environment.BASE_THUMBNAILS_URL;
const BASE_POSTERS_URL = environment.BASE_POSTERS_URL;
const NO_IMAGE_NAME = environment.NO_IMAGE_NAME;


@Component({
  selector: 'app-superhero-create',
  templateUrl: './superhero-create.component.html',
  styleUrls: ['./superhero-create.component.css']
})
export class SuperheroCreateComponent {
  // superheroId: number;
  protected thumbnailsUrl: string = BASE_THUMBNAILS_URL;
  protected postersUrl: string = BASE_POSTERS_URL;
  protected noImageName: string = NO_IMAGE_NAME;

  selectedFile: File | null;

  superhero: Superhero;
  // Data, para los formularios
  availablePowers: string[];
  availableEnemies: string[];

  formCreate: FormGroup;

  constructor(
    private fb: FormBuilder,
    private superheroesService: SuperheroesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.actualiceUrls();
    this.getData();
    this.createForm();
    // this.setSuperheroData();
  }

  actualiceUrls(){
    this.thumbnailsUrl = `${BASE_THUMBNAILS_URL}/${this.noImageName}.png`;
    this.postersUrl = `${BASE_POSTERS_URL}/${this.noImageName}.jpg`;
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
    this.formCreate = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      alias: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      city: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      powers: [null, [Validators.required]],
      enemies: [null, [Validators.required]],
      bio: [ null, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
    });
  }
  resetSuperheroData() {
    this.formCreate.reset({});
    Object.keys(this.formCreate.controls).forEach(controlName => {
      this.formCreate.get(controlName)?.setErrors(null);
    });
    console.log('form Create: ', this.formCreate.value);
  
  }
  // # getters
  get nameField() {
    return this.formCreate.get('name');
  }
  get aliasField() {
    return this.formCreate.get('alias');
  }
  get cityField() {
    return this.formCreate.get('city');
  }
  get bioField() {
    return this.formCreate.get('bio');
  }
  
  showDialogCancel(): void {
    this.dialog.open(DialogComponent, {
      data: "Are you sure, you'll lost all the new data for this superhero?"
    })
    .afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // this.router.navigate(['superheroes', 'detail', this.superhero.id]);
        this.resetSuperheroData();
      }
      else {
        // do nothing
        return;
      }
    });
  }

  onSubmit(form: FormGroup) {
    if(this.formCreate.invalid) {
      return;
    }
    this.superheroesService.createSuperhero(this.formCreate.value)
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
  //   if (this.selectedFile && this.formCreate.valid) {
  //     const formData = new FormData();
      
  //     formData.append('name', this.formCreate.get('name')?.value);
  //     formData.append('alias', this.formCreate.get('alias')?.value);
  //     formData.append('bio', this.formCreate.get('bio')?.value);
  //     // .... así con todos
  //     formData.append('file', this.formCreate.get('image')?.value);
      
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
}
