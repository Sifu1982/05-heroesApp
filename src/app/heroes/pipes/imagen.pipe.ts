import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  // pure: false -> Hace que se ejecute cada vez que el ciclo de detección de cambios de Angular se dispara. Lo cual permite que se ejecute el pipe muchas veces, pero baja el rendimiento de la aplicación. El valor por defecto es -> pure: true
  // pure: false,
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    if (!heroe.id && !heroe.alt_img) {
      return 'assets/no-image.png';
    } else if (heroe.alt_img) {
      return heroe.alt_img;
    } else {
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }
}
