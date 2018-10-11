import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextSelectDirective } from './directives/text-selection.directive';
import { StyleGetter } from './directives/style-getter.directive';
import { ContenteditableModule } from 'ng-contenteditable';
import { FormsModule } from '@angular/forms';
import { PhraseComponent } from './components/phrase/phrase.component';

import { StoreService } from './services/store.service'
import { FileOpService } from './services/file-op.service';
import { LoopOverObjectsPipe } from './pipes/loop-over-objects.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize.pipe';
import { HtmlDirective } from './directives/sanitizer.directive'
import { DomChangeDirective } from './directives/mutate.directive';
@NgModule({
  declarations: [
    AppComponent,
    TextSelectDirective,
    StyleGetter,
    PhraseComponent,
    LoopOverObjectsPipe,
    SanitizeHtmlPipe,
    HtmlDirective,
    DomChangeDirective
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
