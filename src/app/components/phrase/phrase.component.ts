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
      <div class="well entities">
        <div class="entity" *ngFor="let key of entities | objectLoop" [style.background]="entities[key]">
          {{ key }}
        </div>
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
    console.log(newText);
    this.getEntitesFromPhrase(newText);


  }


  removeSelection() {
    this.store.sendIndex(this.lineIndex);
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
    instance.line = this.line;
    instance.closeAll.subscribe(this.removeSelection.bind(this));
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
        line: any;
        @Output() closeAll: EventEmitter<any> = new EventEmitter<any>();
        showEntities(idx, ent) {
          console.log(idx, ent, 'inside OTF');
          this.closeAll.next();
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
    } else {
      phrase = this.line[0];
    }
    console.log('phrase ===>', phrase);
    let entities = this.line[1]['entities']; // Array
    this.line[2] = phrase;
    let originalPhrase = this.line[2]; // original phrase
    this.line[3] = []; // output content
    let endTotal = 0;
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
        let end = entity[1];
        let entityName = entity[2];
        let token = originalPhrase.substring(start, end);
        if (actualEnd < start && actualEnd !== -1) {
          console.log(actualEnd, 0);
          let tokensBetweenEntities = originalPhrase.substring(actualEnd, start);
          console.log(3, phrase, actualEnd, start);
          phrase = phrase.substring(tokensBetweenEntities.length);
          console.log(1, tokensBetweenEntities);
          console.log(2, phrase);
          this.line[3].push(tokensBetweenEntities);
        }
        console.log(8, token);
        phrase = phrase.substring(token.length);
        endTotal += end;
        actualEnd = end;
        let tokenWithEntity = `<span [ngStyle]="{ 
          'background-color' : '${this.entities[entityName]}', 
          'pointer': 'cursor' 
        }" (click)="showEntities(${this.lineIndex}, ${j})">${token}</span>`;
        this.line[3].push(tokenWithEntity);
        console.log(20, phrase);
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
    console.log(this.line);
    this.compileTemplate();

  }

}


export abstract class DynamicComponent {
  line: any;
  closeAll: EventEmitter<any>;
}