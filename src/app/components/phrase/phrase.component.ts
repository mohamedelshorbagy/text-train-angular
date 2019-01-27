import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { TextSelectEvent } from "../../directives/text-selection.directive";
import { IntentEntityService } from 'src/app/services/intent_entity.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-phrase',
  templateUrl: './phrase.component.html',
  styleUrls: ['./phrase.component.css']
})

export class PhraseComponent implements OnInit {

  @Input() line: any;
  @Input() lineIndex: number;
  @Input() intent: string;
  @Output() updateLines: EventEmitter<any> = new EventEmitter<any>()

  entities$: Observable<any[]>;
  selectionIndecies: {
    start: number,
    end: number
  } = {
      start: null,
      end: null
    };

  constructor(
    private store: StoreService,
    private intentEntityService: IntentEntityService
  ) {
  }


  LogValue() {
    console.log(this.line);
  }


  ngOnInit() {
    this.entities$ = this.intentEntityService.entities;
  }

  triggerChange(event) {
    this.line['text'] = event.target.innerText;
    // TODO: Recalculate the Indecies
    this.updateParentLines();
  }

  removeEntity(index: number | string) {
    this.line['entities'].splice(+index, 1);
    this.store.sendIndex(-1);
    this.updateParentLines();
  }

  editEntity(index) {
    this.line['entities'][index].edit = true;
  }

  saveEntity(entityName, index) {
    this.line['entities'][index]['entity'] = entityName;
    this.line['entities'][index]['edit'] = false;
  }


  updateParentLines() {
    this.updateLines.emit({ line: this.line, index: this.lineIndex });
  }


  public selectPhrase(event: TextSelectEvent): void {
    this.store.sendIndex(this.lineIndex);
    if (event.text) {
      this.line['selectedText'] = event.text;
      this.selectionIndecies = {
        ...event.selectionState
      }
    }

    if (event.hostRectangle) {
      this.line['showEntities'] = true;
    } else {
      this.store.sendIndex(this.lineIndex);
    }

  }


  changeEntity(entityName) {
    let entityObj = this.getEntityObject(entityName, this.selectionIndecies.start, this.selectionIndecies.end);
    let entityItem = {
      ...entityObj,
      value: this.line['selectedText']
    };
    this.line['entities'].push(entityItem);
    this.store.sendIndex(-1);
  }


  getEntityObject(entityName: string, startIndex: number, endIndex: number) {
    return {
      start: startIndex,
      end: endIndex,
      entity: entityName
    }

  }

  randomColor() {
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
  }

}