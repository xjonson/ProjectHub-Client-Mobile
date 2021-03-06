import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'array'})
export class ArrayPipe implements PipeTransform {
  transform(value: string): string[] {
    return value && value.split(',')
  }
}