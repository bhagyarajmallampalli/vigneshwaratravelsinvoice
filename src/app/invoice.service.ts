import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

@Injectable()
export class InvoiceService {

  constructor(private http: Http) {}

  public getInvoiceByDate(transDate, vehicleNumber) {
    return this.http.get(environment.apiURI+'invoices/getInvoiceByDate/'+transDate+"/"+vehicleNumber)
      .map(res => res.json());  
  }
 
}
