import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextSelectDirective } from './directives/text-selection.directive';
import { StyleGetter } from './directives/style-getter.directive';
import { ContenteditableModule } from 'ng-contenteditable';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    TextSelectDirective,
    StyleGetter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ContenteditableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
