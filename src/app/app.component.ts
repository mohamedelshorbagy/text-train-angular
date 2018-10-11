
// Import the core angular services.
import { Component } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

// Import the application components and services.
import { TextSelectEvent } from "./directives/text-selection.directive";
import { StoreService } from "./services/store.service";

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
    public _sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.entities = this.store.getEntities();






  }


  // ---
  // PUBLIC METHODS.
  // ---

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
    this.getEntitesFromPhrase();

  }


  getEntitesFromPhrase() {
    for (let i = 0; i < this.lines.length; i++) {
      let phrase = this.lines[i][0];
      let entites = this.lines[i][1]['entities']; // Array
      this.lines[i][2] = phrase;
      if (entites && entites.length) { // Exist
        for (let j = 0; j < entites.length; j++) {
          let entity = entites[j];
          /**
           * 0 => Start
           * 1 => End
           * 3 => Entity Name
           */
          let start = entity[0];
          let end = entity[1];
          let entityName = entity[2];
          let token = phrase.substring(start, end);
          let tokenWithEntity = `<span entity="${entityName}" style="background-color: ${this.entities[entityName]}">${token}</span>`;
          this.lines[i][0] = this.lines[i][0].replace(token, tokenWithEntity);
        }
        this.lines[i][3] = this._sanitizer.bypassSecurityTrustHtml(this.lines[i][0]);
      }
    }

  }


  public changeEntity(index: number) {
    console.log(index);

  }


  public change(event) {
    console.log(event);
  }

}