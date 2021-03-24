import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bar'
})
export class BarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
