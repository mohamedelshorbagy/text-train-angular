import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
  ViewChild, ViewContainerRef, ComponentRef,
  Compiler, ComponentFactory, NgModule, ModuleWithComponentFactories
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';
import { TextSelectEvent } from "../../directives/text-selection.directive";

@Component({
  selector: 'app-phrase',
  template: `
    <div class="container field" (textSelect)="renderRectangles($event)">
    <form #testForm="ngForm">
      <div type="text" class="form-control" contenteditable="true" (blur)="triggerChange($event)" name="phrase">
        <ng-template #container></ng-template>
      </div>
    </form>


    <ng-template [ngIf]="line?.hostRectangle">
      <div class="card bg-light entities">
        <div class="entity" *ngFor="let key of entities | objectLoop" [style.background]="entities[key]" (click)="changeEntity(key)">
          {{ key }}
        </div>
        <button class="btn btn-danger" (click)="removeEntity()">X</button>
      </div>
    </ng-template>

    </div>
  `,
  styleUrls: ['./phrase.component.css']
})

export class PhraseComponent implements OnInit, OnDestroy {

  @Input() line: any;
  @Input() lineIndex: number;
  @Input() entities: any;
  @Output() updateLines: EventEmitter<any> = new EventEmitter<any>()
  entityIndex: number | string = -1;
  selection: boolean = false;
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  constructor(
    private compiler: Compiler,
    private store: StoreService
  ) {
  }


  ngOnInit() {
    this.getEntitesFromPhrase();

  }

  triggerChange(event) {
    let newText = event.target.innerText;
    this.updateParentLines(newText);
  }

  removeEntity() {
    this.line[1]['entities'].splice(+this.entityIndex, 1);
    this.store.sendIndex(-1);
    this.updateParentLines();
  }

  updateParentLines(text?: string) {
    let textParam = null;
    if (text && (text !== '')) {
      textParam = text;
    }
    this.getEntitesFromPhrase(textParam);
    this.updateLines.emit({ line: this.line, index: this.lineIndex });
  }


  selectPhrase(entityIndex: number | string) {
    this.entityIndex = entityIndex;
    this.selection = false;
    this.store.sendIndex(this.lineIndex);
  }

  public renderRectangles(event: TextSelectEvent): void {
    this.selection = true;
    console.group("Text Select Event");
    console.log("Text:", event.text);
    console.log("Host Rectangle:", event.hostRectangle);
    console.groupEnd();
    this.store.sendIndex(this.lineIndex);
    if (event.text) {
      this.line['selectedText'] = event.text;
    }
    console.log(this.line['selectedText']);


    // If a new selection has been created, the viewport and host rectangles will
    // exist. Or, if a selection is being removed, the rectangles will be null.
    if (event.hostRectangle) {
      this.line['hostRectangle'] = true;
    } else {
      this.store.sendIndex(this.lineIndex);

    }

  }


  changeEntity(entityName) {
    if (!this.selection) {
      // Clicked in entity word
      this.updateExistedEntityWord(entityName);

    } else {
      /**
       * Selection
       * 
       */
      let entityObj = this.getEntityObject(entityName);
      let newEntityItem = [
        entityObj.start,
        entityObj.end,
        entityObj.type
      ];
      let entities = this.line[1]['entities'];

      let checkIndexIfExisted = this.checkIfExtendExistedEntity(newEntityItem, entities);

      if (checkIndexIfExisted !== -1) {
        this.line[1]['entities'][checkIndexIfExisted] = newEntityItem;
        this.store.sendIndex(-1);
        this.updateParentLines();
        return;
      }

      let entitiesLen = this.line[1]['entities'].length;
      let firstEntityStartPos = this.line[1]['entities'][0][0];
      let lastEntityEndPos = this.line[1]['entities'][entitiesLen - 1][1];

      /**
       * 
       * Case Of Start Of Phrase
       * 
       */
      if (firstEntityStartPos > newEntityItem[0]) {
        this.line[1]['entities'].splice(0, 0, newEntityItem);
        this.store.sendIndex(-1);
        this.updateParentLines();
        return;

      }
      /**
       * 
       * Case Of end Of Phrase
       */
      if (lastEntityEndPos < newEntityItem[1]) {
        this.line[1]['entities'].splice(entitiesLen + 1, 0, newEntityItem);
        this.store.sendIndex(-1);
        this.updateParentLines();
        return;

      }

      for (let i = 0; i < entities.length - 1; i++) {
        let fStart = entities[i][0];
        let sEnd = entities[i + 1][1];
        let iStart = newEntityItem[0];
        if (fStart < iStart && sEnd > iStart) {
          this.line[1]['entities'].splice(i + 1, 0, newEntityItem);
          this.store.sendIndex(-1);
          this.updateParentLines();
          return;
        }
      }


    }
  }


  checkIfExtendExistedEntity(entity, entities): number {

    let iStart = entity[0];

    for (let i = 0; i < entities.length; i++) {
      let fStart = entities[i][0];
      if (fStart === iStart) {
        return i;
      }
    }
    return -1;


  }

  getEntityObject(entityName: string) {
    let startIndex = this.line[2].indexOf(this.line['selectedText']);
    let wordLen = this.line['selectedText'].length;
    let endIndex = Math.abs((startIndex + wordLen));
    console.group('Selected Text');
    console.log('word', this.line['selectedText']);
    console.log('index', startIndex);
    console.log('endIndex', endIndex);
    console.log('length', wordLen);
    console.groupEnd()
    return {
      start: startIndex,
      end: endIndex,
      type: entityName
    }

  }


  updateExistedEntityWord(entityName) {
    let entityIndex = this.entityIndex;
    let entities = this.line[1]['entities'];
    if (entities && entities.length) {
      this.line[1]['entities'][entityIndex][2] = entityName;
    }
    this.store.sendIndex(-1);
    this.updateParentLines();

  }

  addEntityBySelection(entityName) {
    // arr.splice(7, 0, "Mohamed"); // Insert in specific location


    /**
     * 
     * Finite State Machine Of Selection of text
     *                    -----> Start Of Phrase ===> unshif inside entities array ==> %Done
     *    @@@ Selection   -----> Middle Of Phrase >>>> insertInMiddelLogic ==> %Done
     *                    -----> End Of Phrase ===> push inside entities array ==> %Done
     * 
     *    # insertInMiddelLogic %Done
     *        ----> get entities array of selected phrase
     *        ----> for loop over elements and check two elements together
     *        ----> check (end of first element) with (start of second element)
     *        ----> get the (start of the new entity) and check them with previous step
     *        ----> if (el1.end < new.start && el2.start > new.start) ==> should be inserted instead of el2
     *    
     * 
     *    Select an exist entity phrase  ----> updateExistedEntityWord ==> %Done
     *    Select an exist entity phrase from (start ,middle, end)  ----> unknow????
     *    Select an exist entity phrase with new phrase  >>>> updateEntityLogic() ==> %Done
     *    Select an exist entity phrase with another entity phrase  ----> Error Like Dialogflow or another behaviour
     *        
     *    # updateEntityLogic %Done
     *        -----> Get entities array of selected phrase 
     *        -----> loop over them & if start of one of them === to the new.start
     *        -----> Update end of this entity 
     * 
     */


  }


  ngOnDestroy() {
    this.componentRef.destroy();
    this.componentRef = null;
  }


  compileTemplate() {

    let metadata = {
      selector: `runtime-component-sample`,
      template: this.line[4]
    };
    let factory = this.createComponentFactorySync(this.compiler, metadata);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.componentRef = this.container.createComponent(factory);
    let instance = <DynamicComponent>this.componentRef.instance;
    /**
     * 
     * Inputs, Outputs of created component
     */
    instance.line = this.line;
    instance.selectPhrase.subscribe(this.selectPhrase.bind(this));
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass?: any): ComponentFactory<any> {
    let cmpClass;
    let decoratedCmp;
    if (componentClass) {
      cmpClass = componentClass;
      decoratedCmp = Component(metadata)(cmpClass);
    } else {
      @Component(metadata)
      class RuntimeComponent {
        @Input() line: any;
        @Output() selectPhrase: EventEmitter<any> = new EventEmitter<any>();
        showEntities(lineIndex, entityIndex) {
          this.selectPhrase.emit(entityIndex);
        }
      };
      decoratedCmp = RuntimeComponent;
    }

    @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
    class RuntimeComponentModule { }

    let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }


  getEntitesFromPhrase(text?: string) {
    let phrase;
    if (text) {
      phrase = text;
      this.line[0] = phrase;
    } else {
      phrase = this.line[0];
    }
    let entities = this.line[1]['entities']; // Array
    this.line[2] = phrase;
    let originalPhrase = this.line[2]; // original phrase
    this.line[3] = []; // output content
    let actualEnd = -1;
    if (entities && entities.length) { // Exist
      for (let j = 0; j < entities.length; j++) {
        let entity = entities[j];
        /**
         * 0 => Start
         * 1 => End
         * 2 => Entity Name
         */

        let start = entity[0];
        if (start !== 0 && actualEnd === -1) {
          let tokensBetweenEntities = originalPhrase.substring(0, start);
          phrase = phrase.substring(tokensBetweenEntities.length);
          this.line[3].push(tokensBetweenEntities);
        }
        let end = entity[1];
        let entityName = entity[2];
        let token = originalPhrase.substring(start, end);
        if (actualEnd < start && actualEnd !== -1) {
          let tokensBetweenEntities = originalPhrase.substring(actualEnd, start);
          phrase = phrase.substring(tokensBetweenEntities.length);
          this.line[3].push(tokensBetweenEntities);
        }
        phrase = phrase.substring(token.length);
        actualEnd = end;
        let tokenWithEntity = `<span [ngStyle]="{ 
          'background-color' : '${this.entities[entityName]}', 
          'cursor': 'pointer' 
        }" (click)="showEntities(${this.lineIndex}, ${j})">${token}</span>`;
        this.line[3].push(tokenWithEntity);
      }
      this.line[3].push(phrase);
    }
    let tempString = this.line[3].reduce((acc, elm, idx) => {
      if (elm === " ") {
        return acc += '&nbsp;';
      }
      return acc += elm;
    }, '');
    this.line[4] = tempString;
    this.compileTemplate();

  }

}


export abstract class DynamicComponent {
  line: any;
  selectPhrase: EventEmitter<any>;
}