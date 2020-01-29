import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TopicTreeComponent } from './components/topic-tree/topic-tree.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule, MatButtonModule, MatIconModule, MatAutocompleteModule, MatSelectModule, MatInputModule } from '@angular/material';
import { TopicControlDropdownComponent } from './components/topic-control-dropdown/topic-control-dropdown.component';
import { CommonModule } from '@angular/common';
import { createCustomElement, NgElementConstructor } from '@angular/elements';
import { Config } from 'protractor';


@NgModule({
  declarations: [
    AppComponent,
    TopicTreeComponent,
    TopicControlDropdownComponent
  ],
  entryComponents: [
    TopicTreeComponent,
    TopicControlDropdownComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const elements = [
      {
        element: TopicTreeComponent,
        tag: 'advtech-topic-tree'
      },
      {
        element: TopicControlDropdownComponent,
        tag: 'advtech-topic-dropdown'
      }
    ];
    elements.forEach(config => {
      const elm = createCustomElement(config.element, { injector: this.injector });

      customElements.define(config.tag, elm);
    });

  }
}
