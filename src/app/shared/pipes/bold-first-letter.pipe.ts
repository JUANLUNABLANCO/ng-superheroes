import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'boldFirstLetter' })
export class BoldFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Dividir el valor en palabras
    const words = value.split(' ');

    // Aplicar el formato a cada palabra
    const formattedWords = words.map(word => {
      // Capitalizar la primera letra
      const capitalizedFirstLetter = word.charAt(0).toUpperCase() + word.slice(1);
      // Devolver la palabra en negrita
      return `<strong>${capitalizedFirstLetter}</strong>`;
    });
    // Unir las palabras formateadas de nuevo en una cadena HTML
    return formattedWords.join('&nbsp;');
  }
}

