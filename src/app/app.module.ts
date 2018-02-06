import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CarsTransComponent } from './cars-trans/cars-trans.component';
import { AlertModule } from 'ngx-bootstrap';

import { VehicleService } from './vehicle-service.service';
import { DeptService } from './dept-service.service';
import { CustomersService } from './customers-service.service';

import { HttpModule } from '@angular/http';

import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { CarsTransService } from './cars-trans.service';

import { AmazingTimePickerService } from 'amazing-time-picker';
import { InvoiceService } from './invoice.service';

import { AutocompleteModule } from 'ng2-input-autocomplete';

import {ToasterModule, ToasterService} from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent,
    CarsTransComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AlertModule.forRoot(),
    FormsModule,
    MessagesModule,
    MessageModule,
    AutocompleteModule.forRoot(),
    ToasterModule.forRoot()
  ],
  providers: [InvoiceService, AmazingTimePickerService,VehicleService,DeptService,CustomersService, CarsTransService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
