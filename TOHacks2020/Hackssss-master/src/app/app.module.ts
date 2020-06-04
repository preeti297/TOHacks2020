import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { TestingCentersComponent } from './testing-centers/testing-centers.component';
import { HeaderComponent } from './header/header.component';
import {TabModule} from 'angular-tabs-component';
import { HttpClientModule } from '@angular/common/http';
import { StatsComponent } from './stats/stats.component';
import { ParentComponent } from './parent/parent.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,

    PharmacyComponent,
    TestingCentersComponent,
   
    HeaderComponent,
   
    StatsComponent,
   
    ParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
