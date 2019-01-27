// Import the core angular services.
import { Component } from "@angular/core";

import { StoreService } from "./services/store.service";
import { FileSaverService } from "ngx-filesaver";
import { IntentEntityService } from "./services/intent_entity.service";
import { Observable } from 'rxjs';


@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  templateUrl: './app.component.html'
})
export class AppComponent {

  toggleInputs: boolean = false;
  tuplesPhrases: any;
  lines: any[] = [];
  intents$: Observable<any[]>;

  constructor(
    private store: StoreService,
    private fileSaver: FileSaverService,
    private intentEntityService: IntentEntityService) {

  }

  ngOnInit() {
    this.intents$ = this.intentEntityService.intents;

    this.store.getIndex().forEach((event) => {
      this.removeSelection(+event);
    })
  }



  addNewLine(f) {
    let { line, intent } = f.value;
    let phrase = {
      intent: intent,
      entities: [],
      text: line
    };
    this.lines.unshift(phrase);
  }


  private removeSelection(index: number) {
    for (let i = 0; i < this.lines.length; i++) {
      if (i === index) {
        this.lines[i]['showEntities'] = true;
      } else {
        this.lines[i]['showEntities'] = false;
      }
    }
  }


  // ---
  // PUBLIC METHODS.
  // ---

  public updateLines(event: { line: any, index: number | string }) {
    let { index, line } = event;
    this.lines[index] = line;
  }

  public saveFile() {
    if (this.lines && this.lines.length) {
      let lines = this.lines.map(line => {
        delete line.showEntities
        delete line.selectedText
        line.entities = (line.entities &&
          line.entities.length &&
          line.entities.map(entity => {
            delete entity.edit
            return entity;
          }));
        return line;
      });
      console.log(lines)
      let stringifiedLines = JSON.stringify(lines, null, 2);
      let data = new Blob([stringifiedLines], { type: "application/json;charset=utf-8" });
      this.fileSaver.save(data, 'train-data.json', 'application/json');
    }

  }

  // public submitPhrases() {
  //   // this.toggleInputs = true;
  //   // this.lines = this.store.tuple2Arrays(this.tuplesPhrases);
  // }

  /**
   * 
   * 
   * 
   */
  public readFromFile(event) {
    // if (event.target.files && event.target.files[0]) {
    //   var reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]); // read file as data url
    //   reader.onload = (event) => { // called once readAsDataURL is completed
    //     // this.fileData = event.target['result'];
    //     // this.formatData();
    //     // fileInput.value = '';
    //   }
    // }
  }


}