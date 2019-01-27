import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  event$ = new Subject();
  lineIndex: number = -1;

  // entites = {
  //   'CORE': '#AE8CA3',
  //   'SIDE_CORE': '#40798C',
  //   'EXCLUDE': '#76BED0',
  //   'INCLUDE': '#FE938C',
  //   'RESTAURANT': '#AEADF0',
  //   'SIZE': '#F0BCD4',
  //   'AFTER_CORE': '#6c5ce7',
  //   'ADDITION': '#9EE493',
  //   'SUBTRACTION': '#D17A22'
  // };
  constructor() { }

  sendIndex(index) {
    if (+index !== +this.lineIndex) {
      this.lineIndex = index;
      this.event$.next(index);
    }
  }

  getIndex() {
    return this.event$.asObservable();
  }

}
