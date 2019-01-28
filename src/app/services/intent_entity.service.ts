import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class IntentEntityService {
  constructor(
    private http: HttpClient
  ) { }

  get intents() {
    return this.http.get<{ intents: any[], entities: any[] }>('/assets/intents_entities.json')
      .pipe(
        map(res => res.intents)
      );
  }


  get entities() {
    return this.http.get<{ intents: any[], entities: any[] }>('/assets/intents_entities.json')
      .pipe(
        map(res => res.entities)
      );
  }



  entities_synonyms() {
    return this.http.get('/assets/training-data.json')
      .pipe(
        map(res => (<any>res).rasa_nlu_data.entity_synonyms)
      );
  }





}
