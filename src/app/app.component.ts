
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


    this.store.getIndex().forEach((event: number) => {
      if (typeof event === 'number') {
        this.removeSelection(+event);
      }
    })


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

  public saveFile() {
    let tuples = this.store.arrays2Tuples(this.lines);
    let data = new Blob([tuples], { type: "text/plain;charset=utf-8" });
    this.fileSaver.save(data, 'data-angular.txt');

  }

  // I render the rectangles emitted by the [textSelect] directive.
  public renderRectangles(event: TextSelectEvent, index: number): void {

    console.group("Text Select Event");
    console.log('index', index);
    console.log("Text:", event.text);
    console.log("Host Rectangle:", event.hostRectangle);
    console.groupEnd();
    console.table(this.lines);
    for (let i = 0; i < this.lines.length; i++) {
      if (i !== index) {
        this.lines[i]['hostRectangle'] = null;
      }
    }
    if (event.text) {
      this.lines[index]['selectedText'] = event.text;
    }


    // If a new selection has been created, the viewport and host rectangles will
    // exist. Or, if a selection is being removed, the rectangles will be null.
    if (event.hostRectangle) {
      this.lines[index]['hostRectangle'] = event.hostRectangle;
    } else {
      for (let i = 0; i < this.lines.length; i++) {
        if (i !== index) {
          this.lines[i]['hostRectangle'] = null;
        }
      }

    }

  }
  // I share the selected text with friends :)
  public shareSelection(): void {

    console.group("Shared Text");
    console.groupEnd();

    // Now that we've shared the text, let's clear the current selection.
    document.getSelection().removeAllRanges();
    // CAUTION: In modern browsers, the above call triggers a "selectionchange"
    // event, which implicitly calls our renderRectangles() callback. However,
    // in IE, the above call doesn't appear to trigger the "selectionchange"
    // event. As such, we need to remove the host rectangle explicitly.
  }

  public submitPhrases() {
    this.toggleInputs = true;
    this.lines = this.store.tuple2Arrays(this.tuplesPhrases);

  }



}