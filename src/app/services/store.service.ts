import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  event$ = new Subject();


  entites = {
    'CORE': '#AE8CA3',
    'ACTION': '#9EE493',
    'SIDE_CORE': '#40798C',
    'AREAS': '#D17A22',
    'BUDGET': '#3498db',
    'CANCEL': '#c0392b',
    'EXCLUDE': '#76BED0',
    'EXTRAS': '#FFA69E',
    'FOOD_CATEGORY': '#6DAEDB',
    'FOOD_CUSINES': '#EFD0CA',
    'INCLUDE': '#FE938C',
    'POPULAR': '#192BC2',
    'RECAP': '#ED474A',
    'REQUEST': '#E0C879',
    'REQUEST_ADD': '#2ecc71',
    'REQUEST_REMOVE': '#e74c3c',
    'RESTAURANT': '#AEADF0',
    'SIZE': '#F0BCD4',
    'AFTER_CORE': '#6c5ce7'
  };
  constructor() { }

  sendIndex(index) {
    this.event$.next(index);
  }

  getIndex() {
    return this.event$.asObservable();
  }


  public tuple2Arrays(tuples) {
    tuples = tuples.replace(/\(/g, '[').replace(/\)/g, ']');
    let result = eval(tuples);
    return result;
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
      return `'${term}'`;
    }
    return term;
  }





}
