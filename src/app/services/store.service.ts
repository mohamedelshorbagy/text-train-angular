import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  event$ = new Subject();
  lineIndex: number = -1;

  entites = {
    'CORE': '#AE8CA3',
    'SIDE_CORE': '#40798C',
    'EXCLUDE': '#76BED0',
    'INCLUDE': '#FE938C',
    'RESTAURANT': '#AEADF0',
    'SIZE': '#F0BCD4',
    'AFTER_CORE': '#6c5ce7',
    'ADDITION': '#9EE493',
    'SUBTRACTION': '#D17A22'
  };
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


  public tuple2Arrays(tuples) {
    tuples = tuples.replace(/\(/g, '[').replace(/\)/g, ']');
    return Function(`return (${tuples});`)();
  }

  public arrays2Tuples(array) {
    let container = '[';
    let outerComma = ',';
    for (let i = 0; i < array.length; i++) {
      let tuple = array[i];
      let innerTuple = `(${this.qoutedString(tuple[0])},`; // Phrase

      let Entites = '';
      tuple[1]['entities'].forEach((el, index) => {
        let innerComma = ',';
        let tempString = el.reduce((acc, elm, idx) => {
          return idx == 0 ? this.qoutedString(elm) : acc + ', ' + this.qoutedString(elm);
        }, '');
        if (index === (tuple[1]['entities'].length - 1)) { // For concat inner tuples inside entities
          innerComma = '';
        }
        Entites += `(${tempString})${innerComma}`;
      });

      Entites = `{ 'entities': [${Entites}] }`;
      innerTuple += `${Entites})`;

      if (i === array.length - 1) {
        outerComma = '';
      }
      container += `${innerTuple}${outerComma}`
    }

    container += ']';
    return container;
  }

  public getEntities() {
    return this.entites;
  }

  qoutedString(term) {
    if (typeof term === 'string') {
      term = term.replace(/'/g, "\\'");
      return `'${term}'`;
    }
    return term;
  }





}
