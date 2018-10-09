
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { TextSelectEvent } from "./directives/text-selection.directive";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface SelectionRectangle {
  left: number;
  top: number;
  width: number;
  height: number;
}

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  templateUrl: './app.component.html'
})
export class AppComponent {


  height: number;
  lines = [{
    text: 'Big mac from mac',
    items: [
      {
        selection: 'Food',
        text: 'Big mac'
      }
    ]
  }, {
    text: 'Chicken Macdo'
  }]

  public hostRectangle: SelectionRectangle | null;
  public selectedText: string;


  public hostRectangleTemp: SelectionRectangle | null;
  public selectedTextTemp: string;



  text: any = `Do I still Love you? Absolutely. There is not a doubt in my mind. Through
  all my mind, my ego I was always faithful in my Love for you.
  That I made you doubt it, that is the great mistake of a Life full of
  mistakes. The truth doesn't set us free, Robin. I can tell you I Love you
  as many times as you can stand to hear it and all that does, the only
  thing, is remind us&hellip; that Love is not enough. Not even close.`;
  public prespctive = false;

  // I initialize the app-component.
  constructor() {

    this.hostRectangle = null;
    this.selectedText = "";

  }

  applyHighlightsToField(selected, text) {
    if (selected !== '') {
      console.group('');
      console.log('selected', selected);
      console.log('text', text);
      console.groupEnd();
      let newRegex = new RegExp(`\\b${selected}\\b`, 'g');
      text = text.replace(newRegex, `<mark>$&</mark>`);
    }
  }
  // ---
  // PUBLIC METHODS.
  // ---

  // I render the rectangles emitted by the [textSelect] directive.
  public renderRectangles(event: TextSelectEvent, index: number): void {

    console.group("Text Select Event");
    console.log('index', index);
    console.log("Text:", event.text);
    console.log("Viewport Rectangle:", event.viewportRectangle);
    console.log("Host Rectangle:", event.hostRectangle);
    console.groupEnd();
    console.table(this.lines);
    for (let i = 0; i < this.lines.length; i++) {
      if (i !== index) {
        this.lines[i]['hostRectangle'] = null;
      }
    }
    if (event.text) {
      this.lines[index]['selectedTemp'] = event.text;
    }
    // If a new selection has been created, the viewport and host rectangles will
    // exist. Or, if a selection is being removed, the rectangles will be null.
    if (event.hostRectangle) {
      this.lines[index]['hostRectangle'] = event.hostRectangle;
      this.hostRectangle = event.hostRectangle;
      this.selectedText = event.text;
    } else {
      for (let i = 0; i < this.lines.length; i++) {
        if (i !== index) {
          this.lines[i]['hostRectangle'] = null;
        }
      }
      this.hostRectangle = null;
      this.selectedText = "";

    }

  }


  getTop(height, top?: string) {
    this.height = parseFloat(height);
    console.log(height, top);
  }

  // I share the selected text with friends :)
  public shareSelection(): void {

    console.group("Shared Text");
    console.log(this.selectedText);
    console.groupEnd();

    // Now that we've shared the text, let's clear the current selection.
    document.getSelection().removeAllRanges();
    // CAUTION: In modern browsers, the above call triggers a "selectionchange"
    // event, which implicitly calls our renderRectangles() callback. However,
    // in IE, the above call doesn't appear to trigger the "selectionchange"
    // event. As such, we need to remove the host rectangle explicitly.
    this.hostRectangle = null;
    this.selectedText = "";

  }

}