import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TextSelectDirective } from './directives/text-selection.directive';
import { ContenteditableModule } from 'ng-contenteditable';
import { FormsModule } from '@angular/forms';
import { PhraseComponent } from './components/phrase/phrase.component';

import { StoreService } from './services/store.service'
import { IntentEntityService } from './services/intent_entity.service';
import { LoopOverObjectsPipe } from './pipes/loop-over-objects.pipe';
import { FileSaverModule } from 'ngx-filesaver';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    TextSelectDirective,
    PhraseComponent,
    LoopOverObjectsPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ContenteditableModule,
    FileSaverModule,
    NgSelectModule
  ],
  providers: [
    StoreService,
    IntentEntityService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
