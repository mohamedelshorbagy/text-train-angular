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
      <div type="text" class="form-control" contenteditable="true" (input)="triggerChange($event)" name="phrase">
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
    console.log(this.store.getEntities());

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
    let factory = this.createComponentFactorySync(this.compiler, metadata, null);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.componentRef = this.container.createComponent(factory);
    let instance = <DynamicComponent>this.componentRef.instance;
    instance.line = this.line;
    instance.closeAll.subscribe(this.removeSelection.bind(this));
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
    const cmpClass = componentClass || class RuntimeComponent {
      line: any;
      @Output() closeAll: EventEmitter<any> = new EventEmitter<any>();
      showEntities(idx, ent) {
        console.log(idx, ent, 'inside OTF');
        this.closeAll.next();
      }
    };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
    class RuntimeComponentModule { }

    let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }


  getEntitesFromPhrase() {
    let phrase = this.line[0];
    let entities = this.line[1]['entities']; // Array
    this.line[2] = phrase;
    let originalPhrase = this.line[2]; // original phrase
    this.line[3] = []; // output content
    let endTotal = 0;
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
        phrase = phrase.substr(end - endTotal);
        endTotal = end;
        let tokenWithEntity = `<span [ngStyle]="{ 'background-color' : '${this.entities[entityName]}' , 'pointer': 'cursor' }" (click)="showEntities(${this.lineIndex}, ${j})">${token}</span>`;
        this.line[3].push(tokenWithEntity);
      }
      this.line[3].push(phrase);
    }
    this.line[4] = this.line[3].join('');
    this.compileTemplate();
  }

}


export abstract class DynamicComponent {
  line: any;
  closeAll: EventEmitter<any>;
}