import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_THUMBNAILS_URL = environment.BASE_THUMBNAILS_URL;
@Component({
  selector: 'app-sph-list-item-image',
  templateUrl: './sph-list-item-image.component.html',
  styleUrls: ['./sph-list-item-image.component.css']
})
export class SphListItemImageComponent implements OnInit {
  @Input() image = ""; // nos llega desde el padre
  thumbsnailUrl = "";

  ngOnInit() {
    this.thumbsnailUrl = `${BASE_THUMBNAILS_URL}/${this.image}.png`; // algo como assets/images-superheroes/<nombreimagen.png>
    console.log('sph-list-item-image.component: this.thumbnailsUrl', this.thumbsnailUrl);
    if (this.thumbsnailUrl == `${BASE_THUMBNAILS_URL}/.png`) this.thumbsnailUrl = `${BASE_THUMBNAILS_URL}/no-image-available.png`; // en caso que no venga ningún nombre de imagen ofreceremos esta por defecto
  }
}
