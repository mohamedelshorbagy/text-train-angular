import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextSelectDirective } from './directives/text-selection.directive';
import { ContenteditableModule } from 'ng-contenteditable';
import { FormsModule } from '@angular/forms';
import { PhraseComponent } from './components/phrase/phrase.component';

import { StoreService } from './services/store.service'
import { FileOpService } from './services/file-op.service';
import { LoopOverObjectsPipe } from './pipes/loop-over-objects.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TextSelectDirective,
    PhraseComponent,
    LoopOverObjectsPipe,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ContenteditableModule
  ],
  providers: [
    StoreService,
    FileOpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
