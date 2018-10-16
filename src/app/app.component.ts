
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { TextSelectEvent } from "./directives/text-selection.directive";
import { StoreService } from "./services/store.service";
import { FileSaverService } from "ngx-filesaver";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  templateUrl: './app.component.html'
})
export class AppComponent {

  toggleInputs: boolean = false;
  tuplesPhrases: any;
  lines: any;
  entities: any;

  constructor(
    private store: StoreService,
    private fileSaver: FileSaverService) {

  }

  ngOnInit() {
    this.entities = this.store.getEntities();


    this.store.getIndex().forEach((event) => {
      this.removeSelection(+event);
    })


  }


  addNewLine(f) {
    let newPhrase = f.value.line;
    console.log(f);

    let line = [
      newPhrase,
      {
        entities: []
      }
    ];


    this.lines.push(line);
  }


  private removeSelection(index: number) {
    for (let i = 0; i < this.lines.length; i++) {
      if (i === index) {
        this.lines[i]['hostRectangle'] = true;
      } else {
        this.lines[i]['hostRectangle'] = false;
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
    let tuples = this.store.arrays2Tuples(this.lines);
    let data = new Blob([tuples], { type: "text/plain;charset=utf-8" });
    this.fileSaver.save(data, 'data-angular.txt');

  }

  public submitPhrases() {
    this.toggleInputs = true;
    this.lines = this.store.tuple2Arrays(this.tuplesPhrases);

  }



}