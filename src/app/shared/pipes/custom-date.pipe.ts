import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe personalizado para formatear fechas en formato DD/MM/YYYY.
 * Uso: {{ fecha | customDate }}
 */
@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: Date | string | null): string {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}