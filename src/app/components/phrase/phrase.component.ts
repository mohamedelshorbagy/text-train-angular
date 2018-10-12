import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {
  ViewChild, ViewContainerRef, ComponentRef,
  Compiler, ComponentFactory, NgModule, ModuleWithComponentFactories
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-phrase',
  template: `
    <div>
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
    this.store.sendIndex(this.lineIndex);
  }

  changeEntity(entityName) {
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
     *                    -----> Start Of Phrase ===> unshif inside entities array
     *    New Selection   -----> Middle Of Phrase >>>> insertInMiddelLogic
     *                    -----> End Of Phrase ===> push inside entities array
     * 
     *    # insertInMiddelLogic
     *        ----> get entities array of selected phrase
     *        ----> for loop over elements and check two elements together
     *        ----> check (end of first element) with (start of second element)
     *        ----> get the (start of the new entity) and check them with previous step
     *        ----> if (el1.end < new.start && el2.start > new.start) ==> should be inserted instead of el2
     *    
     * 
     *    Select an exist entity phrase  ----> changeEntityLogic
     *    Select an exist entity phrase from (start ,middle, end)  ----> unknow????
     *    Select an exist entity phrase with new phrase  >>>> updateEntityLogic()
     *    Select an exist entity phrase with another entity phrase  ----> Error Like Dialogflow or another behaviour
     *        
     *    # updateEntityLogic
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