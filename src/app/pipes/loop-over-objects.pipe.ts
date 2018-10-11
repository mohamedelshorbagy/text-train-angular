import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectLoop'
})
export class LoopOverObjectsPipe implements PipeTransform {

  transform(object: any): any {
    return Object.keys(object);
  }

}
